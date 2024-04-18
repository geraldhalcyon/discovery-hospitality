import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function MeetingsEvents({ block }) {
  const { title } = block.main;

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [displayCount, setDisplayCount] = useState(6); // Initial count of items to display

  useEffect(() => {
    // Fetch events
    const getEvents = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_TENANT_API +
            `/api/contents/meetings-events-suites/entries?&page[size]=${displayCount}&includes=blueprintData,mediaHandler&filter[sites.id]=${process.env.NEXT_PUBLIC_MICROSITE_ID}`
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    getEvents();
  }, [displayCount]);

  const handleLoadMore = () => {
    setDisplayCount(events.meta.total);
  };

  return (
    <section className="bg-[#F1F1F1] pb-[30px]">
      <div className="container overflow-hidden">
        {title && (
          <h2 className="text-primary text-[25px] tracking-[1px] text-center uppercase py-[30px] border-b-[1px] border-[#ccc]">
            {title || ""}
          </h2>
        )}
        <div className="events">
          {loading ? (
            <>
              {Array.from({ length: 2 }, (_, index) => (
                <div key={index} className="mb-[60px]">
                  <div className="h-6 max-w-[50%] bg-gray-300 animate-pulse mb-[15px]"></div>
                  <div className="min-h-[300px] bg-gray-300 animate-pulse mb-[30px]"></div>

                  <div className="h-[15px] bg-gray-300 animate-pulse mb-[10px]"></div>
                  <div className="h-[15px] bg-gray-300 animate-pulse mb-[10px]"></div>
                  <div className="h-[15px] bg-gray-300 animate-pulse mb-[30px]"></div>

                  <div className="h-[15px] bg-gray-300 animate-pulse max-w-[250px]"></div>
                </div>
              ))}
            </>
          ) : (
            <div>
              {events && events.data.length > 0 ? (
                <div className="flex flex-wrap justify-center mx-[-15px] pt-[30px]">
                  {events.data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="relative w-full sm:max-w-[50%] lg:max-w-[33.33%] px-[15px]"
                      >
                        <div className="w-full bg-white p-[20px] z-10">
                          <h3 className="text-primary text-[20px]">
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
                        <div className="relative flex min-h-[250px] sm:min-h-[300px] flex-col items-center justify-end mb-[30px]">
                          <span className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-[.25] z-[1]"></span>
                          {item?.attributes?.data?.main?.image && (
                            <Image
                              src={item.attributes.data.main.image}
                              className="w-full absolute top-0 left-0 h-full object-cover"
                              width={500}
                              height={200}
                              alt={item?.attributes?.title}
                            />
                          )}
                          {item?.attributes?.route_url && (
                            <Link
                              href={item.attributes.route_url}
                              className="relative bottom-[28px] bg-primary border-[1px] border-primary text-white hover:bg-secondary hover:border-secondary transition uppercase px-[30px] py-[20px] z-20"
                            >
                              Read More
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
              {events.meta.total > displayCount && (
                <div className="flex justify-center pb-[20px] pt-[10px] md:pb-[50px]">
                  <button
                    onClick={handleLoadMore}
                    className="border-[1px] border-secondary text-secondary text-center text-xs 2sm:text-sm uppercase hover:bg-secondary hover:text-white transition-all duration-300 px-[30px] py-[20px]"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
