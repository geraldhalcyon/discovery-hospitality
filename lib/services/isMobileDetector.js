import { useState, useEffect } from "react";

export function useMobileDetector() {
  const [isMobile, setIsMobile] = useState(false);

  const getWindowWidth = () => {
    setIsMobile(window.innerWidth <= 1199);
  };

  useEffect(() => {
    getWindowWidth();
    window.addEventListener("resize", getWindowWidth);
    return () => {
      window.removeEventListener("resize", getWindowWidth);
    };
  }, []);

  return isMobile;
}
