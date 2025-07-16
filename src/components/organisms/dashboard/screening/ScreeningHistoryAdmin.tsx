"use client";

import { useEffect, useState } from "react";
import { fetchAllScreeningHistory } from "@/lib/screeningDass";

export default function ScreeningHistoryAdmin() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllScreeningHistory()
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Riwayat Skrining Seluruh Pengguna</h2>
      {loading ? (
        <p className="text-center">Memuat data...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada riwayat yang tersedia.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item, i) => (
            <li
              key={i}
              className="p-4 border rounded-lg bg-white shadow flex flex-col sm:flex-row sm:justify-between sm:items-start"
            >
              <div className="mb-2">
                <p className="font-semibold">Nama Pengguna: {item.user?.name || "-"}</p>
                <p>Email: {item.user?.email || "-"}</p>
                <p>Tanggal: {new Date(item.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p>Depresi: {item.depresi_score} ({item.depresi_level})</p>
                <p>Kecemasan: {item.kecemasan_score} ({item.kecemasan_level})</p>
                <p>Stres: {item.stres_score} ({item.stres_level})</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
