function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white" style={{backgroundImage:"url('https://wallpapergod.com/images/hd/dark-anime-1920X1200-wallpaper-hap3kxf8czba91pc.jpeg')",backgroundSize: "cover",
      backgroundPosition: "center",}}>
      <div className="p-10">
        <h1 className="flex justify-center font-bold text-6xl mb-8">ANIME HUB</h1>
        <div className=" flex justify-center w-full mb-5">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for anime..."
          className="w-96 px-4 py-2 mt-3 mb-3 rounded-l-lg border focus:outline-none bg-transparent border-white"
        />
        <button className="mt-3 mb-3 bg-white px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197M16.804 15.804A7.5 7.5 0 1111.196 5.196a7.5 7.5 0 015.608 10.608z"
            />
          </svg>
        </button>
          </div>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Find your favorite anime shows and movies. Immerse yourself in the world of captivating stories and stunning animation. 
        </p>
        <div className="flex justify-center">
        <button className='bg-white text-black px-3 py-3 rounded-lg font-bold hover:bg-black hover:text-white hover:border hover:border-white-500' >
          Watch Anime
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default Page;