import { GithubIcon, EmailIcon, LinkedInIcon } from "./Icon";
import Button from "./Button";
export default function Footer() {
  const sizeIcon = "25px";
  const minWidth = "10px";
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-6">
        <p className="text-sm text-gray-500">
          © 2026 LitResearcher · AI Literature Review Agent
        </p>
      </div>
      <div
        className="header-social-icon flex justify-center items-center gap-[10px]
            [&_a]:!transition-none [&_a]:bg-transparent
            [&_a::before]:bg-transparent
            [&_a:hover]:text-black [&_a:hover]:bg-white
            [&_a:hover::before]:bg-white"
      >
        <Button
          external="https://github.com/Nhungnguyen0804"
          iconLeft={<GithubIcon width={sizeIcon} height={sizeIcon} />}
          type="cycle"
          target="_blank"
          minWidth={minWidth}
        />
        <Button
          external="mailto:nhungnguyen8404@gmail.com"
          iconLeft={<EmailIcon width={sizeIcon} height={sizeIcon} />}
          type="cycle"
          target="_blank"
          minWidth={minWidth}
        />
        <Button
          external="https://www.linkedin.com/in/nhungnguyen0804/"
          iconLeft={<LinkedInIcon width={sizeIcon} height={sizeIcon} />}
          type="cycle"
          target="_blank"
          minWidth={minWidth}
        />
      </div>
    </footer>
  );
}
