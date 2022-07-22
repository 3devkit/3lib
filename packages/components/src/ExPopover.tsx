import React, { useState } from 'react';
import { StyleHelper } from '@3lib/helpers';
import { useClickAway } from 'ahooks';
import { usePopper } from 'react-popper';
import usePortal from 'react-cool-portal';
import styles from './ExPopover.less';

export type CloseHandle = () => void;

interface ExPopoverProps {
  isShowAnimation?: boolean;
  isHideAnimation?: boolean;
  onButtonBuilder: (open: boolean) => JSX.Element;
  onPopoverBuilder: (closeHandle: CloseHandle) => JSX.Element;
  buttonClassName?: string;
}

export const ExPopover: React.FC<
  React.PropsWithChildren<ExPopoverProps>
> = props => {
  const {
    onButtonBuilder,
    onPopoverBuilder,
    isShowAnimation = true,
    isHideAnimation = true,
    buttonClassName,
  } = props;

  const [isFadeOut, setIsFadeOut] = useState(false);

  const { Portal, isShow, show, hide } = usePortal({
    defaultShow: false,
    clickOutsideToHide: false,
    onHide: () => setIsFadeOut(false),
  });

  const handleShow = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    !isShow ? show() : hide();
  };

  const handleClose = () => setIsFadeOut(true);

  const handleAnimEnd = () => isFadeOut && hide();

  const {
    butEl,
    popperEl,
    setButEl,
    setPopperEl,
    popperStyles,
    popperAttributes,
  } = usePopover();

  useClickAway(
    () => {
      if (!isHideAnimation) {
        hide();
        return;
      }
      !isFadeOut && handleClose();
    },
    [butEl, popperEl],
    'mousedown',
  );

  return (
    <>
      <div ref={setButEl} onClick={handleShow} className={buttonClassName}>
        {onButtonBuilder(isShow)}
      </div>

      {isShow && (
        <Portal>
          <div
            ref={setPopperEl}
            className={styles.Popover}
            style={popperStyles}
            {...popperAttributes}
          >
            <div
              onAnimationEnd={handleAnimEnd}
              className={StyleHelper.combinedSty(
                isShowAnimation && styles.content,
                isHideAnimation && isFadeOut && styles.close,
              )}
            >
              {onPopoverBuilder(handleClose)}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

function usePopover() {
  const [butEl, setButEl] = useState<HTMLElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(butEl, popperEl);

  return {
    butEl,
    popperEl,
    setButEl,
    setPopperEl,
    popperStyles: styles.popper,
    popperAttributes: attributes.popper,
  };
}

interface ExPopoverBoxProps {
  width?: number;
}

export const ExPopoverBox: React.FC<
  React.PropsWithChildren<
    ExPopoverBoxProps & React.HTMLAttributes<HTMLDivElement>
  >
> = props => {
  const { width, className, style, ...attr } = props;
  return (
    <div
      className={StyleHelper.combinedSty('lib_popoverbox', className ?? '')}
      style={{ width, ...style }}
      {...attr}
    >
      {props.children}
    </div>
  );
};
