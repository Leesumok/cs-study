import React from 'react';
import {
  NavbarSecondaryMenuFiller,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import SidebarSearch from '@site/src/components/SidebarSearch';

const DocSidebarMobileSecondaryMenu = ({sidebar, path}) => {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <SidebarSearch
      sidebar={sidebar}
      path={path}
      onItemClick={(item) => {
        if (item.type === 'category' && item.href) {
          mobileSidebar.toggle();
        }
        if (item.type === 'link') {
          mobileSidebar.toggle();
        }
      }}
    />
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);

