import Image from "next/image";
import { useState } from "react";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
import { useEffect } from "react";
export default function OfferDetails({ page }) {
  const VenueDescription = dynamic(() =>
    import("../nodes/meetings-events/VenueDescription").then(
      (module) => module.default
    )
  );

  const ButtonsRepeater = dynamic(() =>
    import("../partials/buttons/ButtonsRepeater").then(
      (module) => module.default
    )
  );

  const CarouselGallery = dynamic(() =>
    import("../partials/gallery/CarouselGallery").then(
      (module) => module.default
    )
  );

  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const { title, id, data, metaData, published_at, mediaHandler } = page;
  const { description, image, venues } = data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues[0]);

  useEffect(() => {
    setCurrentVenue(venues[0]);
  }, [venues]);

  const getDefaultValue = () => {
    return { label: currentVenue.title, value: currentVenue.value };
  };
  return (
    <article className="bg-[#F1F1F1]">
      <div className="max-w-[950px] mx-auto">
        <h2
          className={`${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          } text-primary text-[25px] tracking-[1px] text-center pt-[35px] pb-[25px] border-b-[1px] border-[#ccc] mb-[20px]`}
        >
          {title}
        </h2>
        {mediaHandler["main.image"]?.[0] && (
          <Image
            className="mb-[30px]"
            src={
              mediaHandler["main.image"]?.[0].conversions.desktop ||
              mediaHandler["main.image"]?.[0].original
            }
            width={1200}
            height={450}
            alt={title || "Thumbnail"}
          />
        )}
        {description && (
          <div
            className="text-[14px] mb-[30px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {showLazy && (
          <>
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
                  // value={currentVenue}
                  isSearchable={false}
                  className="react-select"
                  defaultValue={getDefaultValue()}
                  onChange={(e) =>
                    setSelectedValue(() => {
                      Number(e.value);
                      const curVenue = venues.find(
                        (obj) => obj.title === e.value
                      );
                      setCurrentVenue(curVenue);
                    })
                  }
                  options={venues?.map((item, index) => {
                    return {
                      label: item?.title,
                      value: item?.title,
                    };
                  })}
                />
              </>
            )}
          </>
        )}
      </div>

      {showLazy && (
        <>
          {currentVenue && (
            <>
              <div className="max-w-[950px] mx-auto mt-[30px]">
                {currentVenue && (
                  <>
                    {currentVenue?.description && (
                      <VenueDescription
                        className={`bg-white shadow-md px-[40px] py-[30px] mb-[50px] `}
                        description={currentVenue.description}
                      />
                    )}
                    {currentVenue?.buttons &&
                      currentVenue?.buttons?.length > 0 && (
                        <ButtonsRepeater
                          className="pb-[50px]"
                          buttons={currentVenue.buttons}
                        />
                      )}
                  </>
                )}
              </div>

              {currentVenue?.gallery && (
                <CarouselGallery
                  className="py-0"
                  images={currentVenue.gallery}
                />
              )}
            </>
          )}
        </>
      )}
    </article>
  );
}
