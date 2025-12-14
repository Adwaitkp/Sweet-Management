export default function Header({ isAdmin, onLogout }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-3xl"></span>
          <h1 className="text-2xl font-bold text-gray-800">Sweet Shop</h1>
          {isAdmin && (
            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
              Admin
            </span>
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
  );
}
