import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderSection = ({ title, bgColor, textColor, label }) => {
  return (
    <div className="text-white mt-4 mb-2">
      <div className="my-1 flex justify-between items-center">
        {/* Left */}
        <Link
          href={`${label}`}
          className={`${bgColor} w-28 xl:w-36 2xl:w-auto 2xl:pl-4 2xl:pr-14 xl:py-[0.50rem] md:py-1.5 py-1.5 relative overflow-hidden flex items-center`}
        >
          <h2 className="xl:text-2xl lg:text-xl md:text-lg text-sm text-center w-full">
            {title}
          </h2>
          <div
            className="absolute h-full right-0 2xl:border-t-[45px] 2xl:border-l-[45px] 2xl:border-t-white 2xl:border-l-transparent"
            aria-hidden="true"
          />
        </Link>
        {/* Right */}
        <Link
          href={`${label}`}
          className={`${bgColor} flex items-end gap-1 py-1.5 lg:px-4 px-2 md:text-white`}
        >
          <h2 className="cursor-pointer text-sm md:text-base xl:text-lg font-semibold SFPro">
            View All
          </h2>
          <ArrowRight className="cursor-pointer mb-[1px] md:mb-1 lg:mb-0 xl:mb-1 w-5 h-5 lg:w-6 lg:h-6" />
        </Link>
      </div>
      <div className={`${bgColor} h-2 w-full`}></div>
    </div>
  );
};

export default HeaderSection;
