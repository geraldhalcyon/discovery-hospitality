import Link from "next/link";

export default function PressRelease({ block }) {
  const { releases } = block.main;
  return (
    <section className="bg-[#f1f1f1] sm:pb-[30px]">
      <div className="container py-5 md:py-0">
        <div className="flex flex-col w-full bg-white p-[30px] rounded-md shadow-md">
          {releases.map((item, index) => {
            return (
              <div key={index}>
                <span className="text-[20px] text-[#343a40]">{item.title}</span>
                <div className="flex flex-col w-auto pt-3">
                  {item.pdf_file.map((pdf, index) => (
                    <Link
                      key={index}
                      href={pdf.file || []}
                      target="_blank"
                      className="flex flex-col text-primary pb-3 text-[14px]"
                    >
                      {pdf.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
