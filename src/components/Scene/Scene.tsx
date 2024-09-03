import { Bin, Parcel, SceneHelpers } from '@components';
import { useGeometryState, useStageDispatch } from '@hooks';
import { CameraControls, RandomizedLight, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { sizeToMeters } from '@utils';
import { useEffect, useRef } from 'react';

import styles from './Scene.module.css';

export const Scene = () => {
  const cameraRef = useRef(null);
  const parcelColors = ['#001B2E', '#294C60', '#ADB6C4', '#FFEFD3', '#FFC49B'];
  const { bins } = useGeometryState();
  const stageDispatch = useStageDispatch();
  if (!bins[0] || !bins[0].items) {
    console.warn('Failed');
  }
  const bin = bins[0];
  console.log(bin.items.length);
  const placedParcels = bin.items.map((item, index) => (
    <Parcel
      name={item.name}
      key={item.name}
      color={parcelColors[index % 4]}
      size={sizeToMeters(item.rotatedSize)}
      position={{
        x: (item.position.x + item.size.width / 2) / 100,
        y: (item.position.y + item.size.height / 2) / 100,
        z: (item.position.z + item.size.depth / 2) / 100,
      }}
    />
  ));

  useEffect(() => {
    if (!cameraRef) return;

    stageDispatch({ type: 'setCameraRef', cameraRef });
  }, [cameraRef, stageDispatch]);

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
        <Bin size={sizeToMeters(bin.size)} parcels={placedParcels} />
        <CameraControls ref={cameraRef} makeDefault />
      </Canvas>
    </div>
  );
};
