import React from 'react';

function Page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white backdrop-blur-lg">
      <div className="w-full max-w-4xl px-6 py-12 text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-8">ANIME HUB</h1>
        
        {/* Search Bar */}
        <div className="flex justify-center items-center mb-8">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for anime..."
            className="w-80 px-4 py-2 rounded-l-lg text-black outline-none"
          />
          <button className="bg-white text-black px-4 py-2 rounded-r-lg hover:bg-gray-200 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197M16.804 15.804A7.5 7.5 0 1111.196 5.196a7.5 7.5 0 015.608 10.608z"
              />
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          Find your favorite anime shows and movies. Immerse yourself in the world of captivating stories and stunning animation. 
        </p>

        {/* Watch Anime Button */}
        <button className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
          Watch Anime
        </button>
      </div>
    </div>
  );
}

export default Page;