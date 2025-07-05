import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultScreenProps {
  answers: number[] | null;
  onRestart: () => void;
}

const questionTypeMap: ("Depresi" | "Kecemasan" | "Stres")[] = [
  "Depresi", "Depresi", "Depresi", "Depresi", "Depresi", "Depresi", "Depresi",
  "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan",
  "Stres", "Stres", "Stres", "Stres", "Stres", "Stres", "Stres",
];

function interpret(score: number, type: "Depresi" | "Kecemasan" | "Stres") {
  const s = score * 2;
  if (type === "Depresi") {
    if (s <= 4) return "Normal";
    if (s <= 6) return "Ringan";
    if (s <= 10) return "Sedang";
    if (s <= 13) return "Parah";
    return "Sangat Parah";
  }
  if (type === "Kecemasan") {
    if (s <= 3) return "Normal";
    if (s <= 5) return "Ringan";
    if (s <= 7) return "Sedang";
    if (s <= 9) return "Parah";
    return "Sangat Parah";
  }
  if (type === "Stres") {
    if (s <= 7) return "Normal";
    if (s <= 9) return "Ringan";
    if (s <= 12) return "Sedang";
    if (s <= 16) return "Parah";
    return "Sangat Parah";
  }
}

const descriptions: Record<string, string> = {
  "Sangat Parah": "Tingkat kondisi Anda termasuk sangat parah. Sebaiknya Anda segera berkonsultasi dengan tenaga medis profesional untuk mendapatkan penanganan yang tepat.",
  "Parah": "Tingkat kondisi Anda termasuk parah. Segera pertimbangkan untuk mencari bantuan profesional.",
  "Sedang": "Anda menunjukkan gejala sedang. Disarankan untuk memantau kondisi dan mempertimbangkan konsultasi psikolog.",
  "Ringan": "Gejala ringan terdeteksi. Perhatikan kesehatan mental Anda dan lakukan relaksasi atau mindfulness.",
  "Normal": "Tidak terdeteksi gejala signifikan. Pertahankan gaya hidup sehat dan keseimbangan emosi.",
};

export default function ResultScreen({ answers, onRestart }: ResultScreenProps) {
  if (!answers) return null;

  // Hitung skor
  let depresi = 0, kecemasan = 0, stres = 0;
  answers.forEach((val, i) => {
    const tipe = questionTypeMap[i];
    if (tipe === "Depresi") depresi += val;
    if (tipe === "Kecemasan") kecemasan += val;
    if (tipe === "Stres") stres += val;
  });

  const skor = {
    Depresi: depresi * 2,
    Kecemasan: kecemasan * 2,
    Stres: stres * 2,
  };

  const interpretasi = {
    Depresi: interpret(depresi, "Depresi"),
    Kecemasan: interpret(kecemasan, "Kecemasan"),
    Stres: interpret(stres, "Stres"),
  };

  const chartConfig = (value: number) => ({
    labels: [],
    datasets: [
      {
        data: [value, 42 - value],
        backgroundColor: ["#ef4444", "#e5e7eb"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-center space-y-10">
      <h2 className="text-3xl font-bold">Hasil Skrining Anda</h2>

      {/* Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
        {(["Depresi", "Kecemasan", "Stres"] as const).map((dimensi) => (
          <div key={dimensi} className="space-y-2">
            <h4 className="font-semibold">{dimensi}:</h4>
            <p className="text-lg font-bold text-rose-600">{interpretasi[dimensi]}</p>
            <div className="w-[120px] h-[120px] mx-auto relative">
              <Doughnut data={chartConfig(skor[dimensi])} />
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                {skor[dimensi]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interpretasi Deskripsi */}
      <div className="space-y-6 text-left max-w-3xl mx-auto">
        {(["Depresi", "Kecemasan", "Stres"] as const).map((dimensi) => (
          <div key={dimensi} className="flex gap-3 items-start">
            <span className="text-3xl">⚠️</span>
            <div>
              <h5 className="font-bold mb-1">
                {dimensi}: <span className="text-rose-600">{interpretasi[dimensi]}</span>
              </h5>
              <p className="text-sm text-gray-700">{descriptions[interpretasi[dimensi] as keyof typeof descriptions]}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow"
      >
        RETURN
      </button>
    </div>
  );
}
