import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';
import styles from './styles.module.css';

function normalize(value) {
  return String(value ?? '')
    .toLocaleLowerCase('ko-KR')
    .trim();
}

function itemMatches(item, query) {
  if (item.type === 'html') {
    return normalize(item.value.replace(/<[^>]*>/g, ' ')).includes(query);
  }

  return normalize(item.label).includes(query);
}

function filterSidebarItem(item, query) {
  if (!query) {
    return item;
  }

  if (item.type === 'category') {
    if (itemMatches(item, query)) {
      return {
        ...item,
        collapsed: false,
      };
    }

    const items = item.items
      .map((child) => filterSidebarItem(child, query))
      .filter(Boolean);

    if (items.length === 0) {
      return null;
    }

    return {
      ...item,
      collapsed: false,
      items,
    };
  }

  return itemMatches(item, query) ? item : null;
}

function useFilteredSidebar(sidebar, query) {
  return useMemo(() => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return sidebar;
    }

    return sidebar
      .map((item) => filterSidebarItem(item, normalizedQuery))
      .filter(Boolean);
  }, [sidebar, query]);
}

export default function SidebarSearch({
  sidebar,
  path,
  level = 1,
  onItemClick,
  className,
}) {
  const [query, setQuery] = useState('');
  const filteredSidebar = useFilteredSidebar(sidebar, query);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.searchBox}>
        <input
          aria-label="문서 제목 검색"
          className={styles.input}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="문서 제목 검색"
          type="search"
          value={query}
        />
      </div>
      {filteredSidebar.length > 0 ? (
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          <DocSidebarItems
            items={filteredSidebar}
            activePath={path}
            level={level}
            onItemClick={onItemClick}
          />
        </ul>
      ) : (
        <div className={styles.empty}>검색 결과 없음</div>
      )}
    </div>
  );
}

