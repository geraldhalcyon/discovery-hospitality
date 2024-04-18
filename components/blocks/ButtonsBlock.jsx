import Link from "next/link";
export default function ButtonsBlock({ block }) {
  return (
    <section className={`${!block?.main.bg_white ? "#75D3CF" : ""}`}>
      <div className="container">
        <div
          className={`flex flex-wrap justify-center pt-[30px] pb-[15px] mx-[-5px]`}
        >
          {block?.main?.buttons?.map((item, index) => (
            <div
              key={index}
              className="item w-full sm:w-auto flex flex-wrap px-[5px] mb-[15px]"
            >
              <Link
                className={`uppercase inline-block w-full sm:w-auto h-full text-[14px] text-center px-[30px] py-[15px] min-w-[130px] transition ${
                  item.variant === "filled"
                    ? "bg-primary text-white hover:bg-secondary hover:text-white"
                    : "border border-secondary text-secondary hover:bg-secondary hover:text-white"
                }`}
                href={item?.button_link || item?.file || "#"}
                target={
                  item?.button_link?.includes("http") ||
                  item?.file?.includes("http")
                    ? "_blank"
                    : "_self" || ""
                }
              >
                {item.button_label || "Discover More"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
