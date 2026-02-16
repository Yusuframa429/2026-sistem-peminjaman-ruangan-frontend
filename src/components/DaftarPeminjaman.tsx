import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import type { Peminjaman } from "../types";
import { Trash2, CheckCircle, XCircle, Filter } from "lucide-react";

export default function DaftarPeminjaman() {
    const [dataPeminjaman, setDataPeminjaman] = useState<Peminjaman[]>([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const fetchData = () => {
        setLoading(true);

        api.get("/Peminjaman", {
            params: {
                q: keyword,
                status: statusFilter
            }
        })
            .then((response) => {
                setDataPeminjaman(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Gagal narik data:", error);
                setLoading(false);
            });
    };

    // Panggil data pertama kali saat halaman dibuka
    useEffect(() => {
        fetchData();
    }, []);

    // Fungsi Hapus
    const handleDelete = async (id: number) => {
        if (window.confirm("Yakin mau hapus data ini?")) {
            try {
                await api.delete(`/Peminjaman/${id}`);
                fetchData();
            } catch (error) {
                alert("Gagal menghapus data!");
            }
        }
    };

    // Fungsi Update Status
    const handleStatus = async (id: number, statusBaru: string) => {
        try {
            await api.put(`/Peminjaman/${id}/status`, JSON.stringify(statusBaru), {
                headers: { "Content-Type": "application/json" },
            });
            fetchData();
        } catch (error) {
            alert("Gagal update status!");
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg mb-20 border-t-4 border-blue-600">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                📅 Daftar Peminjaman Ruangan
            </h2>

            {/* --- AREA PENCARIAN & FILTER --- */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="🔍 Cari nama peminjam atau keperluan..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                {/* Dropdown Filter Status */}
                <div className="relative">
                    <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                    <select
                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Semua Status</option>
                        <option value="Menunggu">⏳ Menunggu</option>
                        <option value="Disetujui">✅ Disetujui</option>
                        <option value="Ditolak">❌ Ditolak</option>
                    </select>
                </div>

                {/* Tombol Cari */}
                <button
                    onClick={fetchData}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-bold transition"
                >
                    Cari Data
                </button>
            </div>

            {/* --- TABEL DATA --- */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3 text-left">Peminjam</th>
                            <th className="p-3 text-left">Ruangan</th>
                            <th className="p-3 text-left">Tanggal</th>
                            <th className="p-3 text-left">Keperluan</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="p-5 text-center">Sedang mencari...</td></tr>
                        ) : dataPeminjaman.length === 0 ? (
                            <tr><td colSpan={6} className="p-5 text-center text-gray-500">Data tidak ditemukan.</td></tr>
                        ) : (
                            dataPeminjaman.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-blue-50 transition">
                                    <td className="p-3 font-semibold">{item.namaPeminjam}</td>
                                    <td className="p-3">{item.ruangan}</td>
                                    <td className="p-3 text-sm">{new Date(item.tanggalPeminjaman).toLocaleDateString()}</td>
                                    <td className="p-3 text-sm text-gray-600">{item.keperluan}</td>

                                    <td className="p-3 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border 
                                        ${item.status === 'Disetujui' ? 'bg-green-100 text-green-700 border-green-200' :
                                                item.status === 'Ditolak' ? 'bg-red-100 text-red-700 border-red-200' :
                                                    'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center flex justify-center gap-2">
                                        <button onClick={() => handleStatus(item.id, "Disetujui")} className="text-green-600 hover:text-green-800" title="Terima"><CheckCircle size={20} /></button>
                                        <button onClick={() => handleStatus(item.id, "Ditolak")} className="text-red-600 hover:text-red-800" title="Tolak"><XCircle size={20} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 ml-2" title="Hapus"><Trash2 size={20} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}