import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
export default function CallToActions({ block }) {
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  const { block_title, items } = block.main;
  return (
    <SectionAccordion
      title={block_title || "What to find out"}
      childrenClassname="pb-0"
    >
      <section className="bg-[#F1F1F1] overflow-hidden py-[30px] lg:py-[40px]">
        <div className="container">
          {block_title && (
            <h2 className="font-tenor text-center text-primary hidden md:block text-[22px] mb-[30px]">
              {block_title}
            </h2>
          )}
          {items?.length > 0 && (
            <div className="flex flex-wrap mx-[-15px]">
              {items?.map((item, index) => (
                <div
                  className="w-full px-[15px] mb-[40px] md:max-w-[33.33%]"
                  key={index}
                >
                  <Link
                    href={item?.link}
                    target={item?.link?.includes("http") ? "_blank" : "_self"}
                    className="flex items-center group hover:text-primary text-[#999] text-[18px]"
                  >
                    <span className="mr-[15px] min-w-[60px] min-h-[60px] w-[60px] h-[60px] p-[5px] rounded-full flex items-center justify-center bg-[#ddd7cc] group-hover:bg-primary ">
                      <Image
                        src={item.icon}
                        width={35}
                        height={35}
                        alt="What Guests Love?"
                        className={`w-[35px] h-[35px] object-contain transition ${
                          process.env.NEXT_PUBLIC_TEMPLATE == 1
                            ? "group-hover:!invert-[100%] group-hover:!contrast-[100%] group-hover:!brightness-[100%]"
                            : "group-hover:!brightness-[1000%]"
                        }`}
                        style={{
                          filter: `invert(55%) sepia(11%) saturate(819%) hue-rotate(4deg) brightness(97%) contrast(92%)`,
                        }}
                      />
                    </span>
                    <div className="flex flex-col">
                      <h3>{item.title}</h3>
                      {item?.short_text && (
                        <p className="text-[14px] text-[#555] group-hover:text-primary">
                          {item?.short_text}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SectionAccordion>
  );
}
