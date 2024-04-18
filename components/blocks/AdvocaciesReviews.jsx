import Link from "next/link";
import reviewItems from "../../lib/preBuildScripts/static/reviews.json";
import "slick-carousel/slick/slick.css";
import Image from "next/image";
import dynamic from "next/dynamic";

export default function AdvocaciesReviews({ block }) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const Star = dynamic(() =>
    import("../icons/Star").then((module) => module.default)
  );

  const { image_advocacy, image_reviews, title, description, link } =
    block.main;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } absolute top-[calc(50%-20px)] translate-y-[-50%] right-[-40px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg
          className="!fill-white"
          width={25}
          height={54}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27 44"
        >
          <path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" />
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
        } absolute top-[calc(50%-20px)] translate-y-[-50%] left-[-40px] z-[20] cursor-pointer`}
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
    infinite: true,
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
  return (
    <section className="overflow-hidden">
      <div className="flex flex-wrap mx-[-3px]">
        <div className="px-[3px] w-full md:max-w-[50%]">
          <div className="bg-primary1 h-full">
            <Image
              src={image_advocacy || `/images/image_makati-large.jpg`}
              width={900}
              height={500}
              alt={title || "Thumbnail"}
              className="w-full h-[250px] md:h-[575px] object-cover"
            />
            <div className="px-[20px] md:px-[50px] lg:px-[60px] flex flex-col grow py-[30px] text-white">
              <h2
                className={`mb-[30px] text-[25px] ${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? "font-tenor"
                    : "font-domine"
                }`}
              >
                {title}
              </h2>
              <div
                className="grow"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div className="mt-[30px]">
                <Link
                  className="inline-block text-center border border-[#fff] min-w-[170px] py-[15px] px-[30px] transition hover:text-primary hover:bg-white"
                  href={link}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[3px] flex flex-col w-full md:max-w-[50%]">
          <Image
            src={image_reviews || `/images/image_makati-large.jpg`}
            width={900}
            height={500}
            alt={title || "Thumbnail"}
            className="w-full h-[250px] md:h-[575px] object-cover"
          />
          {reviewItems && reviewItems.length > 0 && (
            <div className="bg-primary1 px-[50px] lg:px-[60px] py-[30px] text-white grow">
              <h2
                className={`mb-[30px] text-[25px] ${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? "font-tenor"
                    : "font-domine"
                }`}
              >
                Reviews
              </h2>

              <Slick className="" {...settings}>
                {reviewItems.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-[14px] uppercase">
                      {item.title}
                    </h3>

                    {item.data.main.description && (
                      <div
                        className="text-[14px]"
                        dangerouslySetInnerHTML={{
                          __html: item.data.main.description,
                        }}
                      />
                    )}

                    <div className="flex fpex-wrap mt-[30px]">
                      {item.data.main.name && (
                        <span>{item.data.main.name},</span>
                      )}
                      {item.data.main.link && (
                        <span>
                          <Link
                            className="text-white ml-[5px]"
                            href={item.data.main.link}
                          >
                            {item.data.main.link_label || "View Review"}
                          </Link>
                        </span>
                      )}
                    </div>
                    {item.data.main.stars && (
                      <div className="flex mt-[30px]">
                        {Array.from(
                          { length: parseInt(item.data.main.stars) },
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
      </div>
    </section>
  );
}
