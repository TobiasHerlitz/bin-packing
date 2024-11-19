import { ThreeEvent } from '@react-three/fiber';
import { useGeometryDispatch, useGeometryState } from '@stateHooks';
import { Coordinate, Size } from '@types';

interface ParcelProps {
  size: Size;
  position: Coordinate;
  color?: string;
  id: string;
}

export const Parcel = ({ size, position, color, id }: ParcelProps) => {
  const { width, height, depth } = size;
  const { x, y, z } = position;
  const { selectedParcelId } = useGeometryState();
  const geometryDispatch = useGeometryDispatch();

  const hideParcel = selectedParcelId !== undefined && id !== selectedParcelId;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (id === selectedParcelId) {
      geometryDispatch({ type: 'setSelectedParcelId', parcelId: undefined });
      return;
    }

    geometryDispatch({ type: 'setSelectedParcelId', parcelId: id });
  };

  return (
    <mesh
      onPointerMissed={() =>
        id === selectedParcelId &&
        geometryDispatch({ type: 'setSelectedParcelId', parcelId: undefined })
      }
      onClick={handleClick}
      position={[x, y, z]}
    >
      <boxGeometry attach="geometry" args={[width, height, depth]} />
      <meshStandardMaterial wireframe={hideParcel} color={color || 'gray'} />
    </mesh>
  );
};
