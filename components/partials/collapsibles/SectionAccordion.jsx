import dynamic from "next/dynamic";
import { useState } from "react";
export default function SectionAccordion({ children, ...props }) {
  const [isCollapsed, setIsCollapsed] = useState(
    process.env.NEXT_PUBLIC_TEMPLATE == 1 ? false : true
  );
  const { title, className, childrenClassname } = props;
  const ArrowDown = dynamic(() => import("@/components/icons/ArrowDown"));

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`accordion w-full ${className ? className : ""}`}>
      <div className="h-[1px] md:hidden bg-[#ccc] w-[calc(100%-30px)] mx-auto"></div>
      {title && (
        <div
          className={`${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          } text-primary flex justify-between items-center md:hidden py-[20px] bg-white px-[15px]`}
          onClick={handleCollapse}
        >
          {title}
          <span className={`${!isCollapsed ? "rotate-180" : ""}`}>
            <ArrowDown className="fill-primary" />
          </span>
        </div>
      )}
      <div
        className={`${
          childrenClassname ? childrenClassname : "pb-[30px] md:pb-0"
        } ${isCollapsed ? "hidden md:block" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
