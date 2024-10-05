import {ClassRetriever} from './class_retriever.js';
import {IterableWrapper} from './iteration/index.js';
import {Stringifier} from './stringifier.js';
import {TypeCaster} from './type_caster.js';
import * as types from './types/index.js';

export class UiDumper {
  private readonly classRetriever = new ClassRetriever();
  private readonly stringifier = new Stringifier();
  private readonly typeCaster = new TypeCaster();
  private readonly activityThreadClass: types.ActivityThreadType;
  private readonly activityClientRecordClass: types.FridaJavaType;
  private readonly fragmentActivityClass: types.FridaJavaType;
  private readonly androidFragmentClass: types.FridaJavaType;
  private readonly androidXFragmentClass: types.FridaJavaType;
  private readonly viewGroupClass: types.FridaJavaType;

  constructor() {
    this.activityThreadClass =
        this.classRetriever.retrieve('android.app.ActivityThread');
    this.activityClientRecordClass = this.classRetriever.retrieve(
        'android.app.ActivityThread$ActivityClientRecord');
    this.fragmentActivityClass =
        this.classRetriever.retrieve('androidx.fragment.app.FragmentActivity');
    this.androidFragmentClass =
        this.classRetriever.retrieve('android.app.Fragment');
    this.androidXFragmentClass =
        this.classRetriever.retrieve('androidx.fragment.app.Fragment');
    this.viewGroupClass =
        this.classRetriever.retrieve('android.view.ViewGroup');
  }

  dumpTopActivity(): string {
    let dump: string[] = [];

    const activity = this.getTopActivity();
    dump.push(`Activity: ${this.stringifier.stringify(activity)}`);

    const fragmentsDump = this.dumpFragments(activity);
    if (0 !== fragmentsDump.length) {
      dump.push('');
      dump.push('Fragments:');
      dump = dump.concat(fragmentsDump);
    }

    const viewTreeDump = this.dumpViewTree(activity);
    if (0 !== viewTreeDump.length) {
      dump.push('');
      dump.push('View Tree:');
      dump = dump.concat(viewTreeDump);
    }


    return dump.join('\n');
  }

  private getTopActivity(): types.Activity {
    const currentActivityThread =
        this.activityThreadClass.currentActivityThread();

    for (const record of
             IterableWrapper.from<types.ActivityThread$ActivityClientRecord>(
                 currentActivityThread.mActivities.value.values(),
                 this.activityClientRecordClass)) {
      if (null === record) {
        continue;
      }

      if (record.paused.value) {
        continue;
      }

      return record.activity.value;
    }

    throw new Error('no top activity found');
  }

  private dumpFragments(activity: types.Activity): string[] {
    const dump: string[] = [];

    for (const fragment of this.getFragments(activity)) {
      dump.push(`  ${this.stringifier.stringify(fragment)}`);
    }

    return dump;
  }

  private dumpViewTree(activity: types.Activity): string[] {
    return this.dumpView(activity.getWindow().getDecorView());
  }

  private getFragments(activity: types.Activity):
      IterableWrapper<types.Object> {
    if (this.fragmentActivityClass.class.isInstance(activity)) {
      const fragmentActivity = this.typeCaster.cast<types.FragmentActivity>(
          activity,
          this.fragmentActivityClass,
      );

      return IterableWrapper.from(
          fragmentActivity.getSupportFragmentManager().getFragments(),
          this.androidXFragmentClass,
      );
    }

    return IterableWrapper.from(
        activity.getFragmentManager().getFragments(),
        this.androidFragmentClass,
    );
  }

  private dumpView(view: types.View, indent: number = 1): string[] {
    let dump: string[] = [];

    dump.push(`${' '.repeat(2 * indent)}${this.stringifier.stringify(view)}`);

    if (this.viewGroupClass.class.isInstance(view)) {
      dump = dump.concat(
          this.dumpViewGroup(
              this.typeCaster.cast(view, this.viewGroupClass), indent),
      );
    }

    return dump;
  }

  private dumpViewGroup(viewGroup: types.ViewGroup, indent: number): string[] {
    let dump: string[] = [];

    for (let index = 0; index < viewGroup.getChildCount(); ++index) {
      dump = dump.concat(
          this.dumpView(viewGroup.getChildAt(index), indent + 1),
      );
    }

    return dump;
  }
}
