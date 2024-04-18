import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export default function HeroGridRepeater({ block, mediaHandler }) {
  const { items } = block.main;
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  return (
    <section className="overflow-hidden md:mb-[5px]">
      <div className="mx-[-3px] flex flex-wrap ">
        {items.map((item, index) => (
          <SectionAccordion
            childrenClassname="pb-0 h-full bg-primary1"
            key={index}
            title={item.title}
            className="flex flex-col md:max-w-[33.33%] w-full px-[3px]"
          >
            <Image
              src={
                mediaHandler?.[`main.items.${index}.image`]?.[0]?.conversions
                  .desktop ||
                mediaHandler?.[`main.items.${index}.image`]?.[0]?.original
              }
              width={500}
              height={500}
              alt={item.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="px-[20px] lg:px-[60px] flex flex-col grow py-[30px] text-white">
              <h2
                className={`${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? "font-tenor"
                    : "font-domine"
                } text-center mb-[30px] text-[18px] sm:text-[20px] lg:text-[25px]`}
              >
                {item.title}
              </h2>
              {item.description && (
                <div
                  className="text-[14px] mb-[30px] grow line-clamp-3 leading-[21px]"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
              <div className="text-center">
                <Link
                  className="uppercase inline-block border border-[#fff] py-[15px] px-[30px] transition hover:text-primary1 hover:bg-white"
                  href={item.link}
                  target={item.link.includes("http:") ? "_blank" : "_self"}
                >
                  Discover More
                </Link>
              </div>
            </div>
          </SectionAccordion>
        ))}
      </div>
    </section>
  );
}
