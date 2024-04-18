import { useEffect, useState } from "react";
// import globalData from "../../../lib/preBuildScripts/static/globalData.json";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import NProgress from "nprogress";
import tenantInformation from "@/lib/preBuildScripts/static/tenantDetailsMain.json";

export default function MainMenuMobile({ ...props }) {
  const Booking = dynamic(() =>
    import("@/components/icons/Booking").then((module) => module.default)
  );

  const Email = dynamic(() =>
    import("@/components/icons/Email").then((module) => module.default)
  );
  const Phone = dynamic(() =>
    import("@/components/icons/Phone").then((module) => module.default)
  );

  const { parentNodes, nodes } = props;
  const router = useRouter();
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [isBookToggled, setIsBookToggled] = useState(false);
  const [bookingLinks, setIsBookingLinks] = useState({});

  const closeMenu = () => {
    document.querySelector("body").classList.remove("mobile-menu-opened");
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-closed");
      setIsMenuToggled(false);
    }, 300);
  };
  const openMenu = () => {
    setIsMenuToggled(true);
    document.querySelector("body").classList.remove("mobile-menu-closed");
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-opened");
    }, 300);
  };

  const bookingOpen = () => {
    const reservation = parentNodes.find(
      (obj) => obj.label.toLowerCase() === "reservations"
    );
    setIsBookingLinks(reservation?.children);

    setIsBookToggled(true);
    setTimeout(() => {
      document.querySelector("body").classList.add("mobile-menu-opened");
    }, 300);

    document.querySelector("body").classList.add("mobile-menu-opened");
  };
  const closeBooking = () => {
    document.querySelector("body").classList.remove("mobile-menu-opened");
    // setTimeout(() => {
    document.querySelector("body").classList.add("mobile-menu-closed");
    setIsBookToggled(false);
    // }, 300);
  };

  // const hasChildrenNotInParent = nodes.filter((obj) => {
  //   const idExistsInParent = parentNodes.some((parent) => parent.id === obj.id);

  //   if (!idExistsInParent && obj.children.length > 0) {
  //     return obj;
  //   }
  // });

  const parents = nodes.filter((obj) => {
    if (obj.children.length > 0) {
      return obj;
    }
  });

  function findParentAndSiblings(objects, childId, parent = null) {
    for (const obj of objects) {
      if (obj.id === childId) {
        const siblings = parent
          ? parent.children.filter((sibling) => sibling.id !== childId)
          : [];
        const parentId = parent ? parent.id : null;
        return { parentId, parent, siblings };
      }
      if (obj.children) {
        const result = findParentAndSiblings(obj.children, childId, obj);
        if (result.parent !== null) {
          return result;
        }
      }
    }
    return { parentId: null, parent: null, siblings: [] };
  }

  const CurrentMenu = ({ ...props }) => {
    const { item, id } = props;
    return (
      <div
        className="children px-[15px] max-h-[calc(100dvh-80px)] landscape:max-h-[calc(100dvh-92px)]"
        id={`child-${id}`}
      >
        <div
          className="flex text-primary select-none justify-between text-[18px] [&:not(:last-of-type)]:border-b-[1px] [&:not(:last-of-type)]:border-[#ccc] pb-[15px] [&:not(:last-of-type)]:mb-[15px]"
          id={id}
          onClick={() => {
            const parentObjects = findParentAndSiblings(parentNodes, item.id);

            const current = document.querySelector(".current");
            current.classList.add("prev");
            setTimeout(() => {
              current.classList.remove("prev");
            }, 200);
            current.classList.remove("current");
            const newCurrent = document.querySelector(
              `#child-${parentObjects.parentId}`
            );

            if (newCurrent) {
              newCurrent.classList.add("current");
            } else {
              const topLevel = document.querySelector(".top-level");
              topLevel.classList.remove("prev");
              topLevel.classList.add("current");
            }
          }}
        >
          Back
        </div>
        {item?.children.map((item, index) => (
          <div
            className="flex justify-between text-[18px] [&:not(:last-of-type)]:border-b-[1px] [&:not(:last-of-type)]:border-[#ccc] pb-[15px] [&:not(:last-of-type)]:mb-[15px]"
            key={index}
            id={item?.id}
            parent={"parent-nodes"}
            onClick={() => {
              const parentObjects = findParentAndSiblings(parentNodes, item.id);
              if (item?.children.length > 0) {
                const current = document.querySelector(".current");
                current.classList.remove("current");
                const newCurrent = document.querySelector(`#child-${item.id}`);
                newCurrent.classList.add("current");
              } else {
                NProgress.start();
                router
                  .push(`${item.url}`)
                  .then(() => {
                    NProgress.done();
                  })
                  .catch(() => {
                    NProgress.done();
                  });
                closeMenu();
              }
            }}
          >
            {item.label}
            {item?.children && item?.children.length > 0 && (
              <div className="flex flex-col justify-center items-center relative mr-[10px] w-0 h-[17px]">
                <div className="w-full border-[#555] h-[50%] skew-x-[45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-t-[1.8px] border-main-black group-hover:border-main-red"></div>
                <div className="w-full border-[#555] h-[50%] skew-x-[-45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-b-[1.8px] border-main-black group-hover:border-main-red"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    closeMenu();
    closeBooking();
  }, []);

  return (
    <>
      <div className="remove-highlight select-none absolute left-0 flex justify-between right-0 px-[15px]">
        <span
          className="w-[20px] select-none block cursor-pointer"
          onClick={openMenu}
        >
          {Array.from({ length: 3 }, (_, index) => (
            <span
              key={index}
              className="w-full block h-[3px] bg-primary mb-[3px] last-of-type:mb-0"
            ></span>
          ))}
        </span>
        <span className="flex items-center relative z-[10]">
          {tenantInformation?.email && (
            <span className="px-[5px]">
              <Link
                className="flex items-center hover:opacity-[.5]"
                href={`mailto:${tenantInformation?.email}`}
              >
                <Email className="mr-[5px] !fill-primary" />
              </Link>
            </span>
          )}
          {tenantInformation?.phone && (
            <span className="px-[5px]">
              <Link
                className="flex items-center hover:opacity-[.5]"
                href={`tel:${tenantInformation?.phone}`}
              >
                <Phone className="mr-[5px] !fill-primary" />
              </Link>
            </span>
          )}
          <span className="cursor-pointer" onClick={bookingOpen}>
            <Booking className="select-none cursor-pointer !fill-primary" />
          </span>
        </span>
      </div>

      <>
        {/* BOOK MOBILE POPUP */}
        {isBookToggled && (
          <>
            <div className="p-[15px] book-modal flex items-center justify-center fixed top-0 left-0 w-full h-full z-[200]">
              <span
                className="bg-gray-900 backdrop-blur w-full h-full absolute top-0 left-0 bg-opacity-[.3]"
                onClick={closeBooking}
              ></span>
              <div className="modal-content select-none bg-white max-w-[480px] overflow-y-auto max-h-[90vh] mx-auto px-8 pb-8 w-full rounded-lg shadow-md transform transition-all scale-100 opacity-100">
                <div className="sticky flex justify-between top-0 bg-white text-primary pt-[20px] pb-[15px] font-bold text-[20px]">
                  <span>Choose an option:</span>

                  <button
                    onClick={closeBooking}
                    className="hover:opacity-[.5] relative right-[-10px]"
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
                  </button>
                </div>
                <div>
                  {bookingLinks.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={item?.url}
                        target={
                          item?.url?.includes("http") ? "_blank" : "_self"
                        }
                        onClick={closeBooking}
                        className="inline-flex items-center gap-x-[5px] py-2 text-gray-800 transition hover:font-bold hover:text-primary"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {/* END BOOKING MOBILE POPUP */}

        {/* HEADER MOBILE MENU */}
        {isMenuToggled && (
          <>
            <div
              id="header-mobile"
              className="fixed max-h-[100vh] overflow-hidden transition pt-0 p-[15px] bg-[#F1F1F1] max-w-[calc(100%-50px)] sm:max-w-[420px] z-[999] w-full h-full left-0 top-0"
            >
              <div className="sticky flex mb-[30px] items-center justify-between top-0 py-[15px] bg-[#F1F1F1] z-[1]">
                <Image
                  src={tenantInformation?.tenant_logo}
                  width={200}
                  height={54}
                  alt="Site Logo"
                  className="w-auto h-auto max-w-[90px]"
                />
                <span
                  className="cursor-pointer relative top-[0]"
                  onClick={closeMenu}
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
              <div className="menu-links relative">
                <div className="current top-level max-h-[calc(100dvh-80px)] landscape:max-h-[calc(100dvh-92px)] overflow-y-auto">
                  {parentNodes?.map((item, index) => {
                    if (item.label.toLowerCase() !== "reservations") {
                      return (
                        <div
                          className="select-none flex justify-between text-[18px] [&:not(:last-of-type)]:border-b-[1px] [&:not(:last-of-type)]:border-[#ccc] pb-[15px] [&:not(:last-of-type)]:mb-[15px]"
                          key={index}
                          id={item?.id}
                          onClick={() => {
                            if (item?.children && item?.children.length > 0) {
                              const topLevel =
                                document.querySelector(".current");
                              topLevel.classList.remove("current");
                              topLevel.classList.add("prev");
                              const child = document.querySelector(
                                `#child-${item.id}`
                              );

                              child.classList.add("current");
                            } else {
                              NProgress.start();
                              router
                                .push(`${item.url}`)
                                .then(() => {
                                  NProgress.done();
                                })
                                .catch(() => {
                                  NProgress.done();
                                });
                            }
                          }}
                        >
                          {item.label}
                          {item?.children && item?.children.length > 0 && (
                            <div className="flex flex-col justify-center items-center relative mr-[10px] w-0 h-[17px]">
                              <div className="w-full border-[#555] h-[50%] skew-x-[45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-t-[1.8px] border-main-black group-hover:border-main-red"></div>
                              <div className="w-full border-[#555] h-[50%] skew-x-[-45deg] skew-y-[0deg] border-solid border-l-[1.8px] border-r-[1.8px] border-b-[1.8px] border-main-black group-hover:border-main-red"></div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>

                {parents.map((item, index) => (
                  <CurrentMenu key={index} id={item?.id} item={item} />
                ))}
              </div>
            </div>

            <span
              className="cursor-pointer bg-[rgba(0,0,0,0.3)] backdrop-blur-sm fixed z-[22] w-full h-full top-0 left-0"
              onClick={closeMenu}
            ></span>
          </>
        )}
        {/* END MOBILE MENU */}
      </>
    </>
  );
}
