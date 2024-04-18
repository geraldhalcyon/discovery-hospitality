import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import { useState } from "react";

import { ReactDOM } from "react-dom";
import { createRoot } from "react-dom/client";
export default function ModalImage1({ ...props }) {
  const modalOverlayRef = useRef(null);
  const { content, images, title, image, className } = props;
  const selectedImageIndex = content;
  const [isOpen, setIsOpen] = useState(false);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        data-tag="NextArrow"
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] right-0 px-5 z-[20] cursor-pointer transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            data-tag="NextArrow"
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
        data-tag="PrevArrow"
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] translate-y-[-50%] left-0 px-5 z-[20] cursor-pointer transition-all duration-300`}
        onClick={onClick}
      >
        <div className="flex items-center h-full">
          <svg
            data-tag="PrevArrow"
            width={25}
            height={54}
            xmlns="http://www.w3.org/2000/svg"
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
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: selectedImageIndex,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  const PopupSlider = () => {
    return (
      <>
        {isOpen && (
          <div
            ref={modalOverlayRef}
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[100] transition-opacity duration-700 ease-in-out opacity-100"
          >
            <span
              className="absolute z-[1] top-[20px] right-[20px] cursor-pointer text-[30px] font-semibold text-[#ccc] hover:text-white"
              onClick={closedPopup}
            >
              <svg
                className="w-[40px] h-[40px] fill-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Close</title>
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <span
              className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80"
              onClick={closedPopup}
            ></span>
            <div className="w-full md:max-w-[1200px] px-[15px] relative">
              <Slick
                {...settings}
                className="bg-[length:50px_50px] bg-[url('/images/preloader.gif')] bg-no-repeat bg-center"
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <Image
                      alt={title || "#"}
                      src={image || "/images/Banner-Safe-Space-Desktop.jpg"}
                      width={630}
                      height={530}
                      className="w-full h-[300px] sm:h-[450px] md:h-[700px] object-contain bg-[#000] rounded-[3px]"
                    />
                  </div>
                ))}
              </Slick>
            </div>
          </div>
        )}
      </>
    );
  };

  const closedPopup = () => {
    setIsOpen(false);
    const popup = document.querySelector(".modal-root");
    if (popup) {
      popup.remove();
    }
    document.body.style.overflow = "unset";
  };

  const closeOnEsc = (event) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      closedPopup();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", closeOnEsc);

    document.body.style.overflow = "unset";
    const modal = document.querySelector(".modal-root");
    if (modal) {
      modal.remove();
    }
    const modalAppend = document.createElement("div");
    modalAppend.classList.add("modal-root");
    const root = createRoot(modalAppend);

    if (isOpen) {
      document.body.appendChild(modalAppend);
      document.body.style.overflow = "hidden";

      root.render(
        <React.StrictMode>
          <PopupSlider />
        </React.StrictMode>
      );
    }
  }, [isOpen]);

  return (
    <>
      <Image
        className={`${className} w-full object-cover cursor-pointer`}
        src={image}
        width={500}
        height={200}
        alt={title || ""}
        onClick={() => {
          setIsOpen(false);
          setTimeout(() => {
            setIsOpen(true);
          }, 150);
        }}
      />
    </>
  );
}
