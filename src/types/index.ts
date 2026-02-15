export interface Peminjaman {
  id: number;
  namaPeminjam: string;
  ruangan: string;
  tanggalPeminjaman: string;
  keperluan: string;
  status: string;
}

export interface CreatePeminjamanDto {
  namaPeminjam: string;
  ruangan: string;
  tanggalPeminjaman: string;
  keperluan: string;
}