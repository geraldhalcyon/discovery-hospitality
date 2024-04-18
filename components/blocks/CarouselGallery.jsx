import Image from "next/image";
import "slick-carousel/slick/slick.css";
import { useState } from "react";
import Link from "next/link";
import { Fragment } from "react";
import dynamic from "next/dynamic";

export default function CarouselGallery({ block }) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const ModalImage = dynamic(() =>
    import("@/components/partials/Modals/ModalImage").then(
      (module) => module.default
    )
  );
  const ModalImage1 = dynamic(() =>
    import("@/components/partials/Modals/ModalImage1").then(
      (module) => module.default
    )
  );

  const { title, images, button_link, variation } = block.main;

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

  const imagesLength = images?.length ?? 0;
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
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="55"
            viewBox="0 0 19.349 30"
          >
            <path
              id="_002-right-arrow"
              data-name="002-right-arrow"
              d="M87.566,30,106.33,15,87.566,0l-.585.732L104.829,15,86.981,29.268Z"
              transform="translate(-86.981)"
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
            width="35"
            height="55"
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
    <section className={`${variation.length === 0 ? "bg-[#f1f1f1]" : ""}`}>
      {title && (
        <h2
          className={`text-primary text-[25px] text-center tracking-[1px] px-[20px] pt-[20px] md:pt-[40px] mb-[20px] md:mb-[30px] ${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          }`}
        >
          {title}
        </h2>
      )}
      <div
        className={`${
          variation.length === 0 ? "container pb-[30px]" : ""
        } flex w-full`}
      >
        {imagesLength > 0 && (
          <div className="flex flex-col w-full slick-gallery">
            <Slick className="carousel-gallery" {...settings}>
              {images.map((item, index) => (
                <Fragment key={index}>
                  <ModalImage1
                    key={index}
                    className={`${
                      variation.length === 0
                        ? "h-[260px]"
                        : "h-[330px] lg:h-[420px]"
                    } `}
                    title={title}
                    content={index}
                    image={item}
                    images={images || []}
                  />
                </Fragment>
              ))}
            </Slick>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ModalImage
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={title}
          content={images[selectedImageIndex]}
          images={images || []}
        />
      )}
      {button_link && (
        <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center mt-[30px] mb-[60px]">
          <div className="flex flex-wrap justify-center ">
            <Link
              href={button_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-[30px] py-[20px] text-center text-xs 2sm:text-sm border border-secondary text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300"
            >
              View More Photos
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
