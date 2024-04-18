import { useEffect, useState } from "react";
import styles from "@/styles/backtop.module.css";

const BackTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${styles.backTop} hover:opacity-[.6]`}>
      <button
        className={`transition ${isVisible ? "visible" : "invisible"}`}
        onClick={scrollToTop}
      >
        ^
      </button>
    </div>
  );
};

export default BackTop;
