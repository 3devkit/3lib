import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import type { ButtonProps } from 'react-bootstrap/Button';
import { ExLoading, LoadingColor } from './ExLoading';
import styles from './ExButton.less';

export type ExButtonProps = {
  loading?: boolean;
  loadingColor?: LoadingColor;
  isClickLoading?: boolean;
} & ButtonProps;

export const ExButton: React.FC<ExButtonProps> = props => {
  const {
    loading = false,
    onClick,
    isClickLoading = false,
    loadingColor = props.variant === 'light' ? 'primary' : 'light',
    ...attr
  } = props;

  const [clickLoading, setClickLoading] = useState<boolean>(false);

  function onClickHandle(event: React.MouseEvent<HTMLButtonElement>) {
    if (isClickLoading) {
      setTimeout(() => setClickLoading(true), 50);
    }
    if (!loading) {
      onClick?.(event);
    }
  }

  const isLoading = clickLoading || loading;

  return (
    <Button {...attr} onClick={onClickHandle}>
      <div className={styles.ExButton}>
        {isLoading && (
          <div className={styles.loadingBox}>
            <ExLoading loadingColor={loadingColor} />
          </div>
        )}
        <div className={styles.content} style={{ opacity: isLoading ? 0 : 1 }}>
          {props.children}
        </div>
      </div>
    </Button>
  );
};
