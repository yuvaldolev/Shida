import {IterableWrapper} from './iteration/index.js';
import {Stringifier} from './stringifier.js';

export class UiDumper {
  private readonly activityThreadClass = Java.use('android.app.ActivityThread');
  private readonly activityClientRecordClass =
      Java.use('android.app.ActivityThread$ActivityClientRecord');
  private readonly fragmentActivityClass =
      Java.use('androidx.fragment.app.FragmentActivity');
  private readonly androidFragmentClass = Java.use('android.app.Fragment');
  private readonly androidXFragmentClass =
      Java.use('androidx.fragment.app.Fragment');
  private readonly viewGroupClass = Java.use('android.view.ViewGroup');
  private readonly stringifier = new Stringifier();

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

    const viewsDump = this.dumpViewTree(activity);
    if (0 !== viewsDump.length) {
      dump.push('');
      dump.push('View Tree:');
      dump = dump.concat(viewsDump);
    }


    return dump.join('\n');
  }

  private getTopActivity(): Java.Wrapper {
    const currentActivityThread =
        this.activityThreadClass.currentActivityThread();

    for (const record of IterableWrapper.from(
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

  private dumpFragments(activity: Java.Wrapper): string[] {
    const dump: string[] = [];

    for (const fragment of this.getFragments(activity)) {
      dump.push(`  ${this.stringifier.stringify(fragment)}`);
    }

    return dump;
  }

  private dumpViewTree(activity: Java.Wrapper): string[] {
    return this.dumpView(activity.getWindow().getDecorView());
  }

  private getFragments(activity: Java.Wrapper): IterableWrapper {
    if (this.fragmentActivityClass.class.isInstance(activity)) {
      const fragmentActivity = Java.cast(
          activity,
          this.fragmentActivityClass,
      );

      return this.getFragmentsFromManager(
          fragmentActivity.getSupportFragmentManager(),
          this.androidXFragmentClass,
      );
    }

    return this.getFragmentsFromManager(
        activity.getFragmentManager(),
        this.androidFragmentClass,
    );
  }

  private getFragmentsFromManager(
      fragmentManager: Java.Wrapper,
      fragmentClass: Java.Wrapper): IterableWrapper {
    return IterableWrapper.from(fragmentManager.getFragments(), fragmentClass);
  }

  private dumpView(view: Java.Wrapper, indent: number = 1): string[] {
    let dump: string[] = [];

    dump.push(`${' '.repeat(2 * indent)}${this.stringifier.stringify(view)}`);

    if (this.viewGroupClass.class.isInstance(view)) {
      dump = dump.concat(
          this.dumpViewGroup(Java.cast(view, this.viewGroupClass), indent),
      );
    }

    return dump;
  }

  private dumpViewGroup(viewGroup: Java.Wrapper, indent: number): string[] {
    let dump: string[] = [];

    for (let index = 0; index < viewGroup.getChildCount(); ++index) {
      dump = dump.concat(
          this.dumpView(viewGroup.getChildAt(index), indent + 1),
      );
    }

    return dump;
  }
}
