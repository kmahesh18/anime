import Link from "next/link";

function Navbar() {
  return (
    <div className="bg-black shadow-md">
      <div className="container  flex items-center justify-between py-4 lg:py-6">
        <div className="flex items-center">
          <button className="text-white focus:outline-none focus:text-gray-300 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="text-xl font-bold text-white">
            <Link href="/" className="hover:text-gray-300 transition duration-300 ease-in-out">ANIME</Link>
          </div>
        </div>
        <nav className="hidden lg:flex flex-1 justify-center space-x-10 ">
          <ul className="mx-auto flex items-center space-x-8 text-white">
            <li className="nav-item">
              <Link href="/home" className="hover:text-gray-300 transition duration-300 ease-in-out px-10">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/movies" className="hover:text-gray-300 transition duration-300 ease-in-out px-10">Movies</Link>
            </li>
            <li className="nav-item">
              <Link href="/tv-series" className="hover:text-gray-300 transition duration-300 ease-in-out px-10">TV Series</Link>
            </li>
            <li className="nav-item">
              <Link href="/most-popular" className="hover:text-gray-300 transition duration-300 ease-in-out px-10">Most Popular</Link>
            </li>
            <li className="nav-item">
              <Link href="/top-airing" className="hover:text-gray-300 transition duration-300 ease-in-out">Top Airing</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
