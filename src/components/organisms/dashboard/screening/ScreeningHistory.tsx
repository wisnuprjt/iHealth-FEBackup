"use client";

import { useEffect, useState } from "react";
import { fetchUserScreeningHistory } from "@/lib/screeningDass";

const levelColors: Record<string, string> = {
  "Normal": "bg-green-100 text-green-700",
  "Ringan": "bg-yellow-100 text-yellow-800",
  "Sedang": "bg-orange-100 text-orange-800",
  "Parah": "bg-red-100 text-red-700",
  "Sangat Parah": "bg-red-200 text-red-800 font-bold",
};

const levelEmoji: Record<string, string> = {
  "Normal": "😀",
  "Ringan": "🙂",
  "Sedang": "😐",
  "Parah": "😟",
  "Sangat Parah": "😢",
};

export default function ScreeningHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserScreeningHistory()
      .then(setHistory)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Riwayat Skrining Anda</h2>
      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada riwayat yang tersedia.</p>
      ) : (
        <div className="grid gap-6">
          {history.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 text-sm">
                  📅 {new Date(item.created_at).toLocaleString()}
                </p>
                <span className="text-sm text-gray-400"># {history.length - i}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Depresi", "Kecemasan", "Stres"].map((dimensi) => {
                  const score = item[`${dimensi.toLowerCase()}_score`];
                  const level = item[`${dimensi.toLowerCase()}_level`];
                  return (
                    <div
                      key={dimensi}
                      className={`p-4 rounded-lg border flex flex-col items-center text-center space-y-2`}
                    >
                      <div className="text-3xl">{levelEmoji[level]}</div>
                      <div className="text-sm font-semibold">{dimensi}</div>
                      <div className="text-lg font-bold">{score}</div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${levelColors[level]}`}
                      >
                        {level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
