import {Reflection} from './reflection.js';

export class UiDumper {
  private readonly activityThreadClass = Java.use('android.app.ActivityThread');
  private readonly reflection = new Reflection();

  dumpTopActivity(): string {
    const dump: string[] = [];

    const currentActivityThread =
        this.activityThreadClass.currentActivityThread();
    // const activities = this.reflection.getObjectFieldNonNull(
    //     currentActivityThread, 'mActivities');

    return dump.join('');
  }
}
