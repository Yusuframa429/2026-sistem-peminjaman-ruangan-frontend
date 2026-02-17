
import api from "../api/axiosInstance";
import { type Peminjaman } from "../types";

interface FetchParams {
    search?: string;
    status?: string;
    sort?: string;
}

export const peminjamanService = {
    getAll: async (params: FetchParams) => {
        const response = await api.get<Peminjaman[]>("/Peminjaman", { params });
        return response.data;
    },
    delete: async (id: number) => {
        await api.delete(`/Peminjaman/${id}`);
    },
    updateStatus: async (id: number, status: string) => {
        await api.put(`/Peminjaman/${id}/status`, JSON.stringify(status), {
            headers: { "Content-Type": "application/json" },
        });
    }
};