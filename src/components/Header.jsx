"use client";
import React, { useState, useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import AuthForm from "@/components/Auth";
import SearchComponent from "./SearchComponent";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import Notification from "./Notifications";
import { FaUser } from "react-icons/fa6";
import { useGlobalContext } from "../context/GlobalContext";
import SideMenu from "../components/SideMenu";

export const navLinks = [
  { label: "ទំព័រដើម", href: "/" },
  { label: "កម្សាន្ត", href: "/entertainment" },
  { label: "កីឡា", href: "/sport" },
  { label: "ជីវិតនិងសង្គម", href: "/life" },
  { label: "បច្ចេកវិទ្យា", href: "/technology" },
  { label: "ជំនឿសាសនា", href: "/religion" },
];

const Header = () => {
  const {
    isLogin,
    handleClearStorage,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    setAuthModalOpen,
  } = useGlobalContext();

  const [notifications, setNotifications] = useState(false);
  const [account, setAccount] = useState(false);
  const [showFixedHeader, setShowFixedHeader] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleNotifications = () => {
    setNotifications(!notifications);
    setAccount(false);
  };
  const toggleAccount = () => {
    setAccount(!account);
    setNotifications(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedHeader(window.scrollY > 47);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav className="w-full z-10 bg-white shadow-md lg:bg-gray-100 lg:shadow-xl lg:border-b lg:py-0 lg:relative fixed top-0 md:py-4 py-3">
        <Container>
          <div className="flex justify-between lg:justify-normal items-center lg:h-12">
            <Link
              href="/"
              className="flex items-center xl:text-3xl lg:text-2xl md:text-3xl text-2xl text-[#FA1939]"
              aria-label="Home"
            >
              <h2 className="bayon">Kh News</h2>
            </Link>
            <button onClick={toggleMobileMenu} className="lg:hidden">
              <IoMenuSharp className="text-3xl text-gray-500" />
            </button>
          </div>
        </Container>
        {/* side nav */}
        <div className="lg:hidden">
          <SideMenu
            isOpen={isMobileMenuOpen}
            toggleSideMenu={toggleMobileMenu}
            isLogin={isLogin}
            handleClearStorage={handleClearStorage}
            openAuthModal={openAuthModal}
          />
        </div>
      </nav>

      <div
        className={`${
          showFixedHeader ? "block h-[73.60px]" : "hidden"
        } hidden lg:block`}
      ></div>

      <header
        className={`${
          showFixedHeader ? "fixed z-20 top-0" : "sticky"
        } bg-white z-10 w-full shadow-md select-none hidden lg:block`}
      >
        <div className="py-4">
          <Container>
            <nav className="flex justify-between items-center">
              <div className="flex gap-20">
                <ul className="text-blue-800 hidden md:flex items-center gap-4">
                  {navLinks.map((link) => (
                    <li className="text-base cursor-pointer" key={link.label}>
                      <Link
                        className="bayon text-xs md:text-xs lg:text-lg xl:text-xl hover:text-blue-600 transition-colors"
                        href={link.href}
                        aria-label={link.label}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <SearchComponent isSideMenu={false} />
                <button
                  onClick={toggleNotifications}
                  className="relative h-[41px] w-[41px] bg-[#E2E5E9] rounded-full transition-all duration-300 hover:bg-[#d6d9dd] flex items-center justify-center outline-none focus:outline-none"
                >
                  <IoMdNotificationsOutline className="text-2xl text-gray-700" />
                  <p className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center p-1.5">
                    99+
                  </p>
                </button>

                <div
                  onClick={toggleAccount}
                  aria-label="Account"
                  className="relative h-[41px] w-[41px] bg-[#E2E5E9] cursor-pointer rounded-full transition-all duration-300 hover:bg-[#d6d9dd] flex items-center justify-center outline-none focus:outline-none"
                >
                  <FaUser className="text-lg text-gray-600" />
                  {account ? (
                    isLogin ? (
                      <div className=" absolute z-10 2xl:-right-6/12 xl:-right-4 -right-[17px] top-16 w-40 bg-white flex flex-col border shadow rounded">
                        <button className="py-2 w-full hover:bg-[#F1F5F9]">
                          ប្រវត្តិរូប
                        </button>
                        <button
                          onClick={handleClearStorage}
                          className="py-2 w-full hover:bg-[#F1F5F9]"
                        >
                          ចេញ
                        </button>
                      </div>
                    ) : (
                      <div className=" absolute z-10 2xl:-right-6/12 xl:-right-4 -right-[17px] top-16 w-40 bg-white flex flex-col border shadow rounded">
                        <button
                          onClick={openAuthModal}
                          className="py-2 w-full hover:bg-[#F1F5F9]"
                        >
                          ចូលគណនី
                        </button>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>

                {notifications && (
                  <div className=" absolute z-10 right-2 top-14">
                    <Notification />
                  </div>
                )}
              </div>
            </nav>
          </Container>
        </div>

        <Dialog open={isAuthModalOpen} onOpenChange={setAuthModalOpen}>
          <DialogContent className="sm:max-w-[425px] p-0">
            <DialogTitle className="hidden"></DialogTitle>
            <div className="px-4 md:px-0">
              <AuthForm closeModal={closeAuthModal} isOpen={isMobileMenuOpen} />
            </div>
          </DialogContent>
        </Dialog>
      </header>
    </div>
  );
};

export default Header;
