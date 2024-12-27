"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import Container from "../components/Container";
import Entertainment from "../components/Entertainment";
import Life from "../components/Life";
import Slide from "../components/Slide";
import Sport from "../components/Sport";
import LoadingSkeletonForHome from "../components/LoadingSkeletonForHome";

export default function Home() {
  const { isLoading, newestArticles, newsByCategoryInHome } =
    useGlobalContext();

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingSkeletonForHome />
      ) : (
        <section className="w-full mt-2 lg:mt-0">
          <Container>
            <Slide newestArticles={newestArticles} />
            <Entertainment newsByCategoryInHome={newsByCategoryInHome} />
            <Sport newsByCategoryInHome={newsByCategoryInHome} />
            <Life newsByCategoryInHome={newsByCategoryInHome} />
          </Container>
        </section>
      )}
    </div>
  );
}
