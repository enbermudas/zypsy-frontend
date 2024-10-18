// Styles
import "./RadioButton.scss";

// Types
interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

function RadioButton({ name, value, label, checked, onClick }: RadioButtonProps) {
  return (
    <div className="radiobtn">
      <input
        type="radio"
        name={name}
        value={value}
        id={value}
        checked={checked}
        onClick={onClick}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
}

export default RadioButton;
