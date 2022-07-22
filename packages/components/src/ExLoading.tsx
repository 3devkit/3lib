import React from 'react';
import ReactLoading from 'react-loading';
import { StyleHelper } from '@3lib/helpers';
import styles from './ExLoading.less';

export type LoadingColor = 'primary' | 'light';

interface ExLoadingProps {
  loadingColor?: LoadingColor;
  size?: number;
}

export const ExLoading: React.FC<ExLoadingProps> = props => {
  const { loadingColor = 'primary', size = 26 } = props;
  return (
    <ReactLoading
      className={StyleHelper.combinedSty(
        styles.ExLoading,
        loadingColor === 'primary' ? 'loading-primary' : 'loading-light',
      )}
      type="spin"
      height={size}
      width={size}
    />
  );
};
