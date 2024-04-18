import Image from "next/image";
import Link from "next/link";

import tenantDetailsConnections from "@/lib/preBuildScripts/static/tenantDetailsConnections.json";

// const primary = Tenor_Sans({
//   weight: ["400"],
//   subsets: ["latin"],
// });
export default function footerConnections() {
  const connections = tenantDetailsConnections;
  const checkOddEven = (number) => {
    if (number % 2 !== 0) {
      return "odd";
    }
  };

  return (
    <>
      {connections.connection_items && (
        <>
          {process.env.NEXT_PUBLIC_TEMPLATE == 1 ? (
            <div className="connections order-1 md:order-[-2]">
              {connections?.connection_items?.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    checkOddEven(index + 1) ? "odd" : "even"
                  } border-b border-b-[1px] border-[#666] flex flex-wrap items-center pb-[20px] mb-[30px] `}
                >
                  {item?.title && (
                    <h2
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : "font-domine"
                      } uppercase text-[18px] w-full lg:w-auto lg:min-w-[180px] mb-[15px] lg:mb-0 lg:mr-[20px]`}
                    >
                      {item?.title}
                    </h2>
                  )}

                  {item?.images && (
                    <div className="flex flex-wrap w-full lg:max-w-[calc(100%-180px)] items-center mx-[-15px]">
                      {item.images.map((item, index) => (
                        <span
                          className="inline-block mb-[15px] max-w-[33.33%] md:max-w-[auto] lg:mb-0 px-[15px] md:grow-0"
                          key={index}
                        >
                          <Link
                            href={item?.link}
                            target={
                              item?.link?.includes("http") ? "_blank" : "_self"
                            }
                          >
                            <Image
                              src={item?.image}
                              width={322}
                              height={160}
                              alt="Logo"
                              className="w-auto md:max-w-[100px]"
                            />
                          </Link>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {connections?.connection_items?.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-b-[1px] pb-[15px] border-[#666] [&:not(:last-of-type)]:mb-[15px]"
                >
                  {item?.title && (
                    <h2
                      className={`${
                        process.env.NEXT_PUBLIC_TEMPLATE == 1
                          ? "font-tenor"
                          : "font-domine"
                      } uppercase text-center text-[18px] w-full lg:w-auto lg:min-w-[180px] mb-[15px] lg:mb-0 lg:mr-[20px]`}
                    >
                      {item?.title}
                    </h2>
                  )}

                  {item?.images && (
                    <div className="mt-[15px] flex gap-x-[15px] flex-wrap justify-center items-center">
                      {item.images.map((item, index) => (
                        <div key={index}>
                          <Link href={item?.link || "#"} target="_blank">
                            <Image
                              src={item?.image}
                              width={250}
                              height={150}
                              className="max-w-[200px]"
                              alt={item?.title || "Connection"}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
