import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import destinationEntriesData from "@/lib/preBuildScripts/static/destinations.json";
import Link from "next/link";

import NProgress from "nprogress";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";

export default function DestinationDetails({ block, page }) {
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );
  const showLazy = globalState((state) => state.showLazy);
  const destinations = destinationEntriesData.destinationEntriesData;
  const [destination, setDestination] = useState();
  const { title } = block;
  const feature = block.data.main.items;
  const links = block.data.main.button_items;
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
      <section className="page-banner relative flex items-center justify-center min-h-[calc(100vh-61px)] h-[calc(100vh-61px)] w-full bg-[#f1f1f1]">
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
          <h2 className="text-[35px] md:text-[42px] px-5 text-center text-white relative z-[3] leading-[50px]">
            {title}
          </h2>
        )}
      </section>

      {showLazy && (
        <article>
          <div className="container py-[50px]">
            <div className="flex flex-col pb-[40px]">
              <span className="text-center pb-3">Other Destination</span>
              <CustomSelect
                className="react-select"
                id="destinationSelect"
                instanceId="destinationSelect"
                value={getDefaultValue()}
                defaultValue={getDefaultValue()}
                onChange={handleSelectChange}
                isSearchable={false}
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
                __html: block?.data?.main?.description,
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
                        block.mediaHandler[`main.items.${index}.image`][0]
                          .conversions?.image ||
                        block.mediaHandler[`main.items.${index}.image`][0]
                          .original
                      }
                      alt={item.title}
                      height={1000}
                      width={1000}
                      quality={100}
                      className="w-full h-full sm:max-h-[630px] sm:min-h-[630px] object-cover"
                    />
                  </div>

                  <div className="flex w-full md:w-1/2 bg-primary items-center">
                    <div className="flex flex-col px-5 md:px-[50px] py-[50px] md:py-0">
                      <span className="text-secondary1 text-[20px] tracking-[2px]">
                        {item?.title}
                      </span>
                      <div className="w-[75px] mt-[5px] h-[2px] bg-secondary1 mb-[20px]" />
                      {item?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                          className="text-secondary1 pt-5"
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
              className={`flex flex-col sm:flex-row w-full gap-y-3 sm:gap-y-0 justify-center px-5 2xl:px-0 gap-x-3 bg-white`}
            >
              {links.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.button_url || "#"}
                    className={`px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm ${
                      !item.button_label || !links
                        ? "border-none"
                        : "border border-secondary my-[50px]"
                    } text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300`}
                  >
                    {item.button_label}
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
