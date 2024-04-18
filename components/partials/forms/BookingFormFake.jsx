import dynamic from "next/dynamic";

import { useMobileDetector } from "@/lib/services/isMobileDetect.js";

import { useEffect } from "react";

export default function BookingFormFake({ ...props }) {
  const isMobile = useMobileDetector();
  const Calendar = dynamic(() =>
    import("@/components/icons/Calendar").then((module) => module.default)
  );
  const User = dynamic(() =>
    import("@/components/icons/User").then((module) => module.default)
  );
  const ArrowDown = dynamic(() =>
    import("@/components/icons/ArrowDown").then((module) => module.default)
  );

  const { page, blocks } = props;
  const disabledTypes = ["offers", "blog"];
  const disabledBlocks = ["Title"];
  useEffect(() => {
    setIsFloat(true);
    disabledBlocks.forEach((blockName) => {
      const hasTitleBlock = blocks?.find((block) => block?.key === blockName);
      const hasPageBannerBlock = blocks?.find(
        (block) => block?.key === "PageBanner"
      );
      const hasSliderBlock = blocks?.find((block) => block?.key === "Slider");

      if (hasTitleBlock) {
        setIsFloat(false);
      }
      if (
        page?.type === "pages" &&
        !hasTitleBlock &&
        !hasPageBannerBlock &&
        !hasSliderBlock
      ) {
        setIsFloat(false);
      }
    });

    if (disabledTypes.includes(page?.content?.id)) {
      //
      setIsFloat(false);
    }
  }, [disabledBlocks, disabledTypes, blocks, page]);
  return (
    <div>
      <div
        className={`${
          isFloat ? "mb-[-50px]" : ""
        } booking-form relative z-[22] backdrop-blur-[2px] w-full z-[1] bg-[#fff] bg-opacity-70 border-t-[1px] border-[#fff] select-none`}
      >
        <div className="flex justify-end text-[14px] h-full">
          <div className="text-primary py-[10px] pr-[15px] border-r-[1px] border-[#a7a7a7] text-[16px] uppercase">
            Quick book
          </div>
          <div className="form-item min-w-[160px] relative flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer">
            <Calendar className="mr-[10px]" />
            Arrival
          </div>

          <div className="form-item min-w-[160px] flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer">
            <Calendar className="mr-[10px]" />
            Departure
          </div>
          <div className="form-item min-w-[160px] flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer">
            <User className="mr-[10px]" />
            1 Adults, 0 Children
            <ArrowDown className="ml-[5px]" width={10} />
          </div>

          <div className="bg-primary text-white items-center py-[10px] px-[20px] uppercase cursor-pointer hover:bg-[#555]">
            Check Availability
          </div>
        </div>
      </div>
    </div>
  );
}
