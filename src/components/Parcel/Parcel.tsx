import { useStageDispatch, useStageState } from '@hooks';
import { Coordinate, Size } from '@types';

interface ParcelProps {
  size: Size;
  position: Coordinate;
  color?: string;
  name: string;
}

export const Parcel = ({ size, position, color, name }: ParcelProps) => {
  const { width, height, depth } = size;
  const { x, y, z } = position;
  const sceneState = useStageState();
  const sceneDispatch = useStageDispatch();

  const hideParcel =
    sceneState.selectedParcel !== undefined &&
    name !== sceneState.selectedParcel;

  return (
    <mesh
      onPointerMissed={() =>
        name === sceneState.selectedParcel &&
        sceneDispatch({ type: 'selectParcel', parcelName: undefined })
      }
      onClick={(e) => {
        e.stopPropagation();
        sceneDispatch({ type: 'selectParcel', parcelName: name });
      }}
      position={[x, y, z]}
    >
      <boxGeometry attach="geometry" args={[width, height, depth]} />
      <meshStandardMaterial wireframe={hideParcel} color={color || 'gray'} />
      {/*right*/}
    </mesh>
  );
};
