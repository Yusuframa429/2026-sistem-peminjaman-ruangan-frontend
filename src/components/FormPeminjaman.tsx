import { useState } from "react";
import api from "../api/axiosInstance";

export default function FormPeminjaman() {
    // State untuk menyimpan data inputan
    const [formData, setFormData] = useState({
        namaPeminjam: "",
        ruangan: "",
        tanggalPeminjaman: "",
        keperluan: "",
    });

    const [loading, setLoading] = useState(false);

    // Fungsi saat mengetik di form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi saat tombol SIMPAN ditekan
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Mencegah reload halaman bawaan browser
        setLoading(true);

        try {
            // Kirim data ke Backend
            await api.post("/Peminjaman", formData);

            alert("✅ Data Berhasil Disimpan!");
            window.location.reload(); // Reload otomatis biar data baru muncul di tabel
        } catch (error) {
            console.error("Gagal simpan:", error);
            alert("❌ Gagal menyimpan data!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg mb-10 border-t-4 border-blue-600">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📝 Form Peminjaman Baru</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input Nama */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Peminjam</label>
                    <input
                        type="text"
                        name="namaPeminjam"
                        required
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                    />
                </div>

                {/* Input Ruangan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ruangan</label>
                    <input
                        type="text"
                        name="ruangan"
                        required
                        placeholder="Contoh: Lab 1, Aula"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                    />
                </div>

                {/* Input Tanggal */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tanggal Peminjaman</label>
                    <input
                        type="date"
                        name="tanggalPeminjaman"
                        required
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                    />
                </div>

                {/* Input Keperluan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Keperluan</label>
                    <input
                        type="text"
                        name="keperluan"
                        required
                        placeholder="Contoh: Rapat Hima, Belajar Kelompok"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                    />
                </div>

                {/* Tombol Simpan */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 text-white font-bold rounded-md transition duration-300 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? "Sedang Menyimpan..." : "Simpan Peminjaman"}
                    </button>
                </div>
            </form>
        </div>
    );
}