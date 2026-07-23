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
  target,
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
    Tag = "a";
  }

  const wrapper_class =
    "btn-wrapper group relative overflow-hidden flex justify-center items-center cursor-pointer rounded-[10px] border-2 border-white text-[15px] md:text-[1.6rem] font-bold py-[9px] px-[16px] bg-transparent transition-colors duration-1000 text-white " +
    "before:content-[''] before:absolute before:top-0 before:-left-[50px] before:w-[150%] before:h-full before:bg-[#ad0070] before:scale-x-0 before:skew-x-[35deg] before:origin-left before:-z-[0] before:z-[1] before:transition-transform before:duration-1000 group-hover:before:scale-x-100";

  let type_class = "";
  if (type === "cycle")
    type_class =
      "!rounded-full !p-[10px] !flex !justify-center !items-center !bg-transparent !border !border-white";
  if (type === "transparent") type_class = "btn-transparent";
  if (type === "square") type_class = "btn-square";
  if (type === "rectangle") type_class = "!rounded-none";

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
      {iconLeft && (
        <span className="relative z-[2] flex items-center">{iconLeft}</span>
      )}
      {content && (
        <span className="relative z-[2] button-content">{content}</span>
      )}
      {iconRight && (
        <span className="relative z-[2] flex items-center ml-[10px]">
          {iconRight}
        </span>
      )}
    </Tag>
  );
}
export default Button;
