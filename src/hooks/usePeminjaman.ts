
import { useState, useEffect } from "react";
import { peminjamanService } from "../services/peminjamanService";
import { type Peminjaman } from "../types";

export const usePeminjaman = () => {
    const [data, setData] = useState<Peminjaman[]>([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await peminjamanService.getAll({
                search: keyword,
                status: statusFilter,
                sort: sortOrder
            });
            setData(result);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [statusFilter, sortOrder]);

    const handleDelete = async (id: number) => {
        if (window.confirm("Yakin mau hapus data ini?")) {
            try {
                await peminjamanService.delete(id);
                fetchData();
            } catch (error) {
                alert("Gagal menghapus data!");
            }
        }
    };

    const handleStatus = async (id: number, statusBaru: string) => {
        try {
            await peminjamanService.updateStatus(id, statusBaru);
            fetchData(); // Refresh data setelah update
        } catch (error) {
            alert("Gagal update status!");
        }
    };

    return {
        data,
        loading,
        keyword, setKeyword,
        statusFilter, setStatusFilter,
        sortOrder, setSortOrder,
        fetchData,
        handleDelete,
        handleStatus
    };
};