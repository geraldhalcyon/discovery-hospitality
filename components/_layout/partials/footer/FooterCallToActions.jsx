import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Image from "next/image";
import { useRouter } from "next/router";
export default function CallToActions() {
  const router = useRouter();
  const { block_title, items } = globalData.tenantDetails.data.call_to_actions;
  return (
    <>
      {router.asPath !== "/" && (
        <section className="text-primary py-[30px] border-y-[3px] border-primary">
          <div className="container">
            <h2
              className={`tracking-[1px] text-primary text-[22px] mb-[30px] mb-[15px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              }`}
            >
              {`${block_title} at ${globalData.tenantDetails.name}?` ||
                "Why Book Direct?"}
            </h2>
            {items && (
              <div className="flex flex-wrap">
                {items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex mb-[15px] md:max-w-[50%] lg:max-w-[33.33%] w-full items-center"
                  >
                    <span className="mr-[15px] min-w-[60px] min-h-[60px] w-[60px] h-[60px] p-[5px] rounded-full flex items-center justify-center bg-primary ">
                      <Image
                        src={item?.icon}
                        width={40}
                        height={40}
                        alt={item?.title}
                        className="!invert-[100%] !brightness-[100%] !contrast-[100%]"
                      />
                    </span>
                    <div>
                      <h3
                        className={`font-medium ${
                          process.env.NEXT_PUBLIC_TEMPLATE == 1
                            ? "font-tenor"
                            : "font-domine"
                        }`}
                      >
                        {item?.title}
                      </h3>
                      {item?.description && (
                        <div className="text-[14px]">{item?.description}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
