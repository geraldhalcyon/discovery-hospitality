import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import discoverBlogEntriesData from "@/lib/preBuildScripts/static/discover-blog-entries.json";
import reviewItems from "../../lib/preBuildScripts/static/reviews.json";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import SectionAccordion from "../partials/collapsibles/SectionAccordion";
export default function BlogReviews({ block }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const Star = dynamic(() =>
    import("../icons/Star").then((module) => module.default)
  );
  const blogEntries = discoverBlogEntriesData.discoverBlogEntriesData;
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] md:top-[calc(50%)] translate-y-[-50%] right-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="54"
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
    );
  };
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[50%] md:top-[calc(50%)] translate-y-[-50%] left-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          className="!fill-white"
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
          />
        </svg>
      </div>
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  var settingsImages = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrows: false,
  };
  return (
    <section className="flex flex-wrap mb-[5px]">
      <SectionAccordion
        className="flex flex-col lg:max-w-[50%] w-full pr-[5px]"
        title="Discovery Blog"
        childrenClassname="h-full"
      >
        <div className="bg-primary1 h-full">
          {blogEntries && blogEntries.length > 0 && (
            <>
              <Slider
                asNavFor={nav2}
                ref={(slider) => (sliderRef1 = slider)}
                className="grow slide-fill"
                {...settingsImages}
              >
                {blogEntries.map((item, index) => {
                  const { featured_image, description, title } = item.data.main;
                  return (
                    <div key={index} className="relative">
                      <Image
                        src={featured_image}
                        width={900}
                        height={500}
                        alt="Title"
                        className="h-[220px] object-cover w-full"
                      />
                    </div>
                  );
                })}
              </Slider>
            </>
          )}
          <div className="py-[20px]">
            <h2
              className={`hidden md:block pb-[20px] text-[25px] pb-[20px] px-[60px] text-white ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              }`}
            >
              Discovery Blog
            </h2>
            {blogEntries && blogEntries.length > 0 && (
              <>
                <Slider
                  asNavFor={nav1}
                  ref={(slider) => (sliderRef2 = slider)}
                  className="grow slide-fill"
                  {...settings}
                >
                  {blogEntries.map((item, index) => {
                    const { featured_image, description, title } =
                      item.data.main;
                    return (
                      <div
                        key={index}
                        className="relative flex flex-col px-[60px] "
                      >
                        <Link href={item.route_url} className="">
                          <div className="mx-auto font-bold text-[20px] md:text-[25px] min-h-[150px] relative lg:min-h-[100%]  z-[2] relative text-white">
                            <h3>{item.title}</h3>
                          </div>
                        </Link>
                        <Link
                          href={item.route_url}
                          className="mt-[15px] uppercase inline-block text-center  min-w-[200px] border py-[15px] px-[30px] transition hover:text-primary  hover:bg-white text-white border-white"
                        >
                          Explore More
                        </Link>
                      </div>
                    );
                  })}
                </Slider>
              </>
            )}
          </div>
        </div>
      </SectionAccordion>
      <SectionAccordion className="lg:max-w-[50%] w-full" title="Reviews">
        <div className="bg-primary1">
          <Image
            src={block?.main?.reviews_image}
            width={900}
            height={500}
            alt="Reviews"
            className="h-[220px] object-cover w-full"
          />
          {reviewItems && reviewItems.length > 0 && (
            <div className="py-[20px] text-white grow">
              <h2
                className={`hidden md:block px-[60px] text-[25px] pb-[20px] text-white ${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? "font-tenor"
                    : "font-domine"
                }`}
              >
                Reviews
              </h2>

              <Slick className="" {...settings}>
                {reviewItems.map((item, index) => (
                  <div className="px-[60px] " key={index}>
                    {item?.data?.main?.description && (
                      <div
                        className="text-[14px]"
                        dangerouslySetInnerHTML={{
                          __html: item?.data?.main?.description,
                        }}
                      />
                    )}

                    <div className="flex flex-wrap mt-[30px]">
                      {item.data.main.name && (
                        <span>{item?.data?.main?.name},</span>
                      )}
                      {item?.data?.main?.link && (
                        <span>
                          <Link
                            className="underline text-white ml-[5px]"
                            href={item?.data?.main?.link || "#"}
                          >
                            {item?.data?.main?.link_label || "View Review"}
                          </Link>
                        </span>
                      )}
                    </div>
                    {item?.data?.main?.stars && (
                      <div className="flex mt-[15px]">
                        {Array.from(
                          { length: parseInt(item?.data?.main?.stars) },
                          (_, index) => (
                            <Star
                              width={20}
                              height={20}
                              key={index}
                              color="#fff"
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </Slick>
            </div>
          )}
        </div>
      </SectionAccordion>
    </section>
  );
}
