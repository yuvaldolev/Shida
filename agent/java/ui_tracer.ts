import {Hooker} from './hooker.js';

export class UiTracer {
  private readonly viewClass = Java.use('android.view.View');
  private readonly hooker = new Hooker();

  traceClicks(
      onClick: (view: Java.Wrapper, listener: Java.Wrapper|null) => void):
      void {
    const performClickMethod = this.viewClass.performClick;
    performClickMethod.implementation = function() {
      const returnValue = performClickMethod.call(this);

      let listener: Java.Wrapper|null = null;
      const listenerInfo = this.mListenerInfo.value;
      if (listenerInfo !== null) {
        listener = listenerInfo.mOnClickListener.value;
      }

      onClick(this, listener);

      return returnValue;
    };
  }

  traceTouches(onTouchEvent: (view: Java.Wrapper, event: Java.Wrapper) => void):
      void {
    const onTouchEventMethod = this.viewClass.onTouchEvent;
    onTouchEventMethod.implementation = function(event: Java.Wrapper) {
      const returnValue = onTouchEventMethod.call(this, event);
      onTouchEvent(this, event);

      return returnValue;
    }
  }

  stopTracingClicks(): void {
    this.hooker.unhookMethod(this.viewClass.performClick);
  }

  stopTracingTouches(): void {
    this.hooker.unhookMethod(this.viewClass.onTouchEvent);
  }
}
