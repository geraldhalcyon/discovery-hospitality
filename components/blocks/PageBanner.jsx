import Image from "next/image";

export default function Block({ page, block, mediaHandler }) {
  const { title } = block.main;
  return (
    <div className="page-banner relative flex items-center justify-center w-full bg-[#f1f1f1]">
      <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span>
      <Image
        alt={title || "#"}
        src={
          mediaHandler["main.image"]?.[0].conversions.desktop ||
          mediaHandler["main.image"]?.[0].original
        }
        width={1920}
        height={1080}
        className="w-full object-cover absolute top-0 left-0 h-full"
      />
      <div className="w-full flex relative items-center justify-center h-[560px]">
        <span className="absolute top-0 left-0 w-full h-full bg-black opacity-[.2]"></span>
        <div
          className={`text-[42px] text-white relative z-[20] tracking-[1px] ${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          } ${title ? "" : "hidden"}`}
        >
          {title || page.name}
        </div>
      </div>
    </div>
  );
}
