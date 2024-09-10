interface ToggleProps {
  isEnabled: boolean;
  onChange: () => void;
}

export const Toggle = ({ isEnabled, onChange }: ToggleProps) => {
  return (
    <input
      type="checkbox"
      id="toggleGrid"
      name="toggleGrid"
      checked={isEnabled}
      onChange={onChange}
    />
  );
};
