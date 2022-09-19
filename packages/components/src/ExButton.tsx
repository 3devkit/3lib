import React, { useState } from 'react';
import { Button, ButtonProps, Stack } from 'react-bootstrap';
import { ExLoading, LoadingColor } from './ExLoading';
import styles from './ExButton.less';
import { StyleHelper } from '@3lib/helpers';

export type ExButtonProps = {
  loading?: boolean;
  loadingColor?: LoadingColor;
  isClickLoading?: boolean;
  icon?: React.ReactNode;
} & ButtonProps;

export const ExButton: React.FC<ExButtonProps> = props => {
  const {
    icon,
    loading = false,
    onClick,
    isClickLoading = false,
    loadingColor = props.variant === 'light' ? 'primary' : 'light',
    className,
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
    <Button
      {...attr}
      onClick={onClickHandle}
      className={StyleHelper.combinedSty(styles.Button, className)}
    >
      <div className={styles.ExButton}>
        {isLoading && (
          <div className={styles.loadingBox}>
            <ExLoading loadingColor={loadingColor} />
          </div>
        )}
        <div className={styles.content} style={{ opacity: isLoading ? 0 : 1 }}>
          <Stack gap={2} direction="horizontal">
            {icon}
            {props.children}
          </Stack>
        </div>
      </div>
    </Button>
  );
};
