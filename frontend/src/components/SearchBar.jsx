import { useState } from "react";

export default function SearchBar({ onSearch, onClear, isAdmin, onAddClick }) {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onSearch({ search, filterCategory, minPrice, maxPrice });
  };

  const handleClear = () => {
    setSearch("");
    setFilterCategory("");
    setMinPrice("");
    setMaxPrice("");
    onClear();
  };

  return (
    <div className="flex gap-3 items-center mb-6">
      <div className="flex-1 bg-white rounded-lg shadow-sm px-3 py-2">
        <div className="flex gap-2 flex-wrap items-center">
          <input
            className="flex-1 min-w-40 px-3 py-1.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className="w-28 px-3 py-1.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
            placeholder="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <input
            className="w-20 px-3 py-1.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Min ₹"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            className="w-20 px-3 py-1.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Max ₹"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md font-medium transition text-sm"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md font-medium transition text-sm"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      
      {isAdmin && (
        <button
          className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition shadow-sm whitespace-nowrap text-sm"
          onClick={onAddClick}
        >
           Add Sweet
        </button>
      )}
    </div>
  );
}
