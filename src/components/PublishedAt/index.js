import React from 'react';
import styles from './styles.module.css';

function formatDateOnly(value) {
  const [year, month, day] = value.split('-').map(Number);
  return `${year}년 ${month}월 ${day}일`;
}

function formatPublishedAt(value, includeTime) {
  if (!value) {
    return null;
  }

  const stringValue = String(value);
  if (!includeTime && /^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
    return formatDateOnly(stringValue);
  }

  const date = value instanceof Date ? value : new Date(stringValue);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  }).format(date);
}

export default function PublishedAt({value, includeTime = false}) {
  const formattedValue = formatPublishedAt(value, includeTime);
  const dateTimeValue =
    value instanceof Date ? value.toISOString() : String(value ?? '');

  if (!formattedValue) {
    return null;
  }

  return (
    <p className={styles.publishedAt}>
      <span className={styles.label}>게시일</span>{' '}
      <time dateTime={dateTimeValue}>{formattedValue}</time>
    </p>
  );
}
