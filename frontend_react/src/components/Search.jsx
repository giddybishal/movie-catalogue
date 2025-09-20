function Search({searchTerm, setSearchTerm}){

    return (
        <div className="search bg-[#0f172a] text-white text-base font-normal w-1/2 md:w-1/4 mt-5 p-2 rounded-md">
            <div className="flex gap-5">
                <img src="/search.svg" alt='search'/>

                <input 
                    className="w-full focus:outline-none focus:ring-0 bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent"
                    type="text"
                    placeholder="Any movie you wish to..."
                    value={searchTerm}
                    onChange={e =>setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Search