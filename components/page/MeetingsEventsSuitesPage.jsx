import Link from "next/link";
import "slick-carousel/slick/slick.css";
import globalState from "@/lib/store/globalState";
import styles from "@/styles/description.module.css";
import { Fragment } from "react";
import dynamic from "next/dynamic";
export default function MeetingsEventsSuitesPage({ page }) {
  const ModalImage1 = dynamic(() =>
    import("@/components/partials/Modals/ModalImage1").then(
      (module) => module.default
    )
  );

  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const showLazy = globalState((state) => state.showLazy);
  const { title, data } = page;
  const { image, description, buttons, images } = data.main;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/30 h-full hover:bg-black/70 transition-all duration-300`}
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
        } absolute top-[50%] translate-y-[-50%] left-0 px-[10px] md:px-5 z-[20] cursor-pointer bg-black/30 h-full hover:bg-black/70 transition-all duration-300`}
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
    infinite: true,
    speed: 500,
    slidesToShow: images.length < 3 ? 2 : 3,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: images.length > 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length < 3 ? 2 : 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: images.length > 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
          arrows: images.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          arrows: images.length > 1,
        },
      },
    ],
  };

  return (
    <>
      <article className="bg-[#f1f1f1]">
        <div className="container overflow-hidden">
          {title && (
            <h2 className="text-primary text-[25px] tracking-[1px] text-center py-[30px] border-b-[1px] border-[#ccc] mb-[30px]">
              {title}
            </h2>
          )}
          {image && (
            <ModalImage1
              className="w-full h-full object-cover mb-[20px]"
              title={title}
              content={image}
              image={image}
            />
          )}
          {showLazy && (
            <div className="md:px-[40px]">
              {description && (
                <div
                  className="text-[14px] p-[10px] md:p-[15px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
              <div className="flex flex-wrap justify-center pb-[30px] md:pb-[60px]">
                {buttons.length > 0 && (
                  <>
                    {buttons?.map((item, index) => (
                      <Link
                        key={index}
                        href={item?.button_link}
                        className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[10px] ${
                          item.button_variant === "dark"
                            ? "text-white bg-primary"
                            : "border-secondary"
                        } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                      >
                        {item?.button_label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="w-full bg-[#f1f1f1] pt-[10px] pb-[30px]">
          {showLazy && (
            <>
              {images.length > 0 && (
                <>
                  <h2 className="text-primary text-[25px] text-center tracking-[1px] mb-[20px]">
                    GALLERY
                  </h2>
                  <div
                    className={`${
                      images.length > 2 ? "" : "container"
                    } flex flex-col w-full slick-gallery`}
                  >
                    <Slick {...settings} className="h-[330px] lg:h-[530px]">
                      {images?.map((item, index) => (
                        <Fragment key={index}>
                          <div className="flex">
                            <ModalImage1
                              key={index}
                              className="w-full h-[330px] lg:h-[530px] object-cover"
                              title={title || "#"}
                              content={index}
                              image={item || ""}
                              images={images}
                            />
                          </div>
                        </Fragment>
                      ))}
                    </Slick>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </article>
    </>
  );
}
