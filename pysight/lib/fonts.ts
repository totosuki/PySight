import { Fira_Code, Noto_Sans_JP, Space_Grotesk } from "next/font/google";

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});
