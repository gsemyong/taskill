import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToRgb(hexColor: string): string | null {
  hexColor = hexColor.replace(/^#/, "");

  const red = parseInt(hexColor.slice(0, 2), 16);
  const green = parseInt(hexColor.slice(2, 4), 16);
  const blue = parseInt(hexColor.slice(4, 6), 16);
  const rgb = `${red} ${green} ${blue}`;
  return rgb;
}

export function buildUserChatLink(username: string) {
  return `http://t.me/${username}/`;
}
