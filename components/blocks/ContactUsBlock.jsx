import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "@/styles/address.module.css";
export default function ContactUsBlock({ block }) {
  const ContactForm = dynamic(() =>
    import("@/components/partials/forms/ContactForm").then(
      (module) => module.default
    )
  );
  const { description, offices, form } = block.main;
  return (
    <section className="bg-[#F1F1F1] py-[10px]">
      <div className="container">
        <div className="flex flex-wrap mx-[-15px]">
          <div className="w-full mb-[15px] md:mb-0 md:max-w-[50%] px-[15px]">
            <div className="bg-white shadow-md p-[30px] sticky top-[85px]">
              {description && (
                <div
                  className="text-[14px] mb-[20px]"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
              <ContactForm form={form} />
            </div>
          </div>

          <div className="w-full md:max-w-[50%] px-[15px]">
            {offices && offices.length > 0 && (
              <div className="offices">
                {offices.map((item, index) => (
                  <div key={index} className="mb-[15px]">
                    {item?.map && (
                      <iframe
                        className="w-full mb-[15px] "
                        src={item?.map}
                        width={500}
                        height={200}
                      />
                    )}
                    <div className="bg-white text-[14px] shadow-md py-[15px] px-[30px]">
                      <h2 className="text-primary text-[18px] mb-[15px]">
                        {item?.title}
                      </h2>
                      {item?.body && (
                        <div
                          className={`${styles.body}`}
                          dangerouslySetInnerHTML={{
                            __html: item?.body,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
