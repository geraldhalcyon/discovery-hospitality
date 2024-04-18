import Link from "next/link";
import styles from "@/styles/ButtonsRepeater.module.css";
export default function ButtonsRepeater({ ...props }) {
  const { buttons, className } = props;
  return (
    <div
      className={`${styles.buttonRepeater || ""} ${
        className || ""
      } flex flex-wrap justify-center`}
    >
      {buttons?.map((item, index) => (
        <div
          key={index}
          className="item w-full flex flex-col justify-center px-[40px] md:max-w-[33.33%]"
        >
          {item?.description && (
            <div
              className="text-center text-[14px]"
              dangerouslySetInnerHTML={{ __html: item?.description }}
            />
          )}

          <div className="text-center mt-[15px]">
            <Link
              className={`uppercase inline-block text-[14px] text-center px-[30px] py-[15px] min-w-[130px] transition ${
                item.variant === "filled"
                  ? "bg-primary text-white hover:bg-secondary hover:text-white"
                  : "border border-secondary text-secondary hover:bg-secondary hover:text-white"
              }`}
              href={item?.button_link || item?.file}
              target={
                item?.button_link?.includes("http") ||
                item?.file?.includes("http")
                  ? "_blank"
                  : "_self"
              }
            >
              {item.button_label || "Discover More"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
