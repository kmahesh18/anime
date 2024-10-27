"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "unset" : "hidden";
  };

  return (
    <div className="bg-black shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left section with menu icon and logo */}
          <div className="flex items-center justify-start flex-grow-0 space-x-4">
       <button
  onClick={toggleMenu}
  className={`rounded-lg text-gray-400 transition duration-200 ${
    isMenuOpen 
      ? 'hover:text-white bg-transparent'  // Transparent background when menu is open
      : 'hover:text-white hover:bg-transparent' 
  } focus:outline-none focus:ring-2`}
  aria-label="Toggle menu"
>
  {isMenuOpen ? (
    <X className="w-6 h-6" />
  ) : (
    <Menu className="w-6 h-6" />
  )}
</button>


            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-white tracking-tight hover:text-gray-300 transition duration-200">
                ANIME HUB
              </span>
            </Link>
          </div>

          {/* Center navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center space-x-10">
              {[
                { href: "/home", label: "Home" },
                { href: "/movies", label: "Movies" },
                { href: "/top-airing", label: "Top Airing" },
                {href:"/genre",label:"Explore"},
                { href: "/most-popular", label: "Most Popular" },
                { href: "/anime-list", label: "List of Anime" }
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="px-4 py-2 font-extrabold text-[20px] text-white hover:text-gray-300 hover:bg-gray-800 rounded-lg transition duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Placeholder for future elements */}
          <div className="w-40 flex justify-end"></div>
        </div>
      </div>

      {/* Mobile menu with backdrop blur */}
      <div
        className={`
          fixed inset-0 z-40
          ${isMenuOpen ? "visible" : "invisible"}
          transition-all duration-300
        `}
        onClick={toggleMenu}
      >
        <div
          className={`
            absolute inset-0 bg-black/30 backdrop-blur-sm
            ${isMenuOpen ? "opacity-500" : "opacity-0"}
            transition-opacity duration-300
          `}
        />

        <div
          className={`
            absolute inset-y-0 left-0 w-72 bg-transparent backdrop-md
            transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out 
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex-1 py-6 space-y-1 ml-5 mt-2">
            {[
              { href: "/home", label: "Home" },
              { href: "/movies", label: "Movies" },
              { href: "/most-popular", label: "Most Popular" },
              { href: "/top-airing", label: "Top Airing" },
              {href:"anime-list",label:"List of Anime "},
              {href:"/genre",label:"Explore"},
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/help", label: "Help" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-5 py-2 text-base font-bold text-[23] text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition duration-200"
                onClick={toggleMenu}
              >
                {item.label}
                
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
