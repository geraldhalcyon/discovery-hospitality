import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import globalState from "@/lib/store/globalState";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { useMobileDetector } from "@/lib/services/isMobileDetector";
export default function Slider({ block, mediaHandler }) {
  const [isMobile, setIsMobile] = useState(useMobileDetector());
  const linkElementRef = useRef(null);

  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  let { slider_items } = block.main;
  const showLazy = globalState((state) => state.showLazy);

  const initialSlides = 1;
  if (showLazy === true) {
    slider_items = slider_items.slice(0, slider_items.length);
  } else {
    slider_items = slider_items.slice(0, initialSlides);
  }
  useEffect(() => {
    const handleResize = () => {
      const linkElement = document.createElement("link");
      linkElement.rel = "preload";
      let preloadImg;

      if (linkElement) {
        linkElement.as = "image";
        document.head.appendChild(linkElement);
        linkElementRef.current = linkElement;
        if (window.innerWidth <= 414) {
          preloadImg = slider_items[0]?.image_mobile;
        } else {
          preloadImg = slider_items[0]?.image_desktop;
        }

        if (preloadImg) {
          linkElement.href = preloadImg;
        }
      }
    };
    if (slider_items.length > 0 && !linkElementRef.current) {
      window.addEventListener("orientationchange", handleResize);
      window.addEventListener("load", handleResize);

      handleResize();
    }
  }, [slider_items]);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
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
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] left-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
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
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    fade: true,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="block-slider slider relative">
      {slider_items && slider_items.length > 0 && (
        <Slick {...settings}>
          {slider_items?.map((item, index) => (
            <div className="w-full relative" key={index}>
              <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.3] z-[1]"></span>
              <picture>
                <source
                  media="(min-width: 415px)"
                  srcSet={item?.image_desktop}
                />
                <source
                  media="(max-width: 414px)"
                  srcSet={item?.image_mobile}
                />
                <Image
                  src={item?.image_mobile}
                  alt={item?.title || "Slider Image"}
                  width={1920}
                  height={750}
                  className="absolute z-[-1] top-0 left-0 h-full w-full object-cover"
                  loading="eager"
                />
              </picture>

              <div className="py-[80px] mx-w-[1200px] lg:py-[50px] min-h-[calc(100dvh-67px)] xl:min-h-[600px] xl:h-[560px] px-[30px] md:px-[100px] lg:px-[150px] w-full flex flex-col justify-center items-center text-white relative z-[3]">
                {item?.title && (
                  <div
                    className={`text-[35px] text-center md:text-[42px] mb-[15px] font-tenor`}
                  >
                    {item?.title}
                  </div>
                )}
                {item?.description && (
                  <div
                    className="mb-[15px] text-center"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                )}

                {item?.url && (
                  <Link
                    className="uppercase border px-[30px] py-[10px] inline-block border-[1px] border-[#fff] hover:text-primary hover:bg-[#fff] transition-all duration-300 ease-in-out "
                    href={item?.url}
                  >
                    {process.env.NEXT_PUBLIC_TEMPLATE == 1
                      ? "Discover More"
                      : "Learn More"}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </Slick>
      )}
    </div>
  );
}
