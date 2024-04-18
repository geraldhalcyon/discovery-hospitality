"use client";

import globalData from "@/lib/preBuildScripts/static/globalData.json";
import persistentStore from "@/lib/store/persistentStore";
import Link from "next/link";
import globalState from "@/lib/store/globalState";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { useMobileDetector } from "@/lib/services/isMobileDetector";

export default function Menu({ ...props }) {
  const MainMenu = dynamic(() =>
    import("./MainMenu").then((module) => module.default)
  );
  const MainMenuMobile = dynamic(() =>
    import("./MainMenuMobile").then((module) => module.default)
  );

  const ready = globalState((state) => state.ready);
  const { tenantDetails, menus, locales } = globalData;
  const { parentNodes, nodes } = menus;

  const isMobile = useMobileDetector();

  const Email = dynamic(() =>
    import("@/components/icons/Email").then((module) => module.default)
  );
  const Phone = dynamic(() =>
    import("@/components/icons/Phone").then((module) => module.default)
  );
  const LangEn = dynamic(() =>
    import("@/components/icons/LangEn").then((module) => module.default)
  );

  const Menu = dynamic(() =>
    isMobile ? import("./MainMenuMobile") : import("./MainMenu")
  );
  const DropdownArrow = dynamic(() =>
    import("@/components/icons/DropdownArrow")
  );

  return (
    <>
      <header
        id="header"
        className={`sticky top-0 z-[100] bg-white shadow-[0_2px_2px_-2px_rgba(0,0,0,.15)] min-h-[61px] flex flex-col justify-center items-end ${
          process.env.NEXT_PUBLIC_TEMPLATE == 2 ? "xl:pr-[15px]" : ""
        }`}
      >
        {!isMobile && (
          <>
            {tenantDetails?.data?.main?.email ||
            tenantDetails?.data?.main?.phone ? (
              <div className="hidden xl:block header-strip overflow-hidden pt-[10px] text-[14px]">
                <div className="flex justify-end">
                  {tenantDetails?.data?.main?.email && (
                    <span className="px-[5px]">
                      <Link
                        className="flex items-center hover:opacity-[.5]"
                        href={`mailto:${tenantDetails?.data?.main?.email}`}
                      >
                        <Email className="mr-[5px]" />

                        {tenantDetails?.data?.main?.email}
                      </Link>
                    </span>
                  )}
                  {tenantDetails?.data?.main?.phone && (
                    <span className="px-[5px]">
                      <Link
                        className="flex items-center hover:opacity-[.5]"
                        href={`mailto:${tenantDetails?.data?.main?.phone}`}
                      >
                        <Phone className="mr-[5px]" />

                        {tenantDetails?.data?.main?.phone}
                      </Link>
                    </span>
                  )}
                  {process.env.NEXT_PUBLIC_TEMPLATE == 2 && (
                    <div className="px-5 flex items-center">
                      <LangEn />{" "}
                      <span>
                        EN
                        <DropdownArrow
                          className={`ml-[5px] top-[-2px] ${
                            process.env.NEXT_PUBLIC_TEMPLATE == 1
                              ? "border-white"
                              : "border-primary"
                          } relative`}
                          width={7}
                          height={7}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        <div
          className={`flex items-center py-[10px] xl:py-0 justify-center xl:justify-end ${
            process.env.NEXT_PUBLIC_TEMPLATE != 1 ? "pr-[2px]" : ""
          }`}
        >
          <div className="xl:pl-[30px] z-[1] max-w-[154px] mx-auto xl:max-w-[100%] absolute top-0 left-0 right-0 xl:right-auto h-full flex items-center">
            <Link href="/" className="h-full block">
              <Image
                src={tenantDetails?.data?.main?.tenant_logo}
                width={154}
                height={50}
                className={`h-full object-contain max-w-[154px] w-full`}
                alt={tenantDetails.name || "Logo"}
              />
            </Link>
          </div>
          <Menu
            className={isMobile ? "block xl:hidden" : "hidden xl:flex"}
            parentNodes={parentNodes}
            nodes={nodes}
          />
        </div>
      </header>
    </>
  );
}
