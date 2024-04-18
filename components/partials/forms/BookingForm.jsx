import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import globalData from "@/lib/preBuildScripts/static/globalData.json";
import config from "site.config";

import { useMobileDetector } from "@/lib/services/isMobileDetector";
import globalState from "@/lib/store/globalState";

export default function BookingForm({ ...props }) {
  const showLazy = globalState((state) => state.showLazy);
  const DateRange = dynamic(() =>
    showLazy
      ? Promise.all([
          import("react-date-range/dist/styles.css"),
          import("react-date-range"),
          import("react-date-range/dist/theme/default.css"),
        ]).then(([styles, module]) => module.DateRange)
      : () => null
  );

  const Calendar = dynamic(() =>
    showLazy
      ? Promise.all([
          import("react-date-range/dist/styles.css"),
          import("react-date-range"),
          import("react-date-range/dist/theme/default.css"),
        ]).then(([styles, module]) => module.Calendar)
      : () => null
  );
  const ArrowDown = dynamic(() =>
    import("@/components/icons/ArrowDown").then((module) => module.default)
  );

  const User = dynamic(() =>
    import("@/components/icons/User").then((module) => module.default)
  );

  const CalendarIcon = dynamic(() =>
    import("@/components/icons/Calendar").then((module) => module.default)
  );

  const isMobile = useMobileDetector();

  const { page, blocks } = props;

  const disabledTypes = ["offers", "blog", "meetings-events-suites"];
  const disabledBlocks = ["Title"];

  const { booking_id } = globalData.tenantDetails.data.main;

  const { bookingUrl } = config;

  const [isFloat, setIsFloat] = useState(true);

  const [showCalendar, setShowCalendar] = useState(false);
  const [mobileShowCalendar, setMobileShowCalendar] = useState({
    start: false,
    end: false,
  });

  const [showGuests, setShowGuests] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scheduleDateMobile, setScheduleDateMobile] = useState({
    start: "",
    end: "",
  });

  const [guestAdult, setGuestAdult] = useState({
    min: 1,
    value: 1,
  });
  const [guestChildren, setGuestChildren] = useState({
    min: 0,
    value: 0,
  });

  const [selectionRange, setSelectionRange] = useState({
    // startDate: new Date(),
    // endDate: new Date(),
    key: "selection",
  });

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setShowGuests(false);
  };

  const toggleGuest = () => {
    setShowCalendar(false);
    setShowGuests(!showGuests);
  };

  const arrivalDisplayDate = selectionRange?.startDate?.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );
  const departureDisplayDate = selectionRange?.endDate?.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );

  const arrivalDate = selectionRange?.startDate
    ?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  const departureDate = selectionRange?.endDate
    ?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  const calendarSelector = (ranges) => {
    setSelectionRange(ranges?.selection);
  };

  const updateGuest = (type, action) => {
    if (type === "adult") {
      setGuestAdult((prevState) => {
        let newValue;
        if (action === "increment") {
          newValue = prevState.value + 1;
        } else if (action === "decrement") {
          newValue = Math.max(prevState.value - 1, prevState.min);
        }
        return { ...prevState, value: newValue };
      });
    } else if (type === "children") {
      setGuestChildren((prevState) => {
        let newValue;
        if (action === "increment") {
          newValue = prevState.value + 1;
        } else if (action === "decrement") {
          newValue = Math.max(prevState.value - 1, prevState.min);
        }
        return { ...prevState, value: newValue };
      });
    }
  };

  const submitBooking = () => {
    setShowCalendar(false);
    setShowGuests(false);
    setGuestChildren({ min: 0, value: 0 });
    setGuestAdult({ min: 1, value: 1 });
    setSelectionRange({ key: "selection" });
    window.open(
      bookingUrl +
        `?hotel=${booking_id}&child=${guestChildren.value}&adult=${guestAdult.value}&depart=${departureDate}&arrive=${arrivalDate}`
    );
  };

  useEffect(() => {
    setIsFloat(true);
    disabledBlocks.forEach((blockName) => {
      const hasTitleBlock = blocks?.find((block) => block?.key === blockName);
      const hasPageBannerBlock = blocks?.find(
        (block) => block?.key === "PageBanner"
      );
      const hasSliderBlock = blocks?.find((block) => block?.key === "Slider");

      if (hasTitleBlock) {
        setIsFloat(false);
      }
      if (
        page?.type === "pages" &&
        !hasTitleBlock &&
        !hasPageBannerBlock &&
        !hasSliderBlock
      ) {
        setIsFloat(false);
      }
    });

    if (disabledTypes?.includes(page?.content?.id)) {
      //
      setIsFloat(false);
    }
  }, [
    arrivalDisplayDate,
    departureDisplayDate,
    disabledBlocks,
    disabledTypes,
    blocks,
    page,
  ]);

  const today = new Date();

  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 5);

  const showModalForm = () => {
    setShowModal(true);
    document.querySelector("body").style.overflow = "hidden";
  };

  return (
    <>
      {booking_id && (
        <>
          <div
            className={`${
              isFloat ? "mb-[-50px]" : ""
            } booking-form relative z-[22] backdrop-blur-[2px] w-full z-[1] bg-[#fff] bg-opacity-50 xl:bg-opacity-70 border-t-[1px] border-[#fff] select-none`}
          >
            {!isMobile ? (
              <div className="flex justify-end text-[14px] h-full">
                <div
                  className={`${
                    process.env.NEXT_PUBLIC_TEMPLATE == 1
                      ? "font-tenor"
                      : "font-domine"
                  } tracking-[3px] py-[10px] pr-[15px] border-r-[1px] border-[#a7a7a7] text-[16px] uppercase`}
                >
                  Quick book
                </div>
                <span className="relative">
                  {showCalendar && (
                    <DateRange
                      className="absolute top-[100%] left-0"
                      ranges={[selectionRange]}
                      onChange={calendarSelector}
                      minDate={today}
                      maxDate={maxDate}
                    />
                  )}
                </span>
                <div
                  className="form-item min-w-[160px] relative flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer"
                  onClick={toggleCalendar}
                >
                  <CalendarIcon className="mr-[10px]" />
                  {!arrivalDisplayDate ? "Arrival" : arrivalDisplayDate}
                </div>

                <div
                  className="form-item min-w-[160px] flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer"
                  onClick={toggleCalendar}
                >
                  <CalendarIcon className="mr-[10px]" />
                  {!departureDisplayDate ? "Departure" : departureDisplayDate}
                </div>
                <span className="relative">
                  {showGuests && (
                    <div className="absolute min-w-[250px] top-[100%] left-0 bg-white shadow-md">
                      <div className="flex justify-between border-b-[1px] border-b-[#ccc] px-[10px]">
                        <span className="border-r-[1px] border-[#ccc] py-[10px] pr-[10px] w-full max-w-[75%]">
                          Adult{guestAdult.value > 1 ? "s" : ""}:
                        </span>

                        <div className="flex items-center w-full max-w-[25%] px-[20px] py-[10px] relative">
                          {guestAdult.value}
                          <div className="flex flex-col items-center justify-center w-full max-w-[15%] pl-[15px] absolute right-[10px] top-[50%] translate-y-[-50%] h-full w-full">
                            <button
                              className="mb-[10px]"
                              onClick={() => updateGuest("adult", "increment")}
                            >
                              <ArrowDown className="rotate-180" width={10} />
                            </button>
                            {guestAdult.value > 1 && (
                              <button
                                onClick={() =>
                                  updateGuest("adult", "decrement")
                                }
                              >
                                <ArrowDown width={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between border-b-[1px] border-b-[#ccc] px-[10px]">
                        <span className="border-r-[1px] border-[#ccc] py-[10px] pr-[10px] w-full max-w-[75%]">
                          Children:
                        </span>

                        <div className="flex items-center w-full max-w-[25%] px-[20px] py-[10px] relative">
                          {guestChildren.value}
                          <div className="flex flex-col items-center justify-center w-full max-w-[15%] pl-[15px] absolute right-[10px] top-[50%] translate-y-[-50%] h-full w-full">
                            <button
                              className="mb-[10px]"
                              onClick={() =>
                                updateGuest("children", "increment")
                              }
                            >
                              <ArrowDown className="rotate-180" width={10} />
                            </button>

                            {guestChildren.value !== 0 && (
                              <button
                                onClick={() =>
                                  updateGuest("children", "decrement")
                                }
                              >
                                <ArrowDown width={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </span>
                <div
                  className="form-item flex justify-between min-w-[240px] flex items-center border-r-[1px] border-[#a7a7a7] px-[20px] cursor-pointer"
                  onClick={toggleGuest}
                >
                  <span className="flex items-center">
                    <User className="mr-[10px]" />
                    {guestAdult.value} Adults, {guestChildren.value} Children{" "}
                  </span>
                  <ArrowDown className="ml-[5px]" width={10} />
                </div>

                <div
                  className="bg-primary text-white items-center py-[10px] px-[20px] uppercase cursor-pointer hover:bg-[#555]"
                  onClick={submitBooking}
                >
                  Check Availability
                </div>
              </div>
            ) : (
              <div className="flex justify-end py-[5px] uppercase text-primary">
                <span className="flex  gap-x-[15px]" onClick={showModalForm}>
                  Book Now <CalendarIcon className="mr-[10px] fill-primary" />
                </span>
              </div>
            )}
          </div>

          {/* SHOW MODAL */}
          {showModal && isMobile && (
            <>
              <div className="fixed p-[15px] top-0 z-[200] left-0 w-full h-full py-[50px] flex items-center justify-center">
                <span
                  className="bg-gray-900 backdrop-blur w-full h-full absolute top-0 left-0 bg-opacity-[.3]"
                  onClick={() => {
                    setShowModal(false);
                    document.querySelector("body").style.overflow = "auto";
                  }}
                ></span>
                <div className="modal-content flex flex-col justify-start align-start space-y-[15px] select-none bg-white max-w-[480px] overflow-y-auto max-h-[90vh] mx-auto px-8 pb-8 w-full rounded-lg shadow-md transform transition-all scale-100 opacity-100">
                  <div className="flex w-full justify-between items-center sticky top-0 bg-white z-[11]">
                    <div className="text-primary py-[10px] text-[16px] uppercase">
                      Quick book
                    </div>
                    <span
                      className=""
                      onClick={() => {
                        setShowModal(false);
                        document.querySelector("body").style.overflow = "auto";
                      }}
                    >
                      <svg
                        className="w-[30px] h-[30px] fill-primary"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Close</title>
                        <path
                          fillRule="evenodd"
                          d="M10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 1.414-1.414L10 8.586z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div
                    className="form-item min-w-[160px] relative flex items-center cursor-pointer"
                    onClick={() => {
                      setMobileShowCalendar((prevState) => ({
                        ...prevState,
                        start: true,
                        end: false,
                      }));
                    }}
                    id="arrival-toggle"
                  >
                    <CalendarIcon className="mr-[10px]" />

                    {!scheduleDateMobile?.start
                      ? "Select Arrival Date"
                      : `Arrival: ${scheduleDateMobile?.start}`}
                  </div>

                  <div
                    className="form-item min-w-[160px] flex items-center cursor-pointer"
                    id="departure-toggle"
                    onClick={() => {
                      if (scheduleDateMobile.start === "") {
                        alert("Please select arrival date first.");
                      } else {
                        setMobileShowCalendar((prevState) => ({
                          ...prevState,
                          start: false,
                          end: true,
                        }));
                      }
                    }}
                  >
                    <CalendarIcon className="mr-[10px]" />
                    {!scheduleDateMobile?.end
                      ? "Select Departure Date"
                      : `Departure: ${scheduleDateMobile?.end}`}
                  </div>
                  <span className="relative">
                    <div className="min-w-[250px] top-[100%] left-0 bg-white">
                      <div className="flex justify-between border-b-[1px] border-b-[#ccc] px-[10px]">
                        <span className="border-r-[1px] border-[#ccc] py-[10px] pr-[10px] w-full max-w-[75%]">
                          Adult{guestAdult.value > 1 ? "s" : ""}:
                        </span>

                        <div className="flex items-center w-full max-w-[25%] px-[20px] py-[10px] relative">
                          {guestAdult.value}
                          <div className="flex flex-col items-center justify-center w-full max-w-[15%] pl-[15px] absolute right-[10px] top-[50%] translate-y-[-50%] h-full w-full">
                            <button
                              className="mb-[10px]"
                              onClick={() => updateGuest("adult", "increment")}
                            >
                              <ArrowDown className="rotate-180" width={10} />
                            </button>
                            {guestAdult.value > 1 && (
                              <button
                                onClick={() =>
                                  updateGuest("adult", "decrement")
                                }
                              >
                                <ArrowDown width={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between border-b-[1px] border-b-[#ccc] px-[10px]">
                        <span className="border-r-[1px] border-[#ccc] py-[10px] pr-[10px] w-full max-w-[75%]">
                          Children:
                        </span>

                        <div className="flex items-center w-full max-w-[25%] px-[20px] py-[10px] relative">
                          {guestChildren.value}
                          <div className="flex flex-col items-center justify-center w-full max-w-[15%] pl-[15px] absolute right-[10px] top-[50%] translate-y-[-50%] h-full w-full">
                            <button
                              className="mb-[10px]"
                              onClick={() =>
                                updateGuest("children", "increment")
                              }
                            >
                              <ArrowDown className="rotate-180" width={10} />
                            </button>

                            {guestChildren.value !== 0 && (
                              <button
                                onClick={() =>
                                  updateGuest("children", "decrement")
                                }
                              >
                                <ArrowDown width={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                  <div className="">
                    <div
                      className="mt-[30px] bg-primary text-white items-center py-[10px] px-[20px] uppercase cursor-pointer hover:bg-[#555] w-auto inline-block"
                      onClick={() => {
                        setMobileShowCalendar((prevState) => ({
                          ...prevState,
                          start: false,
                          end: false,
                        }));
                        setScheduleDateMobile((prevState) => ({
                          ...prevState,
                          start: "",
                          end: "",
                        }));
                        setGuestChildren({ min: 0, value: 0 });
                        setGuestAdult({ min: 1, value: 1 });
                        window.open(
                          bookingUrl +
                            `?hotel=${booking_id}&child=${guestChildren.value}&adult=${guestAdult.value}&depart=${scheduleDateMobile?.end}&arrive=${scheduleDateMobile?.start}`
                        );
                      }}
                    >
                      Check Availability
                    </div>
                  </div>
                </div>
              </div>
              {mobileShowCalendar.start || mobileShowCalendar.end ? (
                <div className="fixed p-[15px] top-0 left-0 w-full h-full flex items-center justify-center z-[999]">
                  <span
                    className="absolute top-0 left-0 w-full h-full bg-[#333] bg-opacity-50 backdrop-blur-sm"
                    onClick={() => {
                      setMobileShowCalendar((prevState) => ({
                        ...prevState,
                        start: false,
                        end: false,
                      }));
                    }}
                  ></span>

                  <div className="max-h-[90vh] flex flex-col overflow-y-auto shadow-md bg-white relative z-[200]">
                    {mobileShowCalendar.start && (
                      <>
                        <span className="px-[15px] py-[10px] bg-white block top-0 sticky z-[10]">
                          Choose an Arrival Date
                        </span>
                        <Calendar
                          className=""
                          minDate={today}
                          maxDate={maxDate}
                          onChange={(e) => {
                            const startDate = e
                              .toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                              .replace(/\//g, "-");

                            if (startDate > scheduleDateMobile.end) {
                              setScheduleDateMobile((prevState) => ({
                                ...prevState,
                                end: "",
                              }));
                            }
                            setScheduleDateMobile((prevState) => ({
                              ...prevState,
                              start: startDate,
                            }));

                            setMobileShowCalendar((prevState) => ({
                              ...prevState,
                              start: false,
                              end: false,
                            }));
                          }}
                        />
                      </>
                    )}

                    {mobileShowCalendar.end && (
                      <>
                        <span className="px-[15px] py-[10px] bg-white block top-0 sticky z-[10]">
                          Choose a Departure Date
                        </span>
                        <Calendar
                          className=""
                          minDate={today}
                          maxDate={maxDate}
                          onChange={(e) => {
                            const endDate = e
                              .toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                              .replace(/\//g, "-");

                            if (endDate < scheduleDateMobile.start) {
                              alert(
                                "Departure date cannot be before arrival date."
                              );
                            } else {
                              setScheduleDateMobile((prevState) => ({
                                ...prevState,
                                end: endDate,
                              }));
                              setMobileShowCalendar((prevState) => ({
                                ...prevState,
                                start: false,
                                end: false,
                              }));
                            }
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
