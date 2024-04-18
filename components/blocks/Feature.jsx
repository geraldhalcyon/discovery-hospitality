import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function Feature({ block }) {
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  const { description, link, position, title, video_link, image } = block.main;
  let videoUrl;

  if (video_link) {
    let videoId = video_link.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  return (
    <SectionAccordion title={title} childrenClassname="pb-0">
      <section className="flex flex-wrap md:mb-[5px]">
        <div className="w-full flex items-center justify-center md:max-w-[50%] bg-secondary1">
          {video_link || image ? (
            <>
              {!video_link && image && (
                <Image
                  src={image}
                  height={500}
                  width={900}
                  className="w-full h-full object-cover"
                  alt={title}
                />
              )}
              {video_link && !image && (
                <div className="relative h-full w-full pb-[75%]">
                  <iframe
                    src={videoUrl}
                    width={900}
                    height={500}
                    loading="lazy"
                    className="w-full absolute h-full top-0 left-0 object-cover"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-primary1 text-[25px] p-[15px]">
              No data to show.
            </div>
          )}
        </div>
        <div
          className={`${
            process.env.NEXT_PUBLIC_TEMPLATE == 2 && video_link && !image
              ? "bg-[#85764D]"
              : "bg-primary"
          } py-[20px] lg:py-[30px] flex flex-col justify-center px-[20px] md:px-[30px] lg:px-[60px] w-full md:max-w-[50%] md:min-h-[400px] lg:min-h-[800px]`}
        >
          <h2
            className={`${
              process.env.NEXT_PUBLIC_TEMPLATE == 1
                ? "text-[#c5baa6]"
                : "text-white"
            } text-[20px] mb-[10px] tracking-[2px]`}
          >
            {title}
          </h2>

          <div
            className={`${
              process.env.NEXT_PUBLIC_TEMPLATE == 1
                ? "bg-secondary1"
                : "bg-white"
            } w-[75px] mt-[5px] h-[2px]  mb-[20px]`}
          />
          <div
            className={`${
              process.env.NEXT_PUBLIC_TEMPLATE == 1
                ? "text-[#d4bebe]"
                : "text-white"
            } text-[14px] mb-[30px] leading-[21px]`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div>
            <Link
              className={`uppercase inline-block text-center  min-w-[200px] border py-[15px] px-[30px] transition hover:text-primary  ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "hover:bg-[#d4bebe] text-[#d4bebe] border-[#d4bebe]"
                  : "hover:bg-white text-white border-white"
              }`}
              href={link}
              target={link.includes("http") ? "_blank" : "_self"}
            >
              Discover More
            </Link>
          </div>
        </div>
      </section>
    </SectionAccordion>
  );
}
