import reviewsData from "../../../../lib/preBuildScripts/static/reviews.json";
import "slick-carousel/slick/slick.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
export default function FooterReviews() {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );
  const Star = dynamic(() =>
    import("@/components/icons/Star").then((module) => module.default)
  );

  const router = useRouter();
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${
          className.includes("slick-disabled") ? "opacity-[.5]" : ""
        } hover:opacity-[.5] absolute top-[50%] translate-y-[-50%] right-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg width="40" height="40" x="0" y="0" viewBox="0 0 490 490">
          <g>
            <path
              d="m96.536 490 306.483-245.004L96.536 0l-9.555 11.962 291.515 233.034L86.981 478.038z"
              fill="#333"
            ></path>
          </g>
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
        } hover:opacity-[.5] absolute top-[50%] translate-y-[-50%] left-[15px] z-[20] cursor-pointer`}
        onClick={onClick}
      >
        <svg version="1.1" width="40" height="40" viewBox="0 0 490 490">
          <g>
            <path
              d="M401.166 478.097 113.178 245.004 401.166 11.903 391.536 0 88.834 245.004 391.536 490z"
              fill="#333"
              opacity="1"
            ></path>
          </g>
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
    arrows: true,
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
    <>
      {router.asPath !== "/" && (
        <section className="pt-[40px] footer-reviews">
          <div className="container">
            <h2
              className={`text-center text-primary text-[25px] mb-[30px] tracking-[1px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              }`}
            >
              Reviews
            </h2>
            {reviewsData && (
              <>
                <Slick className="lg:px-[70px] text-[14px]" {...settings}>
                  {reviewsData.map((item, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-[14px] uppercase">
                        {item.title}
                      </h3>

                      {item.data.main.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.data.main.description,
                          }}
                        />
                      )}

                      <div className="flex flex-wrap mt-[30px]">
                        {item.data.main.name && (
                          <span>{item.data.main.name},</span>
                        )}
                        {item.data.main.link && (
                          <span>
                            <Link
                              className="text-primary ml-[5px]"
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
                                color="#e6b886"
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </Slick>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
