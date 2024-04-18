import Image from "next/image";
import Link from "next/link";
import globalData from "@/lib/preBuildScripts/static/globalData.json";
import SectionAccordion from "../partials/collapsibles/SectionAccordion";
export default function GridFloatBookDirect({ block }) {
  const { block_title, items } = globalData.tenantDetails.data.call_to_actions;
  const gridItems = block.main.items;
  return (
    <section className="md:py-[58px] overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap mx-[-15px]">
          <div className="w-full px-[15px] lg:mb-0 lg:max-w-[33.33%]">
            <SectionAccordion
              title="Why Book Direct?"
              childrenClassname="pb-[15px] md:pb-0"
            >
              <h2 className="hidden md:block text-primary text-[22px] mb-[20px] font-tenor">
                Why Book Direct?
              </h2>
              <div className="pl-[15px] lg:pl-[40px]">
                <div className="flex flex-wrap mx-[-15px] lg:flex-col">
                  {items?.map((item, index) => (
                    <div
                      className="w-full sm:max-w-[50%] px-[-15px] lg:max-w-full flex flex-wrap items-center [&:not(:last-of-type)]:mb-[20px]  text-[12px]"
                      key={index}
                    >
                      <span className="mr-[15px] min-w-[60px] min-h-[60px] w-[60px] h-[60px] p-[5px] rounded-full flex items-center justify-center bg-primary ">
                        <Image
                          src={item.icon}
                          width={30}
                          height={30}
                          className="!invert-[100%] !brightness-[100%] !contrast-[100%]"
                          alt={item.title || "Discover"}
                        />
                      </span>

                      <h3 className="text-primary w-full max-w-[calc(100%-95px)]">
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </SectionAccordion>
          </div>
          <div className="w-full md:px-[15px] lg:max-w-[66.66%]">
            <div className="flex flex-wrap mx-[-15px]">
              {gridItems?.map((item, index) => (
                <div
                  className="px-[15px] w-full md:max-w-[50%] mb-[15px] md:mb-0"
                  key={index}
                >
                  <SectionAccordion
                    title={item?.title}
                    childrenClassname="px-[15px] md:px-0 pb-[15px] md:pb-0"
                  >
                    <h2
                      className={`hidden md:block text-center text-primary text-[22px] mb-[20px] ${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : "font-domine"
                      }`}
                    >
                      {item?.title}
                    </h2>
                    <div className="relative text-center text-white">
                      <Image
                        src={item?.image  || `/images/image_makati-large.jpg`}
                        width={900}
                        height={500}
                        alt={item.title || "Thumbnail"}
                        className="absolute top-0 w-full h-full object-cover"
                      />
                      <div className="flex flex-col relative bg-black/[0.4] min-h-[300px] lg:min-h-[500px] px-[40px] py-[30px]">
                        <div
                          className="grow relative text-[14px]"
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                        <div className="text-center mt-[15px] relative">
                          <Link
                            className="uppercase inline-block border border-[#fff] py-[15px] px-[30px] transition hover:text-primary1 hover:bg-white"
                            href={item?.link}
                          >
                            Discover More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SectionAccordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
