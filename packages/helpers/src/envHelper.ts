import isBrowser from 'is-in-browser';

export const CAN_USE_DOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

export class EnvHelper {
  public static get documentMode(): boolean {
    return CAN_USE_DOM && 'documentMode' in document
      ? (document as any).documentMode
      : null;
  }

  public static get canUseBeforeInput(): boolean {
    return CAN_USE_DOM && 'InputEvent' in window && !EnvHelper.documentMode
      ? 'getTargetRanges' in new window.InputEvent('input')
      : false;
  }

  public static get isApple(): boolean {
    return CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  }

  public static get isFirefox(): boolean {
    return (
      CAN_USE_DOM &&
      /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent)
    );
  }

  public static get isSafari(): boolean {
    return CAN_USE_DOM && /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
  }

  public static get isChrome(): boolean {
    return CAN_USE_DOM && /(Chrome)/.test(navigator.userAgent);
  }

  public static get isIos(): boolean {
    return (
      CAN_USE_DOM &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream
    );
  }

  public static get isBrowser(): boolean {
    return isBrowser;
  }

  public static get isMobile(): boolean {
    return (
      CAN_USE_DOM &&
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
        navigator.userAgent,
      )
    );
  }
}

// Keep these in case we need to use them in the future.
// export const IS_WINDOWS: boolean = CAN_USE_DOM && /Win/.test(navigator.platform);
// export const IS_CHROME: boolean = CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent);
// export const canUseTextInputEvent: boolean = CAN_USE_DOM && 'TextEvent' in window && !documentMode;
