import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { User, LogOut } from "lucide-react";

export default function UserAvatar() {
  const handleLogout = () => {
    console.log("logout");
    // sau này gọi API logout ở đây
  };

  let width_dropdown_item = "";
  let h_dropdown_item = "h-10";
  return (
    <DropdownMenu>
      {/* phần bấm vào */}
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />

          <AvatarFallback>YN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* menu xổ xuống */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-52 rounded-xl border bg-white space-y-2 p-2 shadow-lg"
      >
        <div className="flex flex-col gap-2">
          <DropdownMenuItem
            className={`${width_dropdown_item} ${h_dropdown_item} cursor-pointer rounded-lg px-3 text-sm hover:bg-muted bg-purple-100  `}
          >
            <User className=" mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className={`${width_dropdown_item} ${h_dropdown_item} cursor-pointer rounded-lg px-3 text-sm hover:bg-muted bg-purple-100`}
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
