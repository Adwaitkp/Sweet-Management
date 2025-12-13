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
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Sweet Shop</h1>
        <button
          className="bg-red-600 text-white px-3 py-1"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          className="border p-2 flex-1"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="border p-2 w-32"
          placeholder="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <input
          className="border p-2 w-24"
          placeholder="Min ₹"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="border p-2 w-24"
          placeholder="Max ₹"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4"
          onClick={searchSweets}
        >
          Search
        </button>
        <button
          className="bg-gray-400 text-white px-4"
          onClick={() => { setSearch(""); setFilterCategory(""); setMinPrice(""); setMaxPrice(""); loadSweets(); }}
        >
          Clear
        </button>
      </div>

      {/* ADMIN ADD SWEET */}
      {isAdmin && (
        <div className="border p-4 mb-6">
          <h2 className="font-bold mb-2">Add Sweet (Admin)</h2>
          <div className="grid grid-cols-4 gap-2">
            <input className="border p-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input className="border p-2" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <input className="border p-2" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <input className="border p-2" placeholder="Qty" value={quantity} onChange={e => setQuantity(e.target.value)} />
          </div>
          <button className="bg-blue-600 text-white px-4 py-1 mt-2" onClick={addSweet}>
            Add Sweet
          </button>
        </div>
      )}

      {/* SWEETS LIST */}
      <div className="grid grid-cols-3 gap-4">
        {sweets.map((s) => (
          <div key={s.id} className="border p-3">
            <h2 className="font-bold">{s.name}</h2>
            <p>Category: {s.category}</p>
            <p>Price: ₹{s.price}</p>
            <p>Qty: {s.quantity}</p>

            <button
              disabled={s.quantity === 0}
              className="bg-blue-600 text-white px-2 py-1 mt-2 disabled:bg-gray-400"
              onClick={() => purchase(s.id)}
            >
              Purchase
            </button>

            {isAdmin && (
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-600 text-white px-2 py-1"
                  onClick={() => openEditModal(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-purple-600 text-white px-2 py-1"
                  onClick={() => restockSweet(s.id)}
                >
                  Restock
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1"
                  onClick={() => deleteSweet(s.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingSweet && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 w-96">
            <h2 className="font-bold mb-4">Edit Sweet</h2>
            <div className="space-y-2">
              <input className="border p-2 w-full" placeholder="Name" value={editName} onChange={e => setEditName(e.target.value)} />
              <input className="border p-2 w-full" placeholder="Category" value={editCategory} onChange={e => setEditCategory(e.target.value)} />
              <input className="border p-2 w-full" placeholder="Price" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
              <input className="border p-2 w-full" placeholder="Quantity" value={editQuantity} onChange={e => setEditQuantity(e.target.value)} />
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2" onClick={updateSweet}>
                Save
              </button>
              <button className="bg-gray-400 text-white px-4 py-2" onClick={() => setEditingSweet(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
