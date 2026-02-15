import DaftarPeminjaman from "./components/DaftarPeminjaman";
import FormPeminjaman from "./components/FormPeminjaman"; // Import Form yang baru dibuat

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-10">
        Sistem Peminjaman Ruangan 🏢
      </h1>

      {/* 1. Tampilkan Form Input di Atas */}
      <FormPeminjaman />

      {/* 2. Tampilkan Tabel Data di Bawah */}
      <DaftarPeminjaman />
    </div>
  );
}

export default App;