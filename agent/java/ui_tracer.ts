import {Reflection} from './reflection.js';
import {JavaObject} from './types/index.js';

export class UiTracer {
  private readonly viewClass = Java.use('android.view.View');
  private readonly reflection = new Reflection();

  traceClicks(onClick: (view: JavaObject, listener: JavaObject|null) => void):
      void {
    const reflection = this.reflection;

    const performClickMethod = this.viewClass.performClick;
    performClickMethod.implementation = function() {
      const returnValue = performClickMethod.call(this);

      let listener: JavaObject|null = null;
      const listenerInfo = reflection.getObjectField(this, 'mListenerInfoo');
      if (listenerInfo !== null) {
        listener = reflection.getObjectField(listenerInfo, 'mOnClickListener');
      }

      onClick(this, listener);

      return returnValue;
    };
  }

  traceTouches(onTouchEvent: (view: JavaObject, event: JavaObject) => void):
      void {
    const onTouchEventMethod = this.viewClass.onTouchEvent;
    onTouchEventMethod.implementation = function(event: JavaObject) {
      const returnValue = onTouchEventMethod.call(this, event);
      onTouchEvent(this, event);

      return returnValue;
    }
  }
}
