import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
export default function PromosBlock({ block }) {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category, title } = block.main;

  useEffect(() => {
    const getOffers = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_TENANT_API +
            `/api/contents/offers/entries?page[size]=3&includes=blueprintData,mediaHandler&filter[taxonomies][offers-category]=${category.id}`
        );
        setOffers(res.data.data);
        if (res.status === 200) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error", error);
        setIsLoading(false);
      }
    };
    getOffers();
  }, [category.id]);
  return (
    <section className="bg-[#F1F1F1] py-[20px]">
      <div className="container">
        <h2 className="text-center uppercase text-[25px] text-primary mb-[20px]">
          {title}
        </h2>

        {isLoading ? (
          <>
            {Array.from({ length: 2 }, (_, index) => (
              <div key={index} className="mb-[30px] flex">
                <div className="h-[300px] max-w-[50%] w-full bg-gray-300 animate-pulse "></div>
                <div className="bg-white p-[30px] max-w-[60%] w-full relative">
                  <div className="h-[15px] bg-gray-300 animate-pulse mb-[50px] max-w-[200px]"></div>
                  <div className="h-[50px] bg-gray-300 animate-pulse w-full max-w-[calc(200px-30px)] absolute bottom-0 right-0"></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {offers.length > 0 ? (
              <>
                {offers.map((item, index) => (
                  <div key={index} className="mb-[30px] flex">
                    <div className="w-full max-w-[50%]">
                      <Link href={`/offers?category=${category.id}`}>
                        <Image
                          src={item?.attributes?.data?.main?.featured_image}
                          width={400}
                          height={200}
                          className="h-full object-cover w-full"
                          alt={item?.attributes?.title}
                        />
                      </Link>
                    </div>
                    <div className="bg-white pt-[30px] px-[30px] pb-[60px] relative max-w-[60%] w-full">
                      <h3 className="text-[20px] text-primary mb-[10px]">
                        {item?.attributes?.title}
                      </h3>
                      {item?.attributes?.data?.main?.description && (
                        <div
                          className="text-[14px] mb-[30px]"
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.attributes?.data?.main?.description?.match(
                                /<p>(.*?)<\/p>/
                              )?.[1],
                          }}
                        />
                      )}
                      <Link
                        href={item?.attributes?.route_url}
                        className="text-white bg-primary hover:bg-secondary3 px-[30px] py-[15px] absolute bottom-0 right-0 text-[14px]"
                      >
                        View Offer
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>No offers to show</>
            )}
          </>
        )}

        <div className="text-center mt-[30px]">
          <Link
            href={`/offers?category=${category.id}`}
            className="text-white inline-block uppercase bg-primary hover:bg-secondary3 px-[30px] py-[15px]"
          >
            {`View All ${title.toLowerCase().replace("promos", "Offers")}`}
          </Link>
        </div>
      </div>
    </section>
  );
}
