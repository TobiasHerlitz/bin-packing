import { PackingControls, StageControls } from '@components';
import { useClickOutside } from '@hooks';
import { ReactNode, useRef, useState } from 'react';

import styles from './Controls.module.css';

enum TabCategory {
  Geometry,
  Stage,
}

interface Tab {
  category: TabCategory;
  icon: string;
  component: ReactNode;
}

export const Controls = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>();
  const controlsRef = useRef(null);

  const tabs = [
    {
      category: TabCategory.Geometry,
      icon: 'package_2',
      component: (
        <PackingControls closeControls={() => setSelectedTab(undefined)} />
      ),
    },
    {
      category: TabCategory.Stage,
      icon: 'scene',
      component: <StageControls />,
    },
  ];

  useClickOutside({
    refs: [controlsRef],
    callback: () => setSelectedTab(undefined),
  });

  return (
    <div className={styles.root}>
      <div className={selectedTab ? styles.showControls : styles.hideControls}>
        <div ref={controlsRef} className={styles.controls}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.category}
                className={`${styles.categoryButton} material-symbols-outlined`}
                onClick={() =>
                  setSelectedTab(
                    selectedTab?.category === tab.category ? undefined : tab
                  )
                }
              >
                {tab.icon}
              </button>
            ))}
          </div>
          {selectedTab && (
            <div className={styles.body}>{selectedTab.component}</div>
          )}
        </div>
      </div>
    </div>
  );
};
