import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import destinationEntriesData from "@/lib/preBuildScripts/static/destinations.json";
import Link from "next/link";

import NProgress from "nprogress";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
export default function DestinationDetails({ page }) {
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const destinations = destinationEntriesData.destinationEntriesData;
  const [destination, setDestination] = useState();
  const { title } = page;
  const feature = page.data.main.items;
  const links = page.data.main.button_items;
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(page.route_url);

  const handleSelectChange = (option) => {
    const selectedRoute = option?.value;

    NProgress.start();

    router
      .push(selectedRoute)
      .then(() => {
        NProgress.done();
      })
      .catch(() => {
        NProgress.done();
      });
  };

  useEffect(() => {
    setSelectedValue(page.route_url);
  }, [page.route_url]);

  const getDefaultValue = () => {
    return {
      label: page.title,
      value: page.route_url,
    };
  };

  return (
    <>
      <section className="page-banner relative flex items-center justify-center h-[560px] w-full bg-[#f1f1f1]">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <Image
          alt={"Banner"}
          src={
            page.mediaHandler?.[`main.banner`]?.[0]?.conversions.desktop ||
            page.mediaHandler?.[`main.banner`]?.[0]?.original
          }
          width={1920}
          height={1080}
          className="w-full h-full  object-cover absolute top-0 left-0"
        />
        {title && (
          <h2
            className={`${
              process.env.NEXT_PUBLIC_TEMPLATE == 1
                ? "font-tenor"
                : "font-domine"
            } text-[35px] md:text-[42px] px-5 text-center text-white relative z-[3] leading-[50px]`}
          >
            {title}
          </h2>
        )}
      </section>

      {showLazy && (
        <article className="bg-[#f1f1f1]">
          <div className="container py-[50px]">
            <div className="flex flex-col pb-[40px]">
              <span className="text-center pb-3 text-[14px]">
                Other Destinations
              </span>
              <CustomSelect
                className="react-select"
                id="destinationSelect"
                instanceId="destinationSelect"
                value={getDefaultValue()}
                defaultValue={getDefaultValue()}
                onChange={handleSelectChange}
                options={destinations?.map((item, index) => {
                  return {
                    label: item?.title,
                    value: item?.route_url,
                  };
                })}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: page?.data?.main?.description,
              }}
              className="text-[14px] leading-[25px] "
            />
          </div>
          <div className="py-5">
            {feature.map((item, index) => {
              const isOdd = index % 2 !== 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row w-full ${
                    isOdd && "flex-col md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/2">
                    <Image
                      src={
                        page.mediaHandler[`main.items.${index}.image`][0]
                          .conversions?.image ||
                        page.mediaHandler[`main.items.${index}.image`][0]
                          .original
                      }
                      alt={item?.title || "Thubmanil"}
                      height={1000}
                      width={1000}
                      quality={100}
                      className="w-full h-full sm:max-h-[630px] sm:min-h-[630px] object-cover"
                    />
                  </div>

                  <div className="flex w-full md:w-1/2 bg-primary items-center">
                    <div className="flex flex-col px-5 md:px-[50px] py-[50px] md:py-0">
                      {item?.title && (
                        <span className="text-secondary1 text-[20px] tracking-[2px]">
                          {item?.title}
                        </span>
                      )}
                      <span className="w-[75px] h-[2px] mt-[5px] bg-secondary1 block" />
                      {item?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                          className="text-[#d4bebe] text-[14px] leading-[27px] pt-5"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {links && links.length > 0 && (
            <div
              className={`flex flex-col sm:flex-row w-full gap-y-3 sm:gap-y-0 justify-center px-5 2xl:px-0 gap-x-3`}
            >
              {links?.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item?.button_url || "#"}
                    target={
                      item?.button_url?.includes("http") ? "_blank" : "_self"
                    }
                    className={`px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm ${
                      !item.button_label || !links
                        ? "border-none"
                        : "border border-secondary my-[50px]"
                    } text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300`}
                  >
                    {item?.button_label}
                  </Link>
                );
              })}
            </div>
          )}
        </article>
      )}
    </>
  );
}
