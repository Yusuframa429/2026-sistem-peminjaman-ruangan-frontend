import { useState } from "react";
import { usePeminjaman } from "../hooks/usePeminjaman";
import { Trash2, CheckCircle, XCircle, ArrowUpDown, Clock, History } from "lucide-react";

export default function DaftarPeminjaman() {
    const {
        data, loading,
        keyword, setKeyword,
        statusFilter, setStatusFilter,
        sortOrder, setSortOrder,
        fetchData, handleDelete, handleStatus
    } = usePeminjaman();

    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    const handleTabChange = (tab: 'active' | 'history') => {
        setActiveTab(tab);
        if (tab === 'active') {
            setStatusFilter("Menunggu");
        } else {
            setStatusFilter("");
        }
    };

    const filteredData = activeTab === 'history'
        ? data.filter(item => item.status !== 'Menunggu')
        : data;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg mb-20 border-t-4 border-blue-600">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    📅 Dashboard Peminjaman
                </h2>
                <div className="flex bg-gray-100 p-1 rounded-lg mt-4 md:mt-0">
                    <button
                        onClick={() => handleTabChange('active')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'active'
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Clock size={16} /> Perlu Diproses
                    </button>
                    <button
                        onClick={() => handleTabChange('history')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'history'
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <History size={16} /> Riwayat Arsip
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        placeholder="🔍 Cari nama peminjam / keperluan..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button onClick={fetchData} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                        Cari
                    </button>
                </div>
                {activeTab === 'history' && (
                    <div className="relative w-full md:w-48">
                        <select
                            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">📂 Semua Arsip</option>
                            <option value="Disetujui">✅ Disetujui</option>
                            <option value="Ditolak">❌ Ditolak</option>
                        </select>
                    </div>
                )}
                <div className="relative w-full md:w-48">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <ArrowUpDown className="text-gray-400" size={16} />
                    </div>
                    <select
                        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">📅 Terbaru</option>
                        <option value="terlama">📅 Terlama</option>
                        <option value="nama_az">🔤 Nama (A-Z)</option>
                        <option value="nama_za">🔤 Nama (Z-A)</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="p-4">Peminjam</th>
                            <th className="p-4">Ruangan</th>
                            <th className="p-4">Tanggal & Keperluan</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500 animate-pulse">Sedang memuat data...</td></tr>
                        ) : filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center flex flex-col items-center justify-center text-gray-400">
                                    <span className="text-4xl mb-2">📭</span>
                                    {activeTab === 'active' ? "Tidak ada permohonan baru." : "Belum ada riwayat peminjaman."}
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50 transition duration-150">
                                    <td className="p-4 font-semibold text-gray-800">
                                        {item.namaPeminjam}
                                    </td>
                                    <td className="p-4 text-gray-600 font-medium">{item.ruangan}</td>
                                    <td className="p-4">
                                        <div className="text-sm font-bold text-gray-700">
                                            {new Date(item.tanggalPeminjaman).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 italic">"{item.keperluan}"</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                        ${item.status === 'Disetujui' ? 'bg-green-100 text-green-800 border-green-200' :
                                                item.status === 'Ditolak' ? 'bg-red-100 text-red-800 border-red-200' :
                                                    'bg-yellow-100 text-yellow-800 border-yellow-200'}`}>
                                            {item.status === 'Menunggu' ? '⏳ Menunggu' : item.status === 'Disetujui' ? '✅ Disetujui' : '❌ Ditolak'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            {activeTab === 'active' && (
                                                <>
                                                    <button onClick={() => handleStatus(item.id, "Disetujui")} title="Setujui" className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition shadow-sm border border-green-200">
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button onClick={() => handleStatus(item.id, "Ditolak")} title="Tolak" className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition shadow-sm border border-red-200">
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                            <button onClick={() => handleDelete(item.id)} title="Hapus Data" className="p-2 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-lg transition ml-2 border border-gray-200">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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