import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
export default function DiningDetails({ block, page }) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const FooterReviews = dynamic(() =>
    import("@/layout/partials/footer/FooterReviews").then(
      (module) => module.default
    )
  );
  const ModalImage = dynamic(() =>
    import("@/components/partials/Modals/ModalImage").then(
      (module) => module.default
    )
  );

  const showLazy = globalState((state) => state.showLazy);
  const { title } = block;
  const {
    subtitle,
    description,
    award_images,
    button_links,
    schedules,
    gallery_images,
  } = page.data.main;

  const diningOffer = page?.data?.main?.dining_offer?.attributes || {};
  const { route_url, title: diningOfferTitle, data } = diningOffer;

  const { file_label, file_link } = page.data.file_button;

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

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
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
        } absolute top-[50%] translate-y-[-50%] left-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/50 h-full hover:bg-black/70 transition-all duration-300`}
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
    // infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="relative flex items-center justify-center h-[100vh] w-full bg-[#f1f1f1]">
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
          <h2 className="text-[35px] md:text-[42px] text-white relative z-[3]">
            {title}
          </h2>
        )}
      </section>
      {showLazy && (
        <article>
          <div className="container py-[50px]">
            <div className="flex flex-col md:flex-row w-full sm:gap-x-[70px] lg:gap-x-100">
              <div className="flex flex-col w-full md:w-3/4">
                <div className="flex flex-col pb-[30px]">
                  {subtitle && (
                    <div
                      dangerouslySetInnerHTML={{ __html: subtitle }}
                      className="text-[22px] text-primary leading-[25px] pb-[20px]"
                    />
                  )}
                  {description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                      className="text-[14px] leading-[25px] "
                    />
                  )}
                </div>
                {award_images && award_images.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-[25px] text-primary uppercase leading-[25px] pb-[40px]">
                      Awards / Recognitions
                    </span>
                    <div className="flex gap-x-10">
                      {award_images?.map((item, i) => {
                        return (
                          <div key={i} className="flex flex-wrap">
                            <Image
                              alt={"Banner"}
                              src={item}
                              width={160}
                              height={160}
                              className="w-full lg:h-[160px] object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <span className="pb-5 font-[700] text-[22px]">
                  Operating Hours
                </span>
                <div className="pb-7">
                  {schedules.map((item, index) => {
                    return (
                      <div key={index}>
                        <span className="flex pb-3">{item.title}</span>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.time,
                          }}
                          className="text-[18px] font-[700] leading-[25px] pb-3"
                        />
                      </div>
                    );
                  })}
                </div>
                {button_links && button_links.length > 0 && (
                  <div className={`flex flex-col w-full gap-y-3`}>
                    {button_links.map((item, index) => {
                      return (
                        <Link
                          key={index}
                          href={item.button_url || "#"}
                          className={`px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm ${
                            item.variant === "filled"
                              ? "bg-primary text-white"
                              : "border border-secondary text-secondary"
                          } uppercase hover:bg-secondary hover:text-white transition-all duration-300`}
                        >
                          {item.button_label}
                        </Link>
                      );
                    })}
                    {file_label && (
                      <>
                        {file_link && (
                          <Link
                            href={file_link}
                            target="_blank"
                            className={`w-full py-5 px-8 sm:px-3 xl:px-8 2sm:w-auto text-center text-sm border border-secondary text-secondary hover:bg-secondary hover:text-white uppercase`}
                          >
                            {file_label}
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <FooterReviews />
          </div>
          {gallery_images && gallery_images?.length > 0 && (
            <div className="flex w-full bg-[#f1f1f1] pt-10 pb-[50px]">
              <div className="flex flex-col w-full">
                <span className="text-[25px] text-primary px-5 2xl:px-0 text-center uppercase leading-[25px] pb-[40px]">
                  Gallery
                </span>
                <Slick {...settings} className="h-[330px] lg:h-[530px]">
                  {gallery_images?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex cursor-pointer"
                        onClick={() => handleOpenModal(index)}
                      >
                        <Image
                          alt={"Carousel Gallery"}
                          src={item}
                          width={628}
                          height={529}
                          className="w-full h-[330px] lg:h-[529px] object-cover"
                        />
                      </div>
                    );
                  })}
                </Slick>
              </div>
            </div>
          )}
          {/* MODAL HERE */}
          {isModalOpen && (
            <ModalImage
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title={gallery_images.title}
              content={gallery_images[selectedImageIndex]}
              images={gallery_images || []}
            />
          )}
          {diningOfferTitle && (
            <div className="w-full bg-[#f1f1f1]">
              <div className="container py-[50px]">
                <div className="flex flex-col w-full">
                  <span className="text-primary text-[25px] uppercase text-center pb-[30px]">
                    Dining Offer
                  </span>
                  <div className="flex flex-col md:flex-row w-full bg-white">
                    <div className="w-full md:w-1/2">
                      <Image
                        alt={"test"}
                        src={data.main.featured_image}
                        width={628}
                        height={280}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between w-full md:w-1/2 p-5">
                      <div className="flex flex-col">
                        <span className="text-primary text-[20px] text-center ">
                          {diningOfferTitle}
                        </span>
                        <div className="w-full flex justify-center py-5">
                          <hr className="border- border-primary w-[30px]" />
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.main.description,
                          }}
                          className="text-[14px] text-center leading-[25px] line-clamp-4 "
                        />
                      </div>
                      <Link
                        href={route_url}
                        target="_blank"
                        className={`w-full mt-5 py-5 px-8 sm:px-3 xl:px-8 2sm:w-auto text-center text-sm border border-secondary text-secondary hover:bg-secondary hover:text-white uppercase`}
                      >
                        View Offer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      )}
    </>
  );
}
