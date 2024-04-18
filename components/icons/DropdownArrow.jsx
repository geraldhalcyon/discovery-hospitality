export default function DropdownArrow({ item, ...props }) {
  const { width, className, height } = props;
  return (
    <>
      {item?.children && item?.children.length > 0 && (
        <span
          className={`${className} z-[1] w-[5px] h-[5px] block ml-[5px] border-t-0 border-r-[1px] border-b-[1px] border-l-[0] rotate-[45deg] 
          ${
            item.label.toLowerCase() === "reservations" &&
            process.env.NEXT_PUBLIC_TEMPLATE == 1
              ? "border-white"
              : "border-primary"
          }`}
        ></span>
      )}
    </>
  );
}
