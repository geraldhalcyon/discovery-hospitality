import CustomSelect from "../forms/CustomSelect";
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/description.module.css";
import dynamic from "next/dynamic";
export default function Selection({ block }) {
  const CustomSelect = dynamic(() =>
    import("../forms/CustomSelect").then((module) => module.default)
  );

  const { title, description, selection_label, selections, buttons } =
    block.main;

  const [selectedValue, setSelectedValue] = useState(0);
  const [currentSelection, setCurrentSelection] = useState(selections[0]);

  const getDefaultValue = () => {
    let defaultSelection = selections[0]?.title || "";
    return { label: defaultSelection, value: defaultSelection };
  };

  return (
    <section className="bg-[#f1f1f1] pt-[20px] sm:py-[30px]">
      <div className="container pb-[30px]">
        <div className="my-[15px]">
          {title && (
            <h2
              className={`text-primary text-[18px] font-bold tracking-[1px] mb-[20px] tracking-[1px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              }`}
            >
              {title}
            </h2>
          )}
          {description && (
            <div
              className={`${styles.description} mb-[20px]`}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          )}
        </div>
        {selections.length > 0 && (
          <>
            <div
              className={`text-primary text-[20px] tracking-[1px] mt-[30px] mb-[10px] tracking-[1px] ${
                process.env.NEXT_PUBLIC_TEMPLATE == 1
                  ? "font-tenor"
                  : "font-domine"
              }`}
            >
              {selection_label}:
            </div>
            <CustomSelect
              // value={selectedValue}
              className="react-select"
              defaultValue={getDefaultValue()}
              onChange={(e) =>
                setSelectedValue(() => {
                  Number(e.value);
                  const curSelection = selections.find(
                    (obj) => obj.title === e.value
                  );
                  setCurrentSelection(curSelection);
                })
              }
              options={selections?.map((item, index) => {
                return {
                  label: item?.title,
                  value: item?.title,
                };
              })}
            />
          </>
        )}
        <div
          className={`${styles.description} my-[30px]`}
          dangerouslySetInnerHTML={{
            __html: currentSelection.description,
          }}
        />
        {buttons.length > 0 && (
          <div className="flex flex-col md:flex-row gap-x-3 w-full justify-center my-[30px]">
            <div className="flex flex-wrap justify-center ">
              {buttons.map((item, index) => (
                <Link
                  key={index}
                  href={item?.button_link || "#"}
                  className={`px-[30px] py-[20px] text-center text-xs 2sm:text-sm m-[15px] ${
                    item.button_variant === "dark"
                      ? "text-white bg-primary"
                      : "border-secondary"
                  } border text-secondary uppercase hover:bg-secondary hover:text-white transition-all duration-300 `}
                >
                  {item?.button_label || "#"}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
