import { Bin, Parcel, SceneHelpers } from '@components';
import { bestBin, exampleBins, exampleItems } from '@packers';
import { CameraControls, RandomizedLight, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MutableRefObject } from 'react';

import styles from './Scene.module.css';

interface SceneProps {
  cameraRef: MutableRefObject<CameraControls | null>;
}

export const Scene = ({ cameraRef }: SceneProps) => {
  const parcelColors = ['#001B2E', '#294C60', '#ADB6C4', '#FFEFD3', '#FFC49B'];
  const bin = bestBin(exampleBins, exampleItems);
  if (!bin.items) {
    console.warn('Failed');
  }
  const parcels = bin.items.map((item, index) => (
    <Parcel
      name={item.name}
      key={item.name}
      color={parcelColors[index % 4]}
      size={item.size}
      position={{
        x: item.position.x + item.size.width / 2,
        y: item.position.y + item.size.height / 2,
        z: item.position.z + item.size.depth / 2,
      }}
    />
  ));

  return (
    <div className={styles.canvasWrapper}>
      <Canvas shadows camera={{ position: [-3, 3, -3] }}>
        <SceneHelpers />
        <RandomizedLight amount={8} frames={100} position={[5, 5, -10]} />
        <hemisphereLight intensity={1} />
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        />
        <Bin size={bin.size} parcels={parcels} />
        <CameraControls ref={cameraRef} makeDefault />
      </Canvas>
    </div>
  );
};
