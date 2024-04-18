import { useEffect } from "react";
import globalState from "../store/globalState";

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

export function useShowLazyCookie() {
  useEffect(() => {
    const existingCookie = getCookie("showLazy");
    if (existingCookie == "true") {
      globalState.setState({
        showLazy: true,
      });
    }

    if (existingCookie == "false") {
      document.cookie = `showLazy=true; expires=Sun, 1 Jan 2025 00:00:00 UTC; path=/`;
    }

    if (!existingCookie) {
      document.cookie = `showLazy=false; expires=Sun, 1 Jan 2025 00:00:00 UTC; path=/`;
    }

    return () => {};
  }, []);
}
