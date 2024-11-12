import { PackingControls, SolutionControls, StageControls } from '@components';
import { useClickOutside } from '@hooks';
import { Button, ButtonColor } from '@ui';
import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './Controls.module.css';

enum TabCategory {
  Geometry,
  Stage,
  Solution,
}

interface Tab {
  category: TabCategory;
  icon: string;
  heading: string;
  component: ReactNode;
}

export const Controls = () => {
  const controlsRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState<Tab>();

  const tabs = [
    {
      category: TabCategory.Geometry,
      icon: 'package_2',
      heading: 'PACKING',
      component: (
        <PackingControls closeControls={() => setSelectedTab(undefined)} />
      ),
    },
    {
      category: TabCategory.Solution,
      heading: 'SOLUTION',
      icon: 'local_shipping',
      component: <SolutionControls />,
    },
    {
      category: TabCategory.Stage,
      heading: 'STAGE',
      icon: 'scene',
      component: <StageControls />,
    },
  ];

  useEffect(() => {
    setSelectedTab(tabs[0])
  }, [])

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
            <div className={styles.body}>
              <div className={styles.header}>
                <h2>{selectedTab.heading}</h2>
                <Button
                  icon="close"
                  colorScheme={ButtonColor.BGColor}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTab(undefined);
                  }}
                />
              </div>
              {selectedTab.component}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
