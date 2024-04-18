import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Jsona from "jsona";
import { getMediaConvertions } from "@/lib/services/propService";
import CONTENTAPI from "@/lib/api/content/request";
const MICROSITE = process.env.NEXT_PUBLIC_MICROSITE_ID || "";

const dataFormatter = new Jsona();

export default function Dining({ block, page }) {
  const { title } = block.main;
  const [loading, setLoading] = useState(true);
  const [dining, setDining] = useState([]);

  const COLLECTION_ID = "dining";

  useEffect(() => {
    const getDining = async () => {
      try {
        const response = await CONTENTAPI.getContents(
          COLLECTION_ID,
          `?&includes=blueprintData,mediaHandler&filter[taxonomies]`
        );
        setDining(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    getDining();
  }, []);

  return (
    <>
      <section className="bg-[#F1F1F1] pb-[30px]">
        <div className="container overflow-hidden">
          {title && (
            <h2
              className={`text-primary text-[25px] tracking-[1px] text-center uppercase py-[30px] border-b-[1px] border-[#ccc] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              }`}
            >
              {title}
            </h2>
          )}
          <div className="flex flex-wrap justify-center mx-[-15px] py-[30px]">
            {dining?.map((item, index) => {
              const mediaHandler = getMediaConvertions(
                item?.attributes?.blueprintData
              );

              return (
                <div
                  key={index}
                  className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
                >
                  <div className="w-full bg-white p-[20px] z-10">
                    <h3 className="text-primary text-[20px] truncate mb-[10px]">
                      {item?.attributes?.title
                        ?.split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </h3>
                  </div>
                  <div className="relative flex flex-col items-center justify-end mb-[30px]">
                    <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span>
                    <Image
                      src={
                        mediaHandler?.[`main.image`]?.[0]?.conversions
                          ?.desktop ||
                        mediaHandler?.[`main.image`]?.[0]?.original
                      }
                      className="w-full min-h-[300px] object-cover"
                      width={500}
                      height={200}
                      alt={item.attributes.title}
                    />
                    {item?.attributes?.route_url && (
                      <Link
                        href={item?.attributes?.route_url}
                        className="absolute bottom-[28px] bg-primary border-[1px] border-primary text-white hover:bg-secondary hover:border-secondary transition uppercase px-[30px] py-[20px] z-20"
                      >
                        Read More
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
