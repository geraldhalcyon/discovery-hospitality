import Image from "next/image";
import roomsSuitesEntriesData from "@/lib/preBuildScripts/static/rooms-suites.json";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Link from "next/link";

import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import dynamic from "next/dynamic";
export default function RoomSuitePage({ page }) {
  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const { mediaHandler, title, route_url } = page;
  const { button_links, description, features, gallery, image } =
    page.data.main;

  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState(route_url);

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
    <div>
      <section className="page-banner relative flex items-center justify-center min-h-[calc(100vh-61px)] h-[calc(100vh-61px)] w-full bg-[#f1f1f1]">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <Image
          alt={"Banner"}
          src={
            page.mediaHandler?.[`main.image`]?.[0]?.conversions.desktop ||
            page.mediaHandler?.[`main.image`]?.[0]?.original
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

      <article>
        <div className="container py-[50px]">
          <div className="flex flex-wrap px-[15px] justify-center items-center pb-[40px]">
            <span className="text-center px-[15px] mb-[10px] xs:mb-0">
              Check out other rooms
            </span>
            <div className="px-[15px]">
              <CustomSelect
                className="react-select w-full max-w-[350px] cursor-pointer"
                id="roomsuites-select"
                instanceId="roomsuites-select"
                value={getDefaultValue()}
                defaultValue={getDefaultValue()}
                onChange={handleSelectChange}
                isSearchable={false}
                options={roomsSuitesEntriesData?.map((item, index) => {
                  return {
                    label: item?.title,
                    value: item?.route_url,
                  };
                })}
              />
            </div>
          </div>

          {description && (
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
              className="text-[14px] leading-[25px] mb-[50px]"
            />
          )}
          {features && (
            <div className={`mb-[50px] ${styles.description}`}>
              <h2 className="text-[25px] uppercase text-center text-primary mb-[15px]">
                Features
              </h2>
              <div
                className="text-[14px]"
                dangerouslySetInnerHTML={{ __html: features }}
              />
            </div>
          )}
        </div>
        <CarouselGallery images={gallery} title={"Gallery"} alt_title={title || "Thumbnail"} />
        {button_links?.length > 0 && (
          <div className="bg-[#f1f1f1] flex flex-col md:flex-row gap-x-3 w-full justify-center pb-10">
            <div className="flex flex-wrap justify-center ">
              {button_links?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.button_link || item?.file || "#"}
                  className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                    item?.variant === "filled"
                      ? "text-white bg-primary"
                      : "border-secondary"
                  } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                >
                  {item?.button_label || ""}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
