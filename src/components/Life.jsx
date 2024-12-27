"use client";
import HeaderSection from "./HeaderSection";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
const Life = ({ newsByCategoryInHome }) => {
  return (
    <div className="mb-4">
      <div
        className={`${newsByCategoryInHome?.lifes?.length <= 0 && "hidden"}`}
      >
        <HeaderSection
          title={"ជីវិតនិងសង្គម"}
          textColor={"text-yellow-500"}
          bgColor={"bg-green-500"}
          label={"/life"}
        />
      </div>
      <div className="flex flex-col md:flex-row space-x-2.5 space-y-4">
        {/* 2 Cols Grid big one */}
        <div className="grid grid-rows-1 grid-cols-2 lg:grid-cols-4 space-y-3 lg:space-y-0 lg:space-x-3 mt-4">
          {/* Big Card */}
          {newsByCategoryInHome?.lifes?.length > 0 &&
            newsByCategoryInHome.lifes?.map(
              (data, index) =>
                index === 0 && (
                  <Link
                    href={`/article/${data._id}`}
                    key={index}
                    className="grid col-span-2 rounded-md text-white shadow-lg relative"
                  >
                    <Image
                      width={400}
                      height={400}
                      alt="Image"
                      className="w-full h-full object-cover object-center"
                      src={
                        data.photosDescription.length > 0 &&
                        data.photosDescription.find(
                          (photoObj) => photoObj.photo && photoObj.photo !== ""
                        )?.photo
                      }
                    />
                    <h2 className="2xl:left-8 absolute top-3 left-3 2xl:top-[-0.6rem] bg-green-500 py-2 px-6 hidden md:block">
                      {data.category}
                    </h2>
                    <div className="absolute w-full bottom-0 bg-black bg-opacity-45">
                      <div className="flex flex-col gap-2 px-4 py-4">
                        <h3 className="text-sm md:text-lg">
                          <marquee behavior="" direction="">
                            {data.title}
                          </marquee>
                        </h3>
                      </div>
                    </div>
                  </Link>
                )
            )}

          {/* Small Card */}
          <div className="col-span-2">
            <div className="w-full grid grid-cols-2 gap-3">
              {newsByCategoryInHome?.lifes?.length > 0 &&
                newsByCategoryInHome.lifes.map(
                  (data, index) =>
                    index > 0 &&
                    index < 5 && (
                      <Link
                        href={`/article/${data._id}`}
                        key={index}
                        className="space-y-2 shadow-lg rounded-md overflow-hidden"
                      >
                        <Image
                          width={400}
                          height={400}
                          alt="Image"
                          className="w-full h-[120px] md:h-[150px] xl:h-[180px] object-cover object-center"
                          src={
                            data.photosDescription.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                        />
                        <div className=" gap-1 md:gap-2 hidden md:flex">
                          <h2 className="bg-green-500 text-[14px] md:text-[15px] text-white px-4 pt-2">
                            {data.category}
                          </h2>
                          <div className="text-[12px] flex flex-col justify-center">
                            <p>{formatDate(data.createdAt)}</p>
                            <p>ចំនួនមតិ 0</p>
                          </div>
                        </div>
                        <h3 className="pb-2 px-4 text-[14px] md:text-[15px] text-wrap">
                          {data.title.length > 75
                            ? `${data.title.substring(0, 75)}...`
                            : data.title}
                        </h3>
                      </Link>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Life;
