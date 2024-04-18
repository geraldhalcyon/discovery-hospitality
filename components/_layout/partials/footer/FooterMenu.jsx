import Link from "next/link";
import menuData from "../../../../lib/preBuildScripts/static/footerMenu.json";

export default function FooterMenu() {
  const { nodes } = menuData.footerMenuData;
  return (
    <div className="footer-menu pb-[65px]">
      {nodes && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {nodes.map((item, index) => (
              <div
                className="w-full uppercase mb-[20px] xl:mr-[100px]"
                key={index}
              >
                <Link
                  className="text-[#cfcfcf] text-[14px] inline-block hover:opacity-[.6]"
                  href={item.url}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
