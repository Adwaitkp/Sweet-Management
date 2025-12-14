import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Sweets({ onLogout }) {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Admin form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Edit modal state
  const [editingSweet, setEditingSweet] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  // Check if user is admin from localStorage
  const isAdmin = localStorage.getItem("role") === "admin";

  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  const searchSweets = async () => {
    const params = new URLSearchParams();
    if (search) params.append("name", search);
    if (filterCategory) params.append("category", filterCategory);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    const res = await api.get(`/sweets/search?${params.toString()}`);
    setSweets(res.data);
  };

  const purchase = async (id) => {
    await api.post(`/sweets/${id}/purchase`);
    loadSweets();
  };

  const deleteSweet = async (id) => {
    await api.delete(`/sweets/${id}`);
    loadSweets();
  };

  const restockSweet = async (id) => {
    await api.post(`/sweets/${id}/restock`, { amount: 10 });
    loadSweets();
  };

  const openEditModal = (sweet) => {
    setEditingSweet(sweet);
    setEditName(sweet.name);
    setEditCategory(sweet.category);
    setEditPrice(sweet.price);
    setEditQuantity(sweet.quantity);
  };

  const updateSweet = async () => {
    await api.put(`/sweets/${editingSweet.id}`, {
      name: editName,
      category: editCategory,
      price: Number(editPrice),
      quantity: Number(editQuantity),
    });
    setEditingSweet(null);
    loadSweets();
  };

  const addSweet = async () => {
    await api.post("/sweets", {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
    });
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    loadSweets();
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍬</span>
            <h1 className="text-2xl font-bold text-gray-800">Sweet Shop</h1>
            {isAdmin && (
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">Admin</span>
            )}
          </div>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
            onClick={onLogout}
        >
          Logout
        </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* SEARCH */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex gap-3 flex-wrap">
            <input
              className="flex-1 min-w-48 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className="w-36 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            />
            <input
              className="w-28 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Min ₹"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="w-28 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Max ₹"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition"
              onClick={searchSweets}
            >
              Search
            </button>
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
              onClick={() => { setSearch(""); setFilterCategory(""); setMinPrice(""); setMaxPrice(""); loadSweets(); }}
            >
              Clear
            </button>
          </div>
        </div>

      {/* ADMIN ADD SWEET */}
      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">➕ Add New Sweet</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
              placeholder="Sweet name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <input 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
              placeholder="Category" 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
            />
            <input 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
              placeholder="Price (₹)" 
              type="number"
              value={price} 
              onChange={e => setPrice(e.target.value)} 
            />
            <input 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
              placeholder="Quantity" 
              type="number"
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
            />
          </div>
          <button 
            className="mt-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition"
            onClick={addSweet}
          >
            Add Sweet
          </button>
        </div>
      )}

      {/* SWEETS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sweets.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            <span className="text-5xl block mb-4">🍭</span>
            No sweets found. {isAdmin && "Add some sweets above!"}
          </div>
        ) : (
          sweets.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="bg-linear-to-r from-pink-400 to-purple-500 h-24 flex items-center justify-center">
                <span className="text-5xl">🍬</span>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{s.name}</h2>
                <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full mt-1">
                  {s.category}
                </span>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold text-gray-800">₹{s.price}</span>
                  <span className={`text-sm font-medium ${s.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {s.quantity > 0 ? `${s.quantity} in stock` : 'Out of stock'}
                  </span>
                </div>

                <button
                  disabled={s.quantity === 0}
                  className="w-full mt-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                  onClick={() => purchase(s.id)}
                >
                  {s.quantity === 0 ? 'Out of Stock' : 'Purchase'}
                </button>

                {isAdmin && (
                  <div className="flex gap-2 mt-3">
                    <button
                      className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-700 py-2 rounded-lg font-medium transition text-sm"
                      onClick={() => openEditModal(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg font-medium transition text-sm"
                      onClick={() => restockSweet(s.id)}
                    >
                      +10 Stock
                    </button>
                    <button
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg font-medium transition text-sm"
                      onClick={() => deleteSweet(s.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      </main>

      {/* EDIT MODAL */}
      {editingSweet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">✏️ Edit Sweet</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  value={editName} 
                  onChange={e => setEditName(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  value={editCategory} 
                  onChange={e => setEditCategory(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  type="number"
                  value={editPrice} 
                  onChange={e => setEditPrice(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  type="number"
                  value={editQuantity} 
                  onChange={e => setEditQuantity(e.target.value)} 
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                className="flex-1 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-lg font-medium transition"
                onClick={updateSweet}
              >
                Save Changes
              </button>
              <button 
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition"
                onClick={() => setEditingSweet(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
