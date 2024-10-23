import Link from "next/link";

function Navbar() {
  return (
    <div className="bg-teal-50 shadow-md">
      <nav className="navbar container mx-auto flex items-center justify-between p-4 lg:p-6">
        {/* Logo */}
        <div className="text-xl font-bold text-teal-600">
          <Link href="/">
            web
          </Link>
        </div>

        {/*Menu Icon */}
        <div className="">
          <button className="text-gray-700 flex-1 focus:outline-none focus:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="hidden lg:flex flex-1 space-x-8 text-gray-700">
          <li className="nav-item">
            <Link href="/home" className="nav-link hover:text-teal-600 transition duration-300 ease-in-out">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/movies" className="nav-link hover:text-teal-600 transition duration-300 ease-in-out">Movies</Link>
          </li>
          <li className="nav-item">
            <Link href="/tv-series" className="nav-link hover:text-teal-600 transition duration-300 ease-in-out">TV Series</Link>
          </li>
          <li className="nav-item">
            <Link href="/most-popular" className="nav-link hover:text-teal-600 transition duration-300 ease-in-out">Most Popular</Link>
          </li>
          <li className="nav-item">
            <Link href="/top-airing" className="nav-link hover:text-teal-600 transition duration-300 ease-in-out">Top Airing</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
