import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import { use, useState } from "react";
import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function MeetingsEvensDetails({ page }) {
  const router = useRouter();
  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );
  const ModalImage = dynamic(() =>
    import("@/components/partials/Modals/ModalImage").then(
      (module) => module.default
    )
  );
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const { title } = page;
  const { description, venues } = page.data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues[0]);

  useEffect(() => {
    setCurrentVenue(venues[0]);
  }, [venues]);

  const getDefaultValue = () => {
    let defaultVenue = currentVenue?.title || title;
    return { label: defaultVenue, value: defaultVenue };
  };

  return (
    <article className="bg-[#f1f1f1]">
      <div className="relative min-h-[560px] text-white flex text-center items-center justify-center">
        <Image
          alt={title || "Banner"}
          src={
            page.mediaHandler["main.image"]?.[0].conversions.desktop ||
            page.mediaHandler["main.image"]?.[0].original ||
            "../images/image_makati-large.jpg"
          }
          width={1920}
          height={1080}
          className="w-full h-full  object-cover absolute top-0 left-0"
        />
        {title && (
          <div
            className={`relative text-[42px] px-[15px] ${
              process.env.NEXT_PUBLIC_TEMPLATE == 1
                ? "font-tenor"
                : "font-domine"
            }`}
          >
            {title}
          </div>
        )}
      </div>

      <div className="container py-[20px] sm:py-[30px]">
        {description && (
          <div
            className={`${styles.description} py-[30px]`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {venues.length > 0 && (
          <>
            <div
              className={`${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              } text-primary text-[20px] tracking-[1px] mb-[10px]`}
            >
              Select Venue:
            </div>
            <CustomSelect
              // value={selectedValue}
              isSearchable={false}
              className="react-select"
              defaultValue={getDefaultValue()}
              onChange={(e) => {
                const curVenue = venues.find((obj) => obj.title === e.value);
                setSelectedValue(e.value);
                setCurrentVenue(curVenue);
              }}
              options={venues?.map((item, index) => {
                return {
                  label: item?.title,
                  value: item?.title,
                };
              })}
            />
          </>
        )}
      </div>

      {showLazy && (
        <>
          {currentVenue && (
            <div className="container pb-[50px] mt-[30px]">
              {currentVenue.image && (
                <ModalImage
                  className="w-full h-full object-cover"
                  title={currentVenue?.title || "#"}
                  content={currentVenue?.image}
                  image={currentVenue?.image}
                />
              )}
              <div
                className={`${styles.description} my-[30px]`}
                dangerouslySetInnerHTML={{
                  __html: currentVenue?.description,
                }}
              />
              {currentVenue?.buttons?.length > 0 && (
                <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center">
                  <div className="flex flex-wrap justify-center ">
                    {currentVenue?.buttons?.map((item, index) => (
                      <Link
                        key={index}
                        href={item?.button_link}
                        className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                          item.button_variant === "dark"
                            ? "text-white bg-primary"
                            : "border-secondary"
                        } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                      >
                        {item?.button_label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {currentVenue?.images && (
            <CarouselGallery
              alt_title={currentVenue?.title || "Thumbnail"}
              images={currentVenue?.images}
            />
          )}
        </>
      )}
    </article>
  );
}
