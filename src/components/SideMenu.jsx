// "use client";
// import React from "react";
// import Link from "next/link";
// import { FaTimes } from "react-icons/fa";
// import SearchComponent from "./SearchComponent";

// const SideMenu = ({
//   isOpen,
//   toggleSideMenu,
//   isLogin,
//   handleClearStorage,
//   openAuthModal,
// }) => {
//   const navLinks = [
//     { label: "ទំព័រដើម", href: "/" },
//     { label: "កម្សាន្ត", href: "/entertainment" },
//     { label: "កីឡា", href: "/sport" },
//     { label: "ជីវិតនិងសង្គម", href: "/life" },
//     { label: "បច្ចេកវិទ្យា", href: "/technology" },
//     { label: "ជំនឿសាសនា", href: "/religion" },
//   ];
//   return (
//     <div
//       className={`fixed inset-0 z-30 bg-black bg-opacity-50 ${
//         isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//       }`}
//     >
//       <div
//         className={`fixed top-0 h-[120vh] bg-white shadow-md md:w-7/12 w-9/12 transition-all duration-1000 ease-in-out ${
//           isOpen ? " translate-x-0" : " -translate-x-full"
//           //   ""
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-semibold text-gray-700">Kh news</h2>
//           <button
//             onClick={toggleSideMenu}
//             className="text-gray-500 hover:text-red-500"
//             aria-label="Close menu"
//           >
//             <FaTimes className="text-xl" />
//           </button>
//         </div>

//         <ul className="flex flex-col p-4 space-y-4 select-none focus:outline-none outline-none  overflow-y-auto scroll-smooth">
//           <li className="px-2">
//             <SearchComponent
//               toggleSideMenu={toggleSideMenu}
//               isSideMenu={true}
//             />
//           </li>

//           {navLinks.map((link) => (
//             <li key={link.label}>
//               <Link
//                 href={link.href}
//                 className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100"
//                 aria-label={link.label}
//                 onClick={toggleSideMenu}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}

//           <li className="border border-gray-200"></li>
//           <button
//             onClick={toggleSideMenu}
//             className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100 text-start"
//           >
//             ការជូនដំណឹង <span className=" text-red-600">99+</span>
//           </button>

//           <li>
//             {isLogin ? (
//               <li className="space-y-4 w-full">
//                 <button
//                   onClick={toggleSideMenu}
//                   className="block px-4 border border-red-300 py-2 text-gray-800 rounded hover:bg-gray-100 text-start w-full"
//                 >
//                   ប្រវត្តិរូប
//                 </button>
//                 <button
//                   onClick={() => {
//                     toggleSideMenu();
//                     handleClearStorage();
//                   }}
//                   className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100 text-start w-full"
//                 >
//                   ចេញ
//                 </button>
//               </li>
//             ) : (
//               <button
//                 onClick={() => {
//                   toggleSideMenu();
//                   openAuthModal();
//                 }}
//                 className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100 text-start w-full"
//               >
//                 ចូលគណនី
//               </button>
//             )}
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideMenu;



"use client";
import React from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import SearchComponent from "./SearchComponent";

const SideMenu = ({
  isOpen,
  toggleSideMenu,
  isLogin,
  handleClearStorage,
  openAuthModal,
}) => {
  const navLinks = [
    { label: "ទំព័រដើម", href: "/" },
    { label: "កម្សាន្ត", href: "/entertainment" },
    { label: "កីឡា", href: "/sport" },
    { label: "ជីវិតនិងសង្គម", href: "/life" },
    { label: "បច្ចេកវិទ្យា", href: "/technology" },
    { label: "ជំនឿសាសនា", href: "/religion" },
  ];

  return (
    <div
      className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={toggleSideMenu}
    >
      <div
        className={`fixed top-0 h-[120vh] bg-white shadow-md md:w-7/12 w-9/12 transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl text-red-600">Kh news</h2>
          <button
            onClick={toggleSideMenu}
            className="text-gray-500 hover:text-red-500"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-4 select-none focus:outline-none outline-none overflow-y-auto scroll-smooth">
          <li className="px-2">
            <SearchComponent
              toggleSideMenu={toggleSideMenu}
              isSideMenu={true}
            />
          </li>

          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100"
                aria-label={link.label}
                onClick={toggleSideMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="border border-gray-200"></li>
          <button
            onClick={toggleSideMenu}
            className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100 text-start"
          >
            ការជូនដំណឹង <span className=" text-red-600">99+</span>
          </button>

          <li>
            {isLogin ? (
              <div className="space-y-4 w-full">
                <button
                  onClick={toggleSideMenu}
                  className="block px-4 border border-red-300 py-2 text-gray-800 rounded hover:bg-gray-100 text-start w-full"
                >
                  ប្រវត្តិរូប
                </button>
                <button
                  onClick={() => {
                    toggleSideMenu();
                    handleClearStorage();
                  }}
                  className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100 text-start w-full"
                >
                  ចេញ
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  toggleSideMenu();
                  openAuthModal();
                }}
                className="block px-4 py-2 text-gray-800 rounded hover:bg-gray-100 text-start w-full"
              >
                ចូលគណនី
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;

