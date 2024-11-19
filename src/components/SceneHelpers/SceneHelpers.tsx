import { useStageState } from '@stateHooks';

export const SceneHelpers = () => {
  const sceneState = useStageState();
  return (
    <>
      <axesHelper />
      {sceneState.showGrid && (
        <mesh position={[0, -0.01, 0]}>
          <gridHelper args={[20, 20, 0xff0000, 'teal']} />
        </mesh>
      )}
      {/*      <mesh position={[0, 0.55, 0]}>
        <meshNormalMaterial />
        <torusKnotGeometry args={[0.3, 0.1, 128, 32]} />
      </mesh>*/}
    </>
  );
};
