export default function Title({ block }) {
  const { remove_underline, title } = block.main;
  return (
    <section className="bg-[#f1f1f1] pt-[10px] sm:py-[30px]">
      <div className="container">
        <h3
          className={`${
            !remove_underline ? "border-b border-[#ccc] pb-[30px]" : ""
          }  w-full flex text-center justify-center pt-[10px] text-[25px] text-primary ${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          }`}
        >
          {title}
        </h3>
      </div>
    </section>
  );
}
