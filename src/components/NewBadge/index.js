import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const NEW_WINDOW_DAYS = 14;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function parseCreatedAt(createdAt) {
  if (!createdAt) {
    return null;
  }

  if (createdAt instanceof Date) {
    return createdAt;
  }

  const value = String(createdAt);
  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;
  const parsed = new Date(
    dateOnlyPattern.test(value) ? `${value}T00:00:00+09:00` : value,
  );

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isNewContent(createdAt) {
  const createdDate = parseCreatedAt(createdAt);

  if (!createdDate) {
    return false;
  }

  const diffInMs = Date.now() - createdDate.getTime();
  const diffInDays = diffInMs / DAY_IN_MS;

  return diffInDays >= -1 && diffInDays <= NEW_WINDOW_DAYS;
}

export default function NewBadge({createdAt, className}) {
  if (!isNewContent(createdAt)) {
    return null;
  }

  return <span className={clsx(styles.badge, className)}>NEW</span>;
}

