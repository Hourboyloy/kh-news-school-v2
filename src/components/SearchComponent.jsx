import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import "../css/LoadingSearch.css";

const SearchComponent = ({ toggleSideMenu, isSideMenu }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(null);
  const searchRef = useRef(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm == "") {
      return;
    }
    setSearchNotFound(null);
    setSearchResults([]);
    setLoading(true);

    try {
      const res = await axios.post(
        "https://api-news-dot-school-version2.vercel.app/search-news",
        { searchInput: searchTerm }
      );
      if (res.status === 200) {
        if (res.data.data.length > 0) {
          setSearchResults(res.data.data);
        } else {
          setSearchNotFound("Search not found");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchResults([]);
      setSearchNotFound(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-30 xl:w-[400px] lg:w-[360px]" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <input
          className="bg-gray-50 w-full py-2 pl-4 pr-11 rounded-md focus:outline-none focus:border-gray-300 transition duration-100 ease-in-out border border-gray-200 text-gray-700"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onFocus={() => searchTerm && setSearchResults(searchResults)}
        />

        <button disabled={loading} type="submit" className="cursor-pointer">
          {loading ? (
            <div className="loader absolute top-[10px] right-3 text-gray-500"></div>
          ) : (
            <Search className="absolute top-2 right-3 text-gray-500" />
          )}
        </button>
      </form>

      {searchResults?.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full max-h-[400px] overflow-y-auto z-50">
          {searchResults.map((result, index) => (
            <li
              onClick={() => {
                if (isSideMenu) {
                  toggleSideMenu();
                }
              }}
              key={index}
              className="p-2 hover:bg-gray-100 flex items-center"
            >
              <Link
                href={`/article/${result._id}`}
                className="flex md:flex-row flex-col items-center space-y-2 md:space-y-0"
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                }}
              >
                {result.photosDescription.length > 0 && (
                  <Image
                    src={
                      result.photosDescription.length > 0 &&
                      result.photosDescription.find(
                        (photoObj) => photoObj.photo && photoObj.photo !== ""
                      )?.photo
                    }
                    alt={result.title}
                    width={100}
                    height={50}
                    className="h-full md:w-auto w-full object-center object-cover md:mr-3"
                  />
                )}
                <span>
                  {result?.title.length > 70
                    ? result.title.slice(0, 70) + "..."
                    : result.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {searchNotFound !== null && (
        <p className="absolute flex items-center pl-4 bg-white border border-gray-300 rounded-md mt-1 w-full h-[40px] overflow-y-auto z-50">
          {searchNotFound}
        </p>
      )}
    </div>
  );
};

export default SearchComponent;
