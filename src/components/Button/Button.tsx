import "./Button.css";
//
import { Link } from "react-router-dom";
//  <Button internal = "linkto" external = "linkto" />

interface ButtonProps {
  minWidth?: string;
  internal?: string;
  external?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  content?: React.ReactNode;
  type?: string;
  size?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
}

function Button({
  minWidth = "200px",
  internal,
  external,
  iconLeft,
  content,
  iconRight,
  type = "", // cycle, square, rectangle, transparent , border
  size = "", // small, medium, large
  onClick,
  className,
  ...attribute
}: ButtonProps) {
  let Tag: React.ElementType = "button";
  const props: any = { onClick };

  if (internal) {
    props.to = internal;
    Tag = Link;
  } else if (external) {
    props.href = external;
    // bien Tag ve the <a>
    Tag = "a";
  }

  const wrapper_class = "btn-wrapper";
  let type_class = "";
  if (type === "cycle") type_class = "btn-cycle";
  if (type === "transparent") type_class = "btn-transparent";
  if (type === "square") type_class = "btn-square";
  if (type === "rectangle") type_class = "btn-rectangle";

  let size_class = ""; // small (default) , medium, large
  if (size === "medium") size_class = "btn-medium";

  return (
    <Tag
      className={
        wrapper_class + " " + type_class + " " + size_class + " " + className
      }
      {...props}
      {...attribute}
      style={{ minWidth: `${minWidth}` }}
    >
      {iconLeft && <span className="button-icon">{iconLeft}</span>}
      {content && <span className="button-content">{content}</span>}
      {iconRight && (
        <span className="button-icon" style={{ marginLeft: "10px" }}>
          {iconRight}
        </span>
      )}
    </Tag>
  );
}
export default Button;
