import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function BackToPrevious({fallbackPath}) {
  const fallbackUrl = useBaseUrl(fallbackPath);

  const handleClick = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign(fallbackUrl);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} type="button" onClick={handleClick}>
        ← 이전에 보던 페이지로 돌아가기
      </button>
    </div>
  );
}
