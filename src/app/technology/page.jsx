"use client";
import Container from "../../components/Container";
import { truncateText2 } from "../../utils/truncateText2";
import { truncateText4 } from "../../utils/truncateText4";
import { truncateText5 } from "../../utils/truncateText5";
import Image from "next/image";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import LoadingSkeletonForCategories from "../../components/LoadingSkeletonForCategories";

const TechnologyPage = () => {
  const {
    technology,
    setTechnology,
    endIndexForTechnology,
    setEndIndexForTechnology,
    LengthOfCategories,
    currentPageTechnology,
    setCurrentPagePageTechnology,
  } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [toggleCardsCategories, setToggleCardsCategories] = useState(true);

  const itemsPerPage = 23;
  const totalItems = LengthOfCategories?.lengthOfEntertainment || 0; // Ensure fallback for undefined LengthOfCategories
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Fetch sports articles for pagination
  const handlePaginationTechnology = async (startIndex, endIndex) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://api-news-dot-school-version2.vercel.app/api/categories/${startIndex}/${endIndex}`,
        { categoryname: "បច្ចេកវិទ្យា" }
      );
      if (res.status === 200) {
        
        if (endIndex === 23) {
          // localStorage.setItem("technology", JSON.stringify(res.data.list));
          setTechnology(res.data.list);
          return;
        }
        // const updatedCache = [...technology, ...res.data.list];
        // localStorage.setItem("technology", JSON.stringify(updatedCache));

        setTechnology((prev) => {
          return [...prev, ...res.data.list];
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (endIndexForTechnology === 23 && technology.length === 0) {
      setLoading(true);
      handlePaginationTechnology(0, 23);
    }
  }, []);

  // Handle page changes
  const handlePageChange = (pageNum) => {
    setCurrentPagePageTechnology(pageNum);
    setToggleCardsCategories(true);

    const startIndex = pageNum * itemsPerPage;
    const fetchLimit = startIndex + itemsPerPage;

    // Fetch new items only if they exceed the current endIndex
    if (fetchLimit > endIndexForTechnology) {
      handlePaginationTechnology(endIndexForTechnology, fetchLimit);
      setEndIndexForTechnology(fetchLimit);

      // Cache the new endIndex in localStorage
      // localStorage.setItem("endIndexForTechnology", fetchLimit);
    }
  };

  // Get current page items
  const getCurrentItems = () => {
    const startIndex = currentPageTechnology * itemsPerPage;
    return technology?.slice(startIndex, startIndex + itemsPerPage);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPageTechnology]);

  return (
    <div className="w-full pb-7">
      <Container>
        {/* Header section */}
        <div className="text-white mt-4 mb-2">
          <div className="my-1 flex justify-between items-center">
            <div
              className={`	bg-gray-700  px-8 2xl:pl-4 2xl:pr-14 2xl:py-[0.50rem] py-[0.30rem] relative overflow-hidden flex items-center`}
            >
              <h2 className="2xl:text-[24px] md:text-[20px] text-[18px]">
                បច្ចេកវិទ្យា
              </h2>
              <div
                className="absolute h-full right-0 2xl:border-t-[54px] 2xl:border-l-[45px] 2xl:border-t-white 2xl:border-l-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className={`	bg-gray-700 h-1 md:h-2 w-full`}></div>
        </div>
        {loading ? (
          <LoadingSkeletonForCategories />
        ) : (
          <div>
            {/* Big Section */}
            <div className="flex flex-col lg:flex-row gap-2">
              {/*Grid Card */}
              <div className="hidden md:grid lg:grid-cols-4 md:grid-cols-5 grid-cols-2 gap-2 lg:grid-rows-1 lg:h-[400px] w-full">
                {/* Small Card */}
                <div className="grid lg:col-span-1 md:col-span-2 w-full gap-2">
                  {getCurrentItems()?.length > 0 &&
                    getCurrentItems()?.map(
                      (data, index) =>
                        index < 2 && (
                          <Link
                            href={`/article/${data._id}`}
                            key={index}
                            className="rounded overflow-hidden"
                          >
                            <div className="h-[100px] md:h-[200px]  w-full relative rounded overflow-hidden shadow">
                              <Image
                                src={
                                  data.photosDescription?.length > 0 &&
                                  data.photosDescription.find(
                                    (photoObj) =>
                                      photoObj.photo && photoObj.photo !== ""
                                  )?.photo
                                }
                                width={1000}
                                height={1000}
                                alt="Image"
                                className="w-full h-full object-cover object-center rounded"
                              />
                              <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-45 text-gray-100">
                                <h3 className="xl:text-[16px] text-[13px] py-2 px-2">
                                  {truncateText5(`${data.title}`)}
                                </h3>
                              </div>
                            </div>
                          </Link>
                        )
                    )}
                </div>

                {/* Big Card */}
                <div className="grid lg:col-span-2 md:col-span-3 gap-2">
                  {getCurrentItems()?.length > 0 &&
                    getCurrentItems().map(
                      (data, index) =>
                        index == 2 && (
                          <Link
                            href={`/article/${data._id}`}
                            key={index}
                            className="relative rounded overflow-hidden shadow"
                          >
                            <Image
                              src={
                                data.photosDescription?.length > 0 &&
                                data.photosDescription.find(
                                  (photoObj) =>
                                    photoObj.photo && photoObj.photo !== ""
                                )?.photo
                              }
                              width={1000}
                              height={1000}
                              alt="Image"
                              className="w-full h-full object-cover object-center"
                            />

                            <div className="bg-black text-white absolute bottom-0 w-full bg-opacity-45">
                              <div className="py-2 px-2 space-y-2">
                                <h2 className="xl:text-[22px] lg:text-[18px] text-[15px] text-center">
                                  {truncateText2(`${data.title}`)}
                                </h2>
                                <p className="xl:text-[16px] lg:text-[13px] text-[13px] hidden md:block">
                                  {truncateText4(`${data.title}`)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        )
                    )}
                </div>

                {/* Small Card */}
                <div className="hidden lg:grid lg:col-span-1 md:col-span-5 gap-2">
                  <div className="grid lg:grid-cols-1 md:grid-cols-3 grid-cols-2 lg:grid-rows-4 gap-2 lg:h-[400px]">
                    {getCurrentItems()?.length > 0 &&
                      getCurrentItems().map(
                        (data, index) =>
                          index > 2 &&
                          index < 7 && (
                            <Link
                              href={`/article/${data._id}`}
                              key={index}
                              className="flex lg:flex-row flex-col gap-1 rounded shadow overflow-hidden h-full"
                            >
                              <Image
                                src={
                                  data.photosDescription?.length > 0 &&
                                  data.photosDescription.find(
                                    (photoObj) =>
                                      photoObj.photo && photoObj.photo !== ""
                                  )?.photo
                                }
                                width={1000}
                                height={1000}
                                alt="Image"
                                className="lg:w-[50%] h-[140px] object-cover object-center lg:h-full overflow-hidden"
                              />
                              <h3 className="xl:text-[16px] lg:text-[13px] text-[16px] lg:w-[60%] py-2 px-2 flex items-center">
                                {truncateText5(`${data.title}`)}
                              </h3>
                            </Link>
                          )
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Small Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-2 mt-2 mb-5">
              {getCurrentItems()?.length > 0 &&
                getCurrentItems().map(
                  (data, index) =>
                    index >= 0 &&
                    index < 7 && (
                      <Link
                        href={`/article/${data._id}`}
                        key={index}
                        className="flex md:hidden flex-col gap-1 rounded shadow overflow-hidden h-full"
                      >
                        <Image
                          src={
                            data.photosDescription?.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                          width={1000}
                          height={1000}
                          alt="Image"
                          className="lg:w-[50%] xl:h-[180px] md:h-[160px] h-[130px] object-cover object-center lg:h-full overflow-hidden"
                        />
                        <h3 className="xl:text-[16px] lg:text-[13px] md:text-[16px] text-[13px] lg:w-[60%] py-2 px-2 flex items-center">
                          {truncateText5(`${data.title}`)}
                        </h3>
                      </Link>
                    )
                )}

              {getCurrentItems()?.length > 0 &&
                getCurrentItems().map(
                  (data, index) =>
                    index > 2 &&
                    index < 7 && (
                      <Link
                        href={`/article/${data._id}`}
                        key={index}
                        className="hidden md:flex lg:hidden lg:flex-row flex-col gap-1 rounded shadow overflow-hidden h-full"
                      >
                        <Image
                          src={
                            data.photosDescription.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                          width={1000}
                          height={1000}
                          alt="Image"
                          className="lg:w-[50%] xl:h-[180px] md:h-[160px] h-[130px] object-cover object-center lg:h-full overflow-hidden"
                        />
                        <h3 className="xl:text-[16px] lg:text-[13px] md:text-[16px] text-[13px] lg:w-[60%] py-2 px-2 flex items-center">
                          {truncateText5(`${data.title}`)}
                        </h3>
                      </Link>
                    )
                )}

              {getCurrentItems()?.length > 0 &&
                getCurrentItems().map(
                  (data, index) =>
                    index >= 7 &&
                    index < 23 && (
                      <Link
                        href={`/article/${data._id}`}
                        key={index}
                        className="rounded overflow-hidden shadow"
                      >
                        <Image
                          src={
                            data.photosDescription.length > 0 &&
                            data.photosDescription.find(
                              (photoObj) =>
                                photoObj.photo && photoObj.photo !== ""
                            )?.photo
                          }
                          width={1000}
                          height={1000}
                          alt="Image"
                          className="w-full xl:h-[180px] lg:h-[170px] md:h-[160px] h-[130px] object-cover object-center"
                        />
                        <h3 className="xl:text-[16px] lg:text-[13px] md:text-[16px] text-[13px] py-2 px-2">
                          {truncateText5(`${data.title}`)}
                        </h3>
                      </Link>
                    )
                )}
            </div>
          </div>
        )}
      </Container>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPageTechnology}
        onPageChange={handlePageChange}
        toggleCardsCategories={toggleCardsCategories}
      />
    </div>
  );
};

export default TechnologyPage;
