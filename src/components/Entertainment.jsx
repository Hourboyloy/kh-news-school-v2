"use client";
import React from "react";
import HeaderSection from "./HeaderSection";
import Image from "next/image";
import Link from "next/link";
import { truncateText5 } from "../utils/truncateText5";
const Entertainment = ({ newsByCategoryInHome }) => {

  return (
    <div className="space-y-3.5">
      <div
        className={`${newsByCategoryInHome?.entertainment?.length <= 0 && "hidden"}`}
      >
        <HeaderSection
          title={"កម្សាន្ត"}
          textColor={"text-red-600"}
          bgColor={"bg-purple-500"}
          label={"/entertainment"}
        />
      </div>

      <div className="overflow-hidden grid grid-cols-2 lg:grid-cols-3 gap-2.5">
        {newsByCategoryInHome?.entertainment?.length > 0 &&
          newsByCategoryInHome?.entertainment?.map(
            (data, index) =>
              index < 6 && (
                <Link
                  href={`/article/${data._id}`}
                  key={index}
                  className="relative rounded-md overflow-hidden md:shadow-md md:border-none border border-gray-50 shadow md:bg-none bg-white"
                >
                  <Image
                    key={index}
                    width={400}
                    height={400}
                    alt="Image"
                    className="h-[140px] md:h-[220px] w-full object-cover object-center"
                    src={
                      data.photosDescription.length > 0 &&
                      data.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                  />

                  <div className="p-1.5 md:p-0 md:absolute bottom-0 w-full md:bg-black md:bg-opacity-45">
                    <h3 className="md:px-4 py-2 md:text-white lg:text-[16px] md:text-[13px] text-[13px]">
                      {truncateText5(`${data.title}`)}
                    </h3>
                  </div>
                </Link>
              )
          )}
      </div>
    </div>
  );
};

export default Entertainment;
