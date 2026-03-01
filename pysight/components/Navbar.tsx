import { SiGithub } from "react-icons/si";

function Navbar() {
  return (
    <div className="flex flex-row items-center justify-between h-[75px] p-[24px] border-b-[1px] border-b-(--border)">
      <a href="/" className="font-heading font-medium text-[1.8rem]">PySight</a>
      <div className="flex flex-row items-center gap-[1rem]">
        <a href="/articles/">Articles</a>
        <a href="/about/">About</a>
        <a href="https://github.com/totosuki" target="_blank" aria-label="GitHubを開く" rel="noopener noreferrer">
          <SiGithub size={24} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
