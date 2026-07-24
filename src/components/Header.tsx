import NavbarMenu from "./NavbarMenu";
import UserAvatar from "./UserAvatar";
import { ImageIcon } from "./Icon";
import { img } from "../assets/img";
// import Button from "./Button/Button";
// import RippleGlow from "./RippleGlowEffect/RippleGlow";
function Header() {
  return (
    <div className="  sticky top-0 z-50 left-0 w-full border-b-2  py-3 px-12 bg-white">
      <div className="w-full h-[var(--height-header)] flex items-center justify-between">
        <div className="flex gap-2">
          <ImageIcon src={img.logo} />
          <div className="logo text-[18px] md:text-[40px] text-sky-900">
            Aqua Research AI
          </div>
        </div>
        <div className="header-navbar">
          <NavbarMenu />
        </div>

        <div>
          <UserAvatar />
        </div>

        {/* <div className="header-button">
          <RippleGlow color="rgba(255,255,255,0.7)">
            <Button
              content="Connect With Me!"
              type="rectangle"
              external="mailto:nhungnguyen8404@gmail.com"
              className="effect-water"
            />
          </RippleGlow>
        </div> */}
      </div>
    </div>
  );
}
export default Header;
