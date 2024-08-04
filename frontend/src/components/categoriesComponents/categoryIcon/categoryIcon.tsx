import brushIcon from "../../../assets/icons/categoryIcons/brush-icon.png";
import clipIcon from "../../../assets/icons/categoryIcons/clip-icon.png";
import compassIcon from "../../../assets/icons/categoryIcons/compass-icon.png";
import hammerIcon from "../../../assets/icons/categoryIcons/hammer-icon.png";
import magnetIcon from "../../../assets/icons/categoryIcons/magnet-icon.png";

interface CategoryIconProps {
  name?: string;
  size?: number;
}

function CategoryIcon({ name, size }: CategoryIconProps) {
  const imgSize = size ?? 20;

  switch (name) {
    case "1":
      return (
        <img src={brushIcon} alt="brushIcon" width={imgSize} height={imgSize} />
      );
    case "2":
      return (
        <img src={clipIcon} alt="clipIcon" width={imgSize} height={imgSize} />
      );
    case "3":
      return (
        <img
          src={compassIcon}
          alt="compassIcon"
          width={imgSize}
          height={imgSize}
        />
      );
    case "4":
      return (
        <img
          src={hammerIcon}
          alt="hammerIcon"
          width={imgSize}
          height={imgSize}
        />
      );
    case "5":
      return (
        <img
          src={magnetIcon}
          alt="magnetIcon"
          width={imgSize}
          height={imgSize}
        />
      );
    default:
      return <div>{"--"}</div>;
  }
}

export default CategoryIcon;
