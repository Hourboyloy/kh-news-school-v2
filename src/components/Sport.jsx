"use client";
import React from "react";
import HeaderSection from "./HeaderSection";
import Image from "next/image";
import Link from "next/link";
import { truncateText } from "../utils/truncateText";
import { truncateText2 } from "../utils/truncateText2";
import { formatDate } from "../utils/formatDate";

const Sport = ({ newsByCategoryInHome }) => {
  return (
    <div className="space-y-3 mt-2">
      <div
        className={`${newsByCategoryInHome?.sports?.length <= 0 && "hidden"}`}
      >
        <HeaderSection
          title={"កីឡា"}
          textColor={"text-red-600"}
          bgColor={"bg-red-500"}
          label={"/sport"}
        />
      </div>
      <div className="grid gap-2">
        {/* Big Card */}
        {/* <div className="hidden lg:grid grid-cols-3 gap-2.5 mb-3">
          {newsByCategory?.sports?.length > 0 &&
            newsByCategory?.sports?.map(
              (data, index) =>
                index < 3 && (
                  <Link
                    href={`/article/${data._id}`}
                    key={index}
                    className="rounded-md overflow-hidden shadow-lg space-y-2"
                  >
                    <Image
                      src={
                        data.photosDescription.length > 0 &&
                        data.photosDescription.find(
                          (photoObj) => photoObj.photo && photoObj.photo !== ""
                        )?.photo
                      }
                      width={400}
                      height={400}
                      alt="Image"
                      className="h-[120px] md:h-[220px] object-cover object-center"
                    />
                    <div className="flex gap-2">
                      <h2 className="bg-red-500 2xl:text-lg lg:text-base text-white flex justify-center items-center px-8">
                        កីឡា
                      </h2>
                      <div className="text-[14px] flex flex-col justify-center">
                        <p>{formatDate(data.createdAt)}</p>
                        <p>ចំនួនមតិ {data.comments.length}</p>
                      </div>
                    </div>
                    <h3 className="pb-2 px-4 text-[14px] md:text-[15px]">
                      {truncateText(`${data.title}`)}
                    </h3>
                  </Link>
                )
            )}
        </div> */}

        <div className="hidden lg:grid grid-cols-3 gap-2.5 mb-3">
          {newsByCategoryInHome?.sports?.length > 0 &&
            newsByCategoryInHome.sports.slice(0, 3).map((data) => {
              // Calculate comment and reply counts
              const commentCount = data.comments?.length || 0;
              const replyCount =
                data.comments?.reduce((total, comment) => {
                  return total + (comment.replies ? comment.replies.length : 0);
                }, 0) || 0;
              const totalCommentsAndReplies = commentCount + replyCount;

              return (
                <Link
                  href={`/article/${data._id}`}
                  key={data._id}
                  className="rounded-md overflow-hidden shadow-lg space-y-2"
                >
                  <Image
                    src={
                      data.photosDescription?.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo || "/fallback-image.jpg"
                    }
                    width={400}
                    height={400}
                    alt={data.title || "Default Image"}
                    className="w-full h-[120px] md:h-[220px] object-cover object-center"
                  />
                  <div className="flex gap-2">
                    <h2 className="bg-red-500 2xl:text-lg lg:text-base text-white flex justify-center items-center px-8">
                      កីឡា
                    </h2>
                    <div className="text-[14px] flex flex-col justify-center">
                      <p>{formatDate(data.createdAt)}</p>
                      <p>ចំនួនមតិ {totalCommentsAndReplies}</p>
                    </div>
                  </div>
                  <h3 className="pb-2 px-4 text-[14px] md:text-[15px]">
                    {truncateText(data.title || "No Title")}
                  </h3>
                </Link>
              );
            })}
        </div>

        <div>
          {/* Small Card */}
          <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {newsByCategoryInHome?.sports?.length > 0 &&
              newsByCategoryInHome?.sports?.map(
                (data, index) =>
                  index >= 3 &&
                  index < 11 && (
                    <Link
                      href={`/article/${data._id}`}
                      key={index}
                      className="h-[90px] flex mt-1 md:mt-2 items-center overflow-hidden"
                    >
                      <div className="w-[400px] overflow-hidden flex items-center justify-center">
                        <Image
                          src={
                            data.photosDescription.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                          width={500}
                          height={500}
                          alt="Image"
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="py-2 px-2 text-sm">
                          {truncateText2(`${data.title}`)}
                        </h3>
                      </div>
                    </Link>
                  )
              )}
          </div>

          {/* conbind big and small card */}
          <div className="lg:hidden grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {newsByCategoryInHome?.sports?.length > 0 &&
              newsByCategoryInHome?.sports?.map(
                (data, index) =>
                  index < 10 && (
                    <Link
                      href={`/article/${data._id}`}
                      key={index}
                      className="h-[90px] flex mt-1 md:mt-2 items-center overflow-hidden"
                    >
                      <div className="w-[400px] overflow-hidden flex items-center justify-center">
                        <Image
                          src={
                            data.photosDescription.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                          width={500}
                          height={500}
                          alt="Image"
                          className="w-full h-auto"
                        />
                      </div>
                      <div className="w-full">
                        <h3 className="py-2 px-2 text-sm">
                          {truncateText2(`${data.title}`)}
                        </h3>
                      </div>
                    </Link>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sport;
