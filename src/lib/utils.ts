import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenText(text: string, maxLength = 40) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function hasTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(Date.now() / 1000) >= expiry;
}

export function getItemFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function isActiveLink(currentPath: string, linkPath: string) {
  // Check if the current path matches the link path exactly
  if (currentPath === linkPath) {
    return true;
  }

  // For the dashboard specifically, handle nested routes dynamically
  if (linkPath === "/dashboard" && currentPath.startsWith("/dashboard")) {
    // Adjust the logic if you have a more complex structure
    // This checks if it's exactly "/dashboard" or a subpath of it
    return currentPath.split("/").length === 3;
  }

  return false;
}
