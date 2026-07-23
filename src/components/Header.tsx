import NavbarMenu from "./NavbarMenu";
import UserAvatar from "./UserAvatar";
function Header() {
  return (
    <div className="sticky top-0 z-50 left-0 w-full border-b-2 border-white bg-[var(--body-bg-color)] py-[5px] px-[10px] md:px-[50px]">
      <div className="w-full h-[var(--height-header)] flex items-center justify-between">
        <div className="font-[Pacifico] text-[18px] md:text-[40px] ">
          Lit Researcher
        </div>
        <div className="header-navbar">
          <NavbarMenu />
        </div>

        <div>
          <UserAvatar />
        </div>
      </div>
    </div>
  );
}
export default Header;
