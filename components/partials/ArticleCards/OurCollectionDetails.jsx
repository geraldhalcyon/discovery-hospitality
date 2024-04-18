import Image from "next/image";

import ourCollectionEntriesData from "@/lib/preBuildScripts/static/our-collection.json";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
export default function OurCollectionDetails({ block, page }) {
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const ModalImage = dynamic(() =>
    import("@/components/partials/Modals/ModalImage").then(
      (module) => module.default
    )
  );

  const showLazy = globalState((state) => state.showLazy);
  const ourCollection = ourCollectionEntriesData.ourCollectionEntriesData;
  const { title } = block;
  const {
    subtitle,
    inner_banner,
    mobile_banner,
    button_links,
    images,
    images_title,
    virtual_url,
    award_images,
    button_file_label,
    link_file,
  } = page.data.main;

  const { content_title, description, image } = page.data.contents;
  const router = useRouter();

  const route_url = page.route_url;
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
        breakpoint: 600,
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
      <section className="page-banner relative flex items-center justify-center min-h-[calc(100vh-61px)] h-[calc(100vh-61px)] w-full bg-[#f1f1f1]">
        <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
        <Image
          alt={"Banner"}
          src={inner_banner || "../images/image_makati-large.jpg"}
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
          <div className="w-full bg-[#f1f1f1]">
            <div className="container px-5 2xl:px-0 py-[50px] ">
              <div className="flex flex-col pb-[40px]">
                <span className="text-center text-sm pb-3">
                  More from our collection
                </span>
                <CustomSelect
                  className="react-select"
                  id="ourCollectionSelect"
                  instanceId="ourCollectionSelect"
                  isSearchable={false}
                  // value={getDefaultValue()}
                  defaultValue={getDefaultValue()}
                  onChange={handleSelectChange}
                  options={ourCollection?.map((d, index) => {
                    return {
                      label: d?.title,
                      value: d?.route_url,
                    };
                  })}
                />
              </div>
              <div className="flex flex-col py-5">
                <div
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                  className="text-primary text-[22px] leading-[25px] text-center pb-[30px]"
                />
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="text-[14px] leading-[25px]"
                />
                {image && image.length > 0 && (
                  <div className="pt-5">
                    <Image
                      alt={"content image"}
                      src={image}
                      width={628}
                      height={529}
                      className="w-full h-[330px] lg:h-full object-cover"
                    />
                  </div>
                )}
              </div>
              {button_links && button_links.length > 0 && (
                <div className="flex flex-col md:flex-row gap-x-3 gap-y-3 md:gap-y-0 w-full justify-center">
                  {button_links.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        href={item.btn_link || []}
                        className={`px-3 2sm:px-5 py-5 text-center text-xs 2sm:text-sm ${
                          item.variant === "filled"
                            ? "text-white bg-primary"
                            : "border-secondary"
                        } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                      >
                        {item.btn_label}
                      </Link>
                    );
                  })}
                  {button_file_label && link_file && (
                    <Link
                      href={link_file || "#"}
                      target="_blank"
                      className={`w-full py-5 px-8 sm:px-3 xl:px-8 2sm:w-auto text-center text-sm border border-secondary text-secondary hover:bg-secondary hover:text-white uppercase`}
                    >
                      {button_file_label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          {images && images?.length > 0 && (
            <div className="flex w-full bg-white pt-10 pb-[50px]">
              <div className="flex flex-col w-full">
                <span className="text-[25px] text-primary px-5 2xl:px-0 text-center uppercase leading-[25px] pb-[40px]">
                  Gallery
                </span>
                <Slick {...settings} className="h-[330px] lg:h-[530px]">
                  {images?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex cursor-pointer"
                        onClick={() => handleOpenModal(index)}
                      >
                        <Image
                          alt={images_title}
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
              title={images.title}
              content={images[selectedImageIndex]}
              images={images || []}
            />
          )}
          <div className="container px-5 2xl:px-0">
            {virtual_url && virtual_url?.length > 0 && (
              <div className="flex w-full justify-center pt-10 pb-[50px]">
                <div className="flex flex-col w-full">
                  <span className="text-[25px] text-primary px-5 2xl:px-0 text-center uppercase leading-[25px] pb-[40px]">
                    Virtual Tour
                  </span>
                  <div className="flex w-ful">
                    <iframe
                      className="bg-[#ddd] "
                      width="100%"
                      height="500"
                      src={virtual_url}
                    />
                  </div>
                </div>
              </div>
            )}
            {award_images && award_images?.length > 0 && (
              <div className="flex w-full justify-center pt-10 pb-[50px]">
                <div className="flex flex-col">
                  <span className="text-[25px] text-primary px-5 2xl:px-0 text-center uppercase leading-[25px] pb-[40px]">
                    Awards
                  </span>
                  <div className="flex flex-wrap  gap-x-5 items-center gap-y-5 justify-center">
                    {award_images?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full 2sm:w-auto justify-center"
                        >
                          <Image
                            alt={"Banner"}
                            src={item}
                            width={160}
                            height={194}
                            className="2sm:w-full h-full 2sm:min-h-[100px] 2sm:max-h-[139px] object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      )}
    </>
  );
}
