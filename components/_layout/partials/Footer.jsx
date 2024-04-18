import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import dynamic from "next/dynamic";

export default function Footer() {
  const FooterDestinations = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterDestinations")
  );

  const FooterConnections = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterConnections")
  );

  const FooterSocial = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterSocial")
  );

  const FooterJuicer = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterJuicer")
  );

  const FooterMenu = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterMenu")
  );

  const FooterNewsletter = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterNewsletter")
  );

  const FooterReviews = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterReviews")
  );

  const FooterCallToActions = dynamic(() =>
    import("@/components/_layout/partials/footer/FooterCallToActions")
  );
  return (
    <footer className="footer">
      <FooterJuicer />
      <FooterCallToActions />
      <FooterReviews />
      <FooterNewsletter />
      <FooterDestinations />
      <div className="footer-content text-white bg-[#555555] pt-[30px] pb-[76px] md:pb-[60px]">
        <div className="container">
          <FooterConnections />
          <FooterMenu />
          <div className="footer-bottom flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center">
            <div className="copy-right text-center md:text-left order-1 md:order-[-2]">
              <p className="text-[12px] uppercase">
                &copy; {new Date().getFullYear()}{" "}
                {globalData.tenantDetails.name}. All rights reserved
              </p>
            </div>
            <FooterSocial />
          </div>
        </div>
      </div>
    </footer>
  );
}
