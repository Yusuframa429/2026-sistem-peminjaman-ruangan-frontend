// src/services/peminjamanService.ts
import api from "../api/axiosInstance";
import { type Peminjaman } from "../types"; // Pakai 'type' biar aman

// Interface untuk Parameter Pencarian
interface FetchParams {
    search?: string;
    status?: string;
    sort?: string;
}

export const peminjamanService = {
    // 1. Ambil Data (Get All)
    getAll: async (params: FetchParams) => {
        const response = await api.get<Peminjaman[]>("/Peminjaman", { params });
        return response.data;
    },

    // 2. Hapus Data
    delete: async (id: number) => {
        await api.delete(`/Peminjaman/${id}`);
    },

    // 3. Update Status
    updateStatus: async (id: number, status: string) => {
        await api.put(`/Peminjaman/${id}/status`, JSON.stringify(status), {
            headers: { "Content-Type": "application/json" },
        });
    }
};