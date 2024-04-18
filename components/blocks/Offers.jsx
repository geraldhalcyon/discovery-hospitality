import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import offersCategoryTaxonomies from "@/lib/preBuildScripts/static/offers-category.json";
import dynamic from "next/dynamic";
export default function Block({ block }) {
  const CustomSelect = dynamic(() =>
    import("@/components/forms/CustomSelect").then((module) => module.default)
  );

  const { title, description } = block.main;
  const offersCategories = offersCategoryTaxonomies;

  const [selectedCategory, setSelectedCategory] = useState({
    label: "All",
    value: "",
  });
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory({
      label: selectedOption.label,
      value: selectedOption.value,
    });

    router.push(`/${router?.query?.id}?category=${selectedOption.value}`);
  };

  useEffect(() => {
    const getOffers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_TENANT_API +
            `/api/contents/offers/entries?page[number]=${currentPage}&includes=blueprintData,mediaHandler&filter[taxonomies][offers-category]=${selectedCategory.value}&filter[sites.id]=${process.env.NEXT_PUBLIC_MICROSITE_ID}`
        );
        setOffers(response.data);
        if (response.status === 200) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    getOffers();
  }, [selectedCategory, currentPage]);

  const getDefaultValue = () => {
    return { label: selectedCategory.label, value: selectedCategory.value };
  };

  return (
    <section className="bg-[#F1F1F1] pb-[30px]">
      <div className="container">
        <div className="pb-[20px] md:pb-[40px]">
          <h2
            className={`${
              process.env.NEXT_PUBLIC_TEMPLATE == 1
                ? "font-tenor"
                : "font-domine"
            } text-primary text-[25px] tracking-[1px] text-center uppercase py-[30px] mb-[30px]`}
          >
            {title}
          </h2>
          <div className="text-[#555] text-[14px] text-center leading-[21px] tracking-[1px] pb-[10px] mb-[10px]">
            Select Category:
          </div>
          <CustomSelect
            // value={selectedCategory}
            isSearchable={false}
            className="react-select z-30"
            defaultValue={getDefaultValue()}
            onChange={handleCategoryChange}
            options={offersCategories?.taxonomyTerms.map((item, index) => ({
              label: item?.name,
              value: item?.id,
            }))}
          />
        </div>
        <hr className="border-t border-0 border-[#ccc] my-[20px]" />
        <div
          className="text-center pb-[10px] mb-[20px] text-[14px]"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        <div className="offers">
          {loading ? (
            <div className="flex flex-wrap">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
                >
                  <div className="h-6 max-w-[50%] bg-gray-300 animate-pulse mb-[15px]"></div>
                  <div className="min-h-[300px] bg-gray-300 animate-pulse mb-[30px]"></div>

                  <div className="h-[15px] bg-gray-300 animate-pulse mb-[10px]"></div>
                  <div className="h-[15px] bg-gray-300 animate-pulse mb-[10px]"></div>
                  <div className="h-[15px] bg-gray-300 animate-pulse mb-[30px]"></div>

                  <div className="h-[15px] bg-gray-300 animate-pulse max-w-[250px]"></div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {offers && offers.data.length > 0 ? (
                <div className="flex flex-wrap mx-[-15px] py-[30px]">
                  {offers.data.map((item, index) => {
                    const date = new Date(item?.attributes?.published_at);
                    const options = {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    };
                    const post_date = date.toLocaleDateString("en-US", options);

                    return (
                      <div
                        key={index}
                        className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
                      >
                        {item?.attributes?.data?.main?.members_badge !==
                        null ? (
                          <div className="absolute top-[-20px] right-[30px] flex justify-end mb-[-15px] text-[14px]">
                            <div className="max-w-[150px] relative">
                              <div className="absolute w-[20px] h-[20px] text-center top-[5px] left-[-5px] bg-[#481322] rotate-[25deg]"></div>
                              <div className="absolute w-[20px] h-[20px] text-center top-[5px] right-[-5px] bg-[#481322] rotate-[65deg]"></div>

                              <div className="text-center relative  bg-primary text-xs text-white px-[20px] pt-[7px] pb-[0] z-20">
                                <span className="relative z-[2]">
                                  Members Only
                                </span>
                                <div className="absolute w-[65px] h-[15px] text-center left-[1px] bottom-[-3px] bg-primary rotate-[5deg]"></div>
                                <div className="absolute w-[65px] h-[15px] text-center right-[1px] bottom-[-3px] bg-primary rotate-[-5deg]"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="relative w-full min-h-[160px] bg-secondary p-[20px] z-10">
                          <h3 className="text-white text-[20px] truncate mb-[10px]">
                            {item?.attributes?.title
                              ?.split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() +
                                  word.slice(1).toLowerCase()
                              )
                              .join(" ")}
                          </h3>
                          {item?.attributes?.data?.main?.description && (
                            <div
                              className="text-white text-[14px] line-clamp-3"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item?.attributes?.data?.main?.description.replace(
                                    /(<([^>]+)>)/gi,
                                    ""
                                  ),
                              }}
                            />
                          )}
                          <div className="absolute bottom-[-6px] right-[30px] w-[15px] h-[15px] bg-secondary rotate-45 z-10" />
                        </div>
                        <div className="relative flex flex-col items-center justify-end mb-[30px]">
                          <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span>
                          {item?.attributes?.data?.main?.featured_image && (
                            <Image
                              src={item.attributes.data.main.featured_image}
                              className="w-full min-h-[300px] object-cover"
                              width={500}
                              height={200}
                              alt={item?.attributes?.title}
                            />
                          )}
                          {item?.attributes?.route_url && (
                            <Link
                              href={item.attributes.route_url || "#"}
                              className="absolute bottom-[28px] border-[1px] border-white text-white hover:bg-white transition hover:text-[#212529] uppercase p-[15px] z-20"
                            >
                              More Details
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>No results to show at the moment. Please try again later.</>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
