import Image from "next/image";

export default function Awards({ block }) {
  const { title, images } = block.main;
  return (
    <section className="flex bg-[#f1f1f1] pt-[20px]">
      <div className="container mb-[30px]">
        <h2 className="text-[20px] text-primary text-center tracking-[1px] border-b-[1px] border-[#ccc] pb-[10px] mb-[20px]">
          {title}
        </h2>
        <div className="flex justify-center flex-wrap">
          {images?.map((item, index) => (
            <div key={index} className="m-[15px]">
              <Image
                alt={title || "#"}
                src={item}
                width={140}
                height={139}
                className="w-full min-h-[100px] max-h-[139px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
