import "@/styles/globals.css";
import "@/styles/customs.css";
import DefaultLayout from "@/components/_layout/DefaultLayout";
import globalState from "@/lib/store/globalState";
import { useEffect } from "react";
import { useShowLazyCookie } from "@/lib/services/showLazyCookie";

import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";

const primary = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }) {
  const test = useShowLazyCookie();
  const TenantScripts = dynamic(() =>
    import("@/layout/partials/TenantScripts")
  );
  const showLazy = globalState((state) => state.showLazy);
  const { page, blocks } = pageProps;

  useEffect(() => {
    globalState.setState({ ready: true });

    const handleInteraction = () => {
      globalState.setState({
        showLazy: true,
      });
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("scroll", handleInteraction, {
        passive: true,
      });
      document.addEventListener("click", handleInteraction, { passive: true });
      document.removeEventListener("mousemove", handleInteraction, {
        passive: true,
      });
      document.removeEventListener("touchstart", handleInteraction, {
        passive: true,
      });
    };

    document.addEventListener("scroll", handleInteraction, { passive: true });
    document.addEventListener("click", handleInteraction, { passive: true });
    document.addEventListener("mousemove", handleInteraction, {
      passive: true,
    });
    document.addEventListener("touchstart", handleInteraction, {
      passive: true,
    });

    return removeInteractionListeners;
  }, []);

  return (
    <>
      <div
        className={`text-[#555] ${primary.className} text-[16px] flex flex-col min-h-[102vh]`}
      >
        <DefaultLayout page={page} blocks={blocks}>
          <Component {...pageProps} />
        </DefaultLayout>
      </div>

      {showLazy && <TenantScripts />}
    </>
  );
}
