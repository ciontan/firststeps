import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <div className="relative w-full px-3 py-1 mt-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
        placeholder="What are you looking for today?"
        className="peer w-full pl-10 pr-4 py-2 font-wix text-brown border-none rounded-full bg-gray-100 shadow-sm focus:outline-none transition-all duration-300 placeholder-[#CCCCCC]"
      />
      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#CCCCCC] pointer-events-none peer-focus:text-brown" />
    </div>
  );
};

export default SearchBar;
