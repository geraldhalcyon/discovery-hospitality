import Image from "next/image";
import Link from "next/link";
export default function RoomsSuiteBlock({ block }) {
  return (
    <section>
      {block?.main?.collection?.contents ? (
        <div className="flex flex-wrap">
          {block?.main?.collection?.contents.map((item, index) => (
            <div
              key={index}
              className="w-full md:max-w-[50%] min-h-[400px] relative text-white flex items-center justify-center"
            >
              <Image
                src={
                  item?.mediaHandler["main.image"][0]?.conversions?.laptop ||
                  item?.mediaHandler["main.image"][0]?.original
                }
                width={500}
                height={400}
                alt={item?.title}
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
              />
              <span className="bg-[#000] opacity-[.25] absolute top-0 left-0 w-full h-full"></span>
              <div className="relative z-[2] text-center">
                <h2 className="font-bold text-[20px]">{item?.title}</h2>
                <div className="mt-[20px] ">
                  <Link
                    className="uppercase bg-primary hover:bg-primary1 py-[20px] px-[30px] inline-block"
                    href={item?.route_url}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container">No data found</div>
      )}
    </section>
  );
}
