import Image from "next/image";
import meetingsEventsEntriesData from "@/lib/preBuildScripts/static/meetings-events-article.json";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import { useEffect, useState } from "react";
import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import dynamic from "next/dynamic";
export default function MeetingsEvensDetails({ block, page }) {
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const ModalImage = dynamic(() =>
    import("@/components/partials/Modals/ModalImage").then(
      (module) => module.default
    )
  );

  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const meetingsEvents = meetingsEventsEntriesData.meetingsEventsEntriesData;
  const { title } = block;
  const { description, venues } = page.data.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentVenue, setCurrentVenue] = useState(venues[0]);

  const getDefaultValue = () => {
    let defaultVenue = venues[0]?.title || "";
    return { label: defaultVenue, value: defaultVenue };
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpenModal = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const imagesLength = currentVenue?.images?.length ?? 0;

  let imagesDisplay = imagesLength < 3 ? 2 : 3;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            width={25}
            height={54}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27 44"
          >
            <path
              d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] left-0 px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={54}
            viewBox="0 0 19.349 30"
          >
            <path
              id="_002-right-arrow"
              data-name="002-right-arrow"
              d="M105.745,30,86.981,15,105.745,0l.585.732L88.482,15,106.33,29.268Z"
              transform="translate(-86.981)"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: imagesDisplay,
    slidesToScroll: imagesDisplay,
    cssEase: "linear",
    arrows: imagesLength > 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: imagesDisplay,
          slidesToScroll: imagesDisplay,
          infinite: true,
          arrows: imagesLength > 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
          arrows: imagesLength > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          arrows: imagesLength > 1,
        },
      },
    ],
  };
  return (
    <>
      <article className="bg-[#f1f1f1]">
        <div className="relative min-h-[100vh] text-white flex items-center justify-center">
          <Image
            alt={title}
            src={
              page.mediaHandler["main.image"]?.[0].conversions.desktop ||
              page.mediaHandler["main.image"]?.[0].original ||
              "../images/image_makati-large.jpg"
            }
            width={1920}
            height={1080}
            className="w-full h-full  object-cover absolute top-0 left-0"
          />
          {title && <div className="relative text-[42px]">{title}</div>}
        </div>

        {showLazy && (
          <>
            <div className="container pt-[20px] sm:pt-[30px]">
              {description && (
                <div
                  className={`${styles.description} my-[30px]`}
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              )}
              {venues.length > 0 && (
                <>
                  <div className="text-primary text-[20px] tracking-[1px] mb-[10px]">
                    Select Venue:
                  </div>
                  <CustomSelect
                    // value={selectedValue}
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
            </div>

            {currentVenue && (
              <div className="container pb-[50px] mt-[30px]">
                <div onClick={handleOpenModal}>
                  {currentVenue.image && (
                    <Image
                      src={currentVenue.image}
                      width={1200}
                      height={500}
                      alt={currentVenue.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div
                  className={`${styles.description} my-[30px]`}
                  dangerouslySetInnerHTML={{
                    __html: currentVenue.description,
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
            <div className="flex w-full bg-[#f1f1f1] pt-[10px] pb-[30px]">
              {imagesLength > 0 && (
                <div className="flex flex-col w-full slick-gallery">
                  <Slick {...settings} className="h-[330px] lg:h-[530px]">
                    {currentVenue?.images.map((item, index) => (
                      <div
                        key={index}
                        className="flex"
                        onClick={() => handleOpenModal(index)}
                      >
                        <Image
                          alt={currentVenue.title}
                          src={item}
                          width={630}
                          height={530}
                          className="w-full h-[330px] lg:h-[530px] object-cover"
                        />
                      </div>
                    ))}
                  </Slick>
                </div>
              )}
            </div>
          </>
        )}
        {isModalOpen && (
          <ModalImage
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={currentVenue.title}
            content={
              currentVenue.image || currentVenue.images[selectedImageIndex]
            }
            images={currentVenue.images || []}
          />
        )}
      </article>
    </>
  );
}
