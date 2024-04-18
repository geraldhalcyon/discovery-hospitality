import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import destinationsEntries from "@/lib/preBuildScripts/static/exciting-destinations.json";
export default function FooterDestinations({}) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className?.includes("slick-disabled") ? "opacity-[.5]" : ""
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
          className?.includes("slick-disabled") ? "opacity-[.5]" : ""
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
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: destinationsEntries.length > 6 ? true : false,
    responsive: [
      {
        breakpoint: 1199,
        arrows: true,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 991,
        arrows: true,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      {destinationsEntries && (
        <SectionAccordion
          title="Exciting Destinations"
          childrenClassname="pb-0"
        >
          <section className="footer-strip text-white md:pt-[30px]">
            <h2
              className={`text-center hidden md:block text-primary text-[25px] mb-[30px] tracking-[1px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              }`}
            >
              {"Exciting Destinations"}
            </h2>
            <Slick {...settings}>
              {destinationsEntries?.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item?.data?.main?.link || "#"}
                    className="flex justify-center bg-[#333] items-center min-h-[208px] relative"
                    target="_blank"
                  >
                    <Image
                      src={
                        item?.data?.main?.image || `/static/destination1.jpg`
                      }
                      width={350}
                      height={350}
                      alt={item?.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <h3 className="relative uppercase font-bold leading-[2px] text-[18px]">
                      {item?.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </Slick>
          </section>
        </SectionAccordion>
      )}
    </>
  );
}
