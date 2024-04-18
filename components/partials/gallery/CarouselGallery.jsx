import Slick from "react-slick";
import Image from "next/image";
import ModalImage1 from "../Modals/ModalImage1";
export default function CarouselGallery({ ...props }) {
  const { images, alt_title, title, className } = props;

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
      {images && images.length > 0 && (
        <div className={`${className || "bg-[#f1f1f1]"} flex w-full py-10`}>
          <div className="flex flex-col w-full">
            {title && (
              <span
                className={`${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? "font-tenor"
                    : "font-domine"
                } tracking-[1px] text-[25px] text-primary px-5 2xl:px-0 text-center uppercase leading-[25px] pb-[30px]`}
              >
                {title || "Gallery"}
              </span>
            )}

            <Slick {...settings} className="carousel-gallery ">
              {images?.map((item, index) => {
                return (
                  <div key={index} className="flex cursor-pointer">
                    <ModalImage1
                      content={index}
                      images={images}
                      title={alt_title}
                      image={item}
                      className="w-full h-[250px] sm:h-[300px] lg:h-[420px] object-cover"
                    />
                  </div>
                );
              })}
            </Slick>
          </div>
        </div>
      )}
    </>
  );
}
