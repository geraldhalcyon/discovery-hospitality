import Script from "next/script";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain.json";
export default function FooterJuicer() {
  const { juicer_id } = tenantDetailsMain;
  const router = useRouter();
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  return (
    <>
      {juicer_id && router.asPath === "/" && (
        <SectionAccordion title={`Instagram (@${juicer_id})`}>
          <section className="py-[30px]">
            <link
              href="https://assets.juicer.io/embed.css"
              media="all"
              rel="stylesheet"
              type="text/css"
            />
            <Script src="https://assets.juicer.io/embed.js" />
            <div className="container">
              <h2 className="text-center hidden md:block text-primary text-[25px] mb-[30px]">
                We’re Social
              </h2>
              <div id="instafeed">
                <ul
                  className="juicer-feed"
                  data-feed-id={juicer_id}
                  data-origin="embed-code"
                  data-filter="Instagram"
                  data-per="6"
                ></ul>
              </div>
            </div>
          </section>
        </SectionAccordion>
      )}
    </>
  );
}
