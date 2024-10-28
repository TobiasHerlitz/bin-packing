import { Bin, Parcel, SceneHelpers } from '@components';
import { useGeometryState, useStageDispatch, useStageState } from '@hooks';
import { CameraControls, RandomizedLight, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { sizeToMeters } from '@utils';
import { Perf } from 'r3f-perf';
import { useEffect, useRef } from 'react';

import styles from './Scene.module.css';

export const Scene = () => {
  const cameraRef = useRef(null);
  const parcelColors = ['#001B2E', '#294C60', '#ADB6C4', '#FFEFD3', '#FFC49B'];
  const { bins } = useGeometryState();
  const { showScene, showPerformance } = useStageState();
  const stageDispatch = useStageDispatch();
  if (!bins[0] || !bins[0].parcels) {
    console.warn('Failed');
  }
  const bin = bins[0];
  const placedParcels = bin.parcels.map((parcel, index) => (
    <Parcel
      name={parcel.name}
      key={parcel.name}
      color={parcelColors[index % 4]}
      size={sizeToMeters(parcel.getRotatedSize())}
      position={{
        x: (parcel.getPosition().x + parcel.getRotatedSize().width / 2) / 100,
        y: (parcel.getPosition().y + parcel.getRotatedSize().height / 2) / 100,
        z: (parcel.getPosition().z + parcel.getRotatedSize().depth / 2) / 100,
      }}
    />
  ));

  useEffect(() => {
    if (!cameraRef) return;

    stageDispatch({ type: 'setCameraRef', cameraRef });
  }, [cameraRef, stageDispatch]);

  if (!showScene) {
    return null;
  }

  return (
    <div className={styles.canvasWrapper}>
      <Canvas shadows camera={{ position: [2, 2, 2] }}>
        {showPerformance && <Perf position="bottom-left" />}
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
