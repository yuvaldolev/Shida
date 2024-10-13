import {ClassRetriever} from './class_retriever.js';
import {Hooker} from './hooker.js';
import * as types from './types/index.js';

export class UiTracer {
  private readonly classRetriever = new ClassRetriever();
  private readonly hooker = new Hooker();
  private readonly viewClass: types.ViewType;

  constructor() {
    this.viewClass = this.classRetriever.retrieve('android.view.View');
  }

  traceClicks(onClick: (view: types.View, listener: types.Object|null) => void):
      void {
    const performClickMethod = this.viewClass.performClick;
    performClickMethod.implementation = function() {
      const returnValue = performClickMethod.call(this);

      let listener: types.Object|null = null;
      const listenerInfo = this.mListenerInfo.value;
      if (listenerInfo !== null) {
        listener = listenerInfo.mOnClickListener.value;
      }

      onClick(this, listener);

      return returnValue;
    };
  }

  traceTouches(onTouchEvent: (view: types.View, event: types.Object) => void):
      void {
    const onTouchEventMethod = this.viewClass.onTouchEvent;
    onTouchEventMethod.implementation = function(event: types.Object) {
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
