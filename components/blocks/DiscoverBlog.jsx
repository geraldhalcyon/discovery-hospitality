import Link from "next/link";
import Image from "next/image";
// import discoverBlogEntriesData from "@/lib/preBuildScripts/static/discoverBlog.json";
import "slick-carousel/slick/slick.css";
import dynamic from "next/dynamic";
import discoverBlogEntriesData from "@/lib/preBuildScripts/static/discover-blog-entries.json";
export default function DiscoverBlog({ block }) {
  const Slick = dynamic(() =>
    import("react-slick").then((module) => module.default)
  );

  const { title, description, link } = block.main;
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
    <section className="overflow-hidden py-[5px]">
      <div className="flex flex-wrap mx-[-3px] relative">
        <div className="px-[3px] w-full md:max-w-[50%]">
          <div className="flex justify-between items-start md:items-end h-full relative bg-[#f1f1f1] min-h-[350px] p-[15px]">
            <div className="absolute top-0 object-fit object-top opacity-[.2] sm:opacity-[1] md:opacity-[.3] xl:opacity-[1] sm:relative w-full md:max-w-[120px] xl:max-w-[unset]">
              <Image
                src={`/static/ph_map.png`}
                width={300}
                height={300}
                alt="Discover"
              />
            </div>
            <div className="relative md:absolute w-full top-0 right-0 max-w-[100%] sm:max-w-[70%] md:max-w-[100%] lg:max-w-[70%] xl:max-w-[50%] flex flex-col py-[30px] px-[30px] w-full">
              <h2
                className={`text-primary text-[25px] ${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? "font-tenor"
                    : "font-domine"
                }`}
              >
                {title}
              </h2>
              {description && (
                <div
                  className="py-[30px] text-[14px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
              {link && (
                <div>
                  <Link
                    href={link}
                    target={
                      link ? (link?.includes("http") ? "_blank" : "_self") : ""
                    }
                    className="inline-block text-center text-[14px] md:text-[16px] text-primary md:min-w-[200px] border border-primary py-[10px] px-[15px] md:py-[15px] md:px-[30px] transition hover:text-white hover:bg-primary"
                  >
                    Explore Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex relative flex-col px-[3px] md:max-w-[50%]">
          {blogEntries && blogEntries.length > 0 && (
            <>
              <Slick className="grow slide-fill" {...settings}>
                {blogEntries.map((item, index) => {
                  const { featured_image, description, title } = item.data.main;
                  return (
                    <div key={index} className="relative">
                      <Link href={item.route_url}>
                        <Image
                          src={featured_image}
                          width={500}
                          height={300}
                          alt={item.title}
                          className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
                        />
                        <span className="absolute top-0 left-0 w-full h-full bg-[#000] opacity-[.5] z-[1]"></span>
                        <div className="max-w-[440px] mx-auto px-[50px] font-tenor text-center text-[20px] md:text-[25px] min-h-[150px] relative lg:min-h-[100%]  z-[2] relative flex justify-center items-center text-white">
                          <h3>{item.title}</h3>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </Slick>
            </>
          )}
          <div className="flex justify-center items-center flex-wrap 2sm:flex-nowrap 2sm:justify-between items-center px-[30px] py-[15px] bg-secondary text-white">
            <span className="w-full font-tenor 2sm:w-auto text-[20px] block text-center mb-[20px] 2sm:mb-0 pr-[15px] md:text-[25px]">
              Discovery Blog
            </span>
            <Link
              href="/blog"
              className="inline-block text-[14px] tracking-[1px] uppercase border border-[#fff] py-[15px] px-[30px] transition hover:text-primary hover:bg-white"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
