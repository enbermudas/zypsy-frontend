// Vendor
import classNames from "classnames";

// Utils
import useStore from "@/store";

// Assets
import StarIconFilled from "@/assets/star-filled.svg";
import StarIconOutline from "@/assets/star-outline.svg";
import StarIconOutlineGhost from "@/assets/star-outline-ghost.svg";

// Styles
import "../atoms/Button.scss";

// Types
export interface ButtonProps {
  id: string;
  text: string;
  onClick: (id: string) => void;
  isFavorite: boolean;
  isSelected: boolean;
}

interface IconProps {
  isFavorite: boolean;
  isSelected: boolean;
}

// Helpers
const Icon = ({ isFavorite, isSelected }: IconProps) => {
  if (isSelected) {
    return <StarIconOutlineGhost />;
  } else if (isFavorite) {
    return <StarIconFilled />;
  } else {
    return <StarIconOutline />;
  }
};

function Button({ id, text, onClick, isFavorite, isSelected }: ButtonProps) {
  const { toggleFavorite } = useStore((state) => state);

  const className = classNames("btn", { "btn--ghost": isSelected });

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <button
      className={className}
      role="button"
      onClick={() => onClick(id)}>
      {text}
      <button
        className="icon-btn"
        onClick={(e) => handleToggleFavorite(e)}>
        <Icon
          isFavorite={isFavorite}
          isSelected={isSelected}
        />
      </button>
    </button>
  );
}

export default Button;
