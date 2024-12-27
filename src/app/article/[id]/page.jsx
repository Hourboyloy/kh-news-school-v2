"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Container from "../../../components/Container";
import CommentSection from "../../../components/CommentSection";
import { truncateText5 } from "../../../utils/truncateText5";
import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import LoadingDetails from "../../../components/LoadingDetails";

const Id = () => {
  const { newestArticles, popularArticles, openAuthModal } = useGlobalContext();
  const [article, setArticle] = useState([]);
  const [login, setlogin] = useState(true);
  const [RelatedArticles, setRelatedArticles] = useState([]);
  const { id } = useParams();

  const getArticleById = async () => {
    try {
      const res = await axios.get(
        `https://news-api-speed.vercel.app/api/get-data/${id}`
      );
      if (res.status === 200) {
        setArticle(res.data.article);
        setRelatedArticles(res.data.relatedArticles);
        setlogin(false);
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getArticleById();
  }, [id]);

  if (login) {
    return (
      <div className="w-full">
        <Container>
          <LoadingDetails />
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full relative bg-[#F6F6F6]">
      <div
        className="bg-cover bg-no-repeat blur-[10px] w-full lg:h-[100vh] h-[50vh] absolute -top-2 left-0"
        style={{
          backgroundImage: `url(${article?.photosDescription[0].photo})`,
        }}
      >
        <div
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background:
              "linear-gradient(to bottom, rgba(246, 246, 246, 0) 0%, #f6f6f6 100%)",
          }}
        ></div>
      </div>

      <div className="my-2 w-full sticky">
        <Container>
          <div className="grid grid-cols-3 gap-4">
            {/* Left */}
            <div className="lg:col-span-2 col-span-3 bg-white xl:p-10 p-6 shadow-md border border-gray-200">
              <div className="mb-3">
                <h2 className="text-base sm:text-xl md:text-2xl text-red-700 pb-2">
                  {article?.title}
                </h2>
                <p className="text-[14px] text-nowrap px-4 pt-1 w-[230px] select-none bg-red-600 text-white">
                  {dayjs(article?.createdAt).format(
                    "DD MMMM YYYY | ម៉ោង HH:mm"
                  )}
                </p>
                <div className="bg-red-600 w-full h-1"></div>
              </div>

              <ul>
                {article?.photosDescription?.length > 0 &&
                  article?.photosDescription?.map((e, index) => (
                    <li key={e + index}>
                      <div className="text-xs md:text-base space-y-2">
                        {e.description !== "" && (
                          <p className="my-4">{e.description}</p>
                        )}
                        <div>
                          {e.photo !== "" && (
                            <Image
                              src={e.photo}
                              width={500}
                              height={400}
                              alt={article.title}
                              className="w-full"
                            />
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>

              <CommentSection
                newsId={id}
                ListComments={article.comments}
                openAuthModal={openAuthModal}
              />
            </div>

            {/* Right */}
            <div className="lg:col-span-1 md:col-span-2 col-span-3 space-y-4">
              <div className="space-y-3 md:space-y-2 bg-white p-2.5 shadow-md border border-gray-200">
                <h2 className="text-red-600 text-2xl">អត្ថបទពេញនិយម</h2>
                {popularArticles?.map(
                  (article, index) =>
                    index < 10 && (
                      <div key={index}>
                        <Link
                          href={`/article/${article._id}`}
                          key={index}
                          className="h-[60px] md:h-[90px] flex items-center"
                        >
                          <Image
                            src={
                              article.photosDescription.length > 0 &&
                              article.photosDescription.find(
                                (photoObj) =>
                                  photoObj.photo && photoObj.photo !== ""
                              )?.photo
                            }
                            width={200}
                            height={200}
                            alt="Image"
                            className="w-[40%] h-full object-cover object-center"
                          />

                          <h3 className="py-2 w-[60%] px-2 text-[14px]">
                            {truncateText5(`${article.title}`)}
                          </h3>
                        </Link>
                      </div>
                    )
                )}
              </div>

              {/* newest */}
              <div className="space-y-3 md:space-y-2 bg-white p-2.5 shadow-md border border-gray-200">
                <h2 className="text-red-600 text-2xl">អត្ថបទថ្មីៗ</h2>
                {newestArticles?.map(
                  (article, index) =>
                    index < 10 && (
                      <div key={index}>
                        <Link
                          href={`/article/${article._id}`}
                          className="h-[60px] md:h-[90px] flex items-center"
                        >
                          <Image
                            src={
                              article.photosDescription.length > 0 &&
                              article.photosDescription.find(
                                (photoObj) =>
                                  photoObj.photo && photoObj.photo !== ""
                              )?.photo
                            }
                            width={200}
                            height={200}
                            alt="Image"
                            className="w-[40%] h-full object-cover object-center"
                          />
                          <h3 className="py-2 w-[60%] px-2 text-[14px]">
                            {truncateText5(`${article.title}`)}
                          </h3>
                        </Link>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="w-full bg-white my-4 lg:p-6 md:p-4 p-3 shadow-md border border-gray-200 space-y-4">
            <div className="space-y-0.5">
              <h2 className="text-gray-600 font-medium text-2xl">
                អត្ថបទទាក់ទង
              </h2>
              <p className="border-2 border-red-500 w-11"></p>
            </div>

            <ul className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-3.5">
              {RelatedArticles?.length > 0 &&
                RelatedArticles.map(
                  (ele, index) =>
                    index < 12 && (
                      <Link
                        href={`${ele._id}`}
                        key={ele + index}
                        className=" focus:outline-none outline-none"
                      >
                        <li className="space-y-1">
                          <div className="w-full">
                            <Image
                              src={
                                ele.photosDescription.length > 0 &&
                                ele.photosDescription.find(
                                  (photoObj) =>
                                    photoObj.photo && photoObj.photo !== ""
                                )?.photo
                              }
                              width={400}
                              height={400}
                              alt="Image"
                              className="w-full h-[110px] md:h-[220px] object-cover object-center"
                            />
                          </div>

                          <h3 className="text-[14px] md:text-[16px] text-gray-800 transition">
                            {ele.title.length > 90
                              ? `${ele.title.substring(0, 90)}...`
                              : ele.title}
                          </h3>
                        </li>
                      </Link>
                    )
                )}
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Id;
