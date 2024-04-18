export default function Introduction({ block }) {
  const { description, title } = block.main;
  return (
    <>
      <section className="w-full flex justify-center bg-[#691a31] pt-[40px] pb-[80px]">
        <div className="w-full max-w-[957px] ">
          {title && (
            <div className="flex flex-col items-center w-full">
              <div
                className={`${
                  process.env.NEXT_PUBLIC_TEMPLATE == 1
                    ? "font-tenor"
                    : "font-domine"
                } flex w-full border-b border-[#c5baa6] leading-[30px] tracking-[2px] mb-[30px] justify-center text-[#c5baa6] text-[20px] pb-[30px] mb-[30px] text-center px-5 2xl:px-0`}
              >
                {title}
              </div>
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-[#d4bebe] text-[14px] leading-[25px] text-center max-w-[957px]"
          />
        </div>
      </section>
    </>
  );
}
