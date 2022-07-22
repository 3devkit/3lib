import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useMemo,
  HTMLAttributes,
} from 'react';
import usePortal from 'react-cool-portal';
import { StyleHelper } from '@3lib/helpers';
import { createStore, StoreApi, useStore } from 'zustand';
import styles from './ExModal.less';

interface ModalStore {
  child: ReactNode | null;
  tag: number;
  open: (child: ReactNode) => number;
  close: (tag?: number) => void;
}

const ExModalContext = createContext<StoreApi<ModalStore> | null>(null);

const useModalStore = () => {
  const store = useContext(ExModalContext);
  if (!store) throw new Error('no ExModalProvider');
  return store;
};

export const useModalAction = () => {
  const store = useModalStore();
  const openDialog = useStore(store, state => state.open);
  const closeDialog = useStore(store, state => state.close);
  return { openDialog, closeDialog };
};

const createExModalStore = () => {
  return createStore<ModalStore>((set, get) => ({
    child: undefined,

    tag: 0,

    open: (child: ReactNode) => {
      set(state => ({ child, tag: state.tag + 1 }));

      return get().tag;
    },

    close: (tag?: number) => {
      if (!tag || get().tag === tag) {
        set(state => ({ child: null }));
      }
    },
  }));
};

export const ExModalProvider: React.FC<
  React.PropsWithChildren<unknown>
> = props => {
  const store = useMemo(createExModalStore, []);
  return (
    <ExModalContext.Provider value={store}>
      <ExModal />
      {props.children}
    </ExModalContext.Provider>
  );
};

const ExModal: React.FC<React.PropsWithChildren<unknown>> = props => {
  const store = useModalStore();
  const child = useStore(store, state => state.child);
  const close = useStore(store, state => state.close);

  const { Portal, hide, show, isShow } = usePortal({
    ...props,
    defaultShow: false,
    clickOutsideToHide: false,
    onHide: () => {
      setIsFadeOut(false);
      close();
    },
  });

  const [isFadeOut, setIsFadeOut] = useState(false);

  const handleClose = () => setIsFadeOut(true);

  const handleAnimEnd = () => isFadeOut && hide();

  const handleClickBackdrop = useCallback((e: React.MouseEvent) => {
    const { id } = e.target as HTMLDivElement;
    if (id === 'modal') handleClose();
  }, []);

  useEffect(() => {
    if (child) {
      show();
    } else {
      hide();
    }
  }, [child, hide, show]);

  return (
    <>
      <Portal>
        {isShow && (
          <div className={styles.ExModal} tabIndex={-1}>
            <div
              id="modal"
              className={StyleHelper.combinedSty(
                styles.bg,
                isFadeOut ? styles.bgClose : '',
              )}
              onClick={handleClickBackdrop}
            />
            <div
              onAnimationEnd={handleAnimEnd}
              className={StyleHelper.combinedSty(
                styles.content,
                isFadeOut ? styles.contentClose : '',
              )}
            >
              {child}
            </div>
          </div>
        )}
      </Portal>
    </>
  );
};

export const ExDialogBox: React.FC<
  React.PropsWithChildren<
    { title: string; width?: number } & HTMLAttributes<HTMLDivElement>
  >
> = props => {
  const { title, width, style, className, ...attr } = props;

  return (
    <div
      className={StyleHelper.combinedSty('lib_dialogbox', className ?? '')}
      {...attr}
      style={{ ...style, width }}
    >
      <div className="lib_dialogbox_title">{props.title}</div>
      {props.children}
    </div>
  );
};
