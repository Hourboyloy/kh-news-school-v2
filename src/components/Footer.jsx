// import React from "react";
// import Container from "./Container";
// import Link from "next/link";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaTelegram,
//   FaTiktok,
//   FaYoutube,
// } from "react-icons/fa";
// import { FaX } from "react-icons/fa6";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white select-none text-xl flex justify-center items-center">
//       <Container>
//         <div className="h-[20vh] justify-center flex flex-col space-y-6">
//           <ul className="flex gap-4 justify-center">
//             <p>No navigation links available</p>
//           </ul>
//           <div className="flex gap-9 justify-center items-center">
//             <Link href="/">
//               <FaFacebook />
//             </Link>
//             <Link href="/">
//               <FaInstagram />
//             </Link>
//             <Link href="/">
//               <FaTelegram />
//             </Link>
//             <Link href="/">
//               <FaX />
//             </Link>
//             <Link href="/">
//               <FaYoutube />
//             </Link>
//             <Link href="/">
//               <FaTiktok />
//             </Link>
//           </div>

//           <p className="flex justify-center text-sm opacity-50">
//             &copy;{new Date().getFullYear()} Khmer News, Inc. All rights
//             reserved.
//           </p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import Container from "./Container";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const items = [
  {
    name: "កីឡា",
    href: "sport",
  },
  {
    name: "កម្សាន្ត",
    href: "/entertainment",
  },
  {
    name: "ជំនឿសាសនា",
    href: "religion",
  },
  {
    name: "ជីវិតនិងសង្គម",
    href: "life",
  },
  {
    name: "បច្ចេកវិទ្យា",
    href: "technology",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white select-none text-xl flex justify-center items-center py-8">
      <Container>
        <div className="justify-center flex flex-col lg:space-y-6 md:space-y-4 space-y-4">
          <ul className="flex gap-4 justify-center">
            {items.map((items, i) => (
              <li key={i}>
                <Link href={`/${items.href}`}>
                  <span className="SFPro lg:text-lg md:text-base text-sm lg:font-bold">
                    {items.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex lg:gap-9 md:gap-6 gap-3 justify-center items-center">
            <Link href="/">
              <FaFacebook />
            </Link>
            <Link href="/">
              <FaInstagram />
            </Link>
            <Link href="/">
              <FaTelegram />
            </Link>
            <Link href="/">
              <FaX />
            </Link>
            <Link href="/">
              <FaYoutube />
            </Link>
            <Link href="/">
              <FaTiktok />
            </Link>
          </div>

          <p className="flex justify-center md:text-sm text-xs opacity-50">
            &copy;{new Date().getFullYear()} Khmer News, Inc. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
