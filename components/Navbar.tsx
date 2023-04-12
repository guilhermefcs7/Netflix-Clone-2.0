import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);

  const [accountMenuIsVisible, setAccountMenuIsVisible] = useState(false);

  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuIsVisible((currentToggle) => !currentToggle);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setAccountMenuIsVisible((currentToggle) => !currentToggle);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        } `}>
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Movies" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>

        <div
          className="lg:hidden flex flex-row items-center gap-2 ml-8  cursor-pointer relative"
          onClick={toggleMobileMenu}>
          <p className="text-white text-sm">Browse</p>

          <BsChevronDown
            className={`text-white transition ${
              mobileMenuIsVisible ? "rotate-180" : "rotate-0"
            }`}
          />

          <MobileMenu visible={mobileMenuIsVisible} />
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>

          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>

          <div
            className="flex flex-row items-center gap-2 cursor-pointer relative"
            onClick={toggleAccountMenu}>
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img
                src="/images/default-profile-pic.png"
                alt="Default Profile Pic"
              />
            </div>

            <BsChevronDown
              className={`text-white transition ${
                accountMenuIsVisible ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={accountMenuIsVisible} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
