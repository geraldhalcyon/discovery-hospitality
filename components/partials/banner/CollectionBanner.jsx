import Image from "next/image";
export default function CollectionBanner({ ...props }) {
  const {
    title,
    image_desktop,
    image_laptop,
    image_mobile,
    image_original,
    className,
  } = props;
  return (
    <div
      className={`${
        className ? "" : ""
      } relative min-h-[calc(100vh-61px)] text-white flex items-center justify-center`}
    >
      <Image
        alt={title}
        src={
          image_desktop || image_original || "../images/image_makati-large.jpg"
        }
        width={1920}
        height={1080}
        className="w-full h-full  object-cover absolute top-0 left-0"
      />
      <span className="bg-[#000] bg-opacity-[.3] absolute top-0 left-0 w-full h-full"></span>
      {title && <div className="relative text-[42px]">{title}</div>}
    </div>
  );
}
