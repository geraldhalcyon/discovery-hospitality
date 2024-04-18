import Image from "next/image";
import Link from "next/link";
export default function DiningBlock({ block }) {
  return (
    <section className="bg-[#F1F1F1]">
      <div className="container">
        <div className="flex flex-wrap justify-center mx-[-15px] py-[30px]">
          {block?.main?.collection?.contents?.map((item, index) => (
            <div
              key={index}
              className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
            >
              <div className="w-full bg-white p-[20px] z-10">
                <h3 className="text-primary text-[20px] truncate mb-[10px]">
                  {item?.title
                    ?.split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </h3>
              </div>
              <div className="relative flex flex-col items-center justify-end mb-[30px]">
                <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span>

                <Image
                  src={
                    item?.mediaHandler?.[`main.image`]?.[0]?.conversions
                      ?.desktop ||
                    item?.mediaHandler?.[`main.image`]?.[0]?.original
                  }
                  className="w-full min-h-[300px] object-cover"
                  width={500}
                  height={200}
                  alt={item?.title}
                />
                <Link
                  href={item?.route_url}
                  className="absolute bottom-[28px] bg-primary border-[1px] border-primary text-white hover:bg-secondary hover:border-secondary transition uppercase px-[30px] py-[20px] z-20"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
