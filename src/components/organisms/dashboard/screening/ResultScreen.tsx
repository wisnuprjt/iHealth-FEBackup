import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ResultScreenProps {
  answers: number[] | null;
  onRestart: () => void;
}

type Level = "Normal" | "Ringan" | "Sedang" | "Parah" | "Sangat Parah";

const questionTypeMap: ("Depresi" | "Kecemasan" | "Stres")[] = [
  "Depresi", "Depresi", "Depresi", "Depresi", "Depresi", "Depresi", "Depresi",
  "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan", "Kecemasan",
  "Stres", "Stres", "Stres", "Stres", "Stres", "Stres", "Stres",
];

function interpret(score: number, type: "Depresi" | "Kecemasan" | "Stres"): Level {
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
  return "Normal";
}

const descriptions: Record<"Depresi" | "Kecemasan" | "Stres", Record<Level, string>> = {
  Depresi: {
    Normal: "Skor Anda menunjukkan tidak ada tanda-tanda depresi. Hal ini mencerminkan kondisi emosional yang sehat, dengan suasana hati yang stabil dan tidak terganggu secara signifikan.",
    Ringan: "Terdapat gejala depresi yang ringan, seperti penurunan motivasi atau energi, namun belum mengganggu fungsi adaptif secara signifikan.",
    Sedang: "Gejala depresi Anda cukup terasa dan dapat mulai memengaruhi rutinitas harian dan interaksi sosial.",
    Parah: "Anda mengalami gejala depresi berat, dengan kemungkinan munculnya gangguan dalam fungsi sehari-hari seperti kurangnya inisiatif atau keinginan dalam beraktivitas.",
    "Sangat Parah": "Gejala depresi sangat berat dan membutuhkan penanganan profesional segera.",
  },
  Kecemasan: {
    Normal: "Tidak ditemukan gejala kecemasan signifikan; individu berada dalam keadaan tenang secara fisiologis dan emosional.",
    Ringan: "Terdapat gejala kecemasan ringan seperti kegelisahan, kekhawatiran sosial, atau kewaspadaan berlebih, namun gejala ini masih dalam batas normal dan belum mengganggu fungsi sehari-hari secara signifikan.",
    Sedang: "Gejala kecemasan mulai meningkat dan dapat mencakup gejala fisik (seperti jantung berdebar) atau pikiran yang overaktif. Disarankan untuk mengambil tindakan pencegahan seperti meningkatkan pola hidup sehat dan pola pikir positif.",
    Parah: "Kecemasan berat yang mungkin muncul dalam bentuk kepanikan, kesulitan relaksasi, atau ketegangan yang berkepanjangan yang mengganggu aktivitas sehari-hari. Disarankan untuk mulai menerapkan strategi coping efektif seperti relaksasi untuk mengelola kecemasan atau konsultasi dengan profesional.",
    "Sangat Parah": "Kecemasan sangat berat yang berpotensi mengganggu kehidupan sehari-hari, pekerjaan, dan relasi sosial, serta membutuhkan intervensi psikologis dan penanganan profesional.",
  },
  Stres: {
    Normal: "Tidak terdeteksi gejala signifikan, menandakan adanya kemampuan adaptif yang baik dalam menghadapi tuntutan lingkungan.",
    Ringan: "Stres ringan ditandai dengan sedikit ketegangan atau kesulitan konsentrasi, tetapi belum mengganggu fungsi sehari-hari secara signifikan.",
    Sedang: "Indikasi stres sedang yang dapat memengaruhi performa dan keseimbangan emosional, namun masih dapat dikendalikan dengan pengelolaan stres yang baik. Disarankan untuk mengambil langkah-langkah dalam mengelola stres seperti menjaga pola hidup sehat.",
    Parah: "Tingkat stres tinggi yang dapat menyebabkan emosi tidak stabil, gangguan tidur, dan kegelisahan berkepanjangan. Disarankan untuk menerapkan strategi mengelola stres dengan lebih efektif, misalnya dengan relaksasi, mendengarkan musik, dan mulai berkonsultasi dengan profesional.",
    "Sangat Parah": "Gejala stres sangat berat yang berdampak luas terhadap fungsi sehari-hari dan kesejahteraan psikologis; sangat dianjurkan untuk berkonsultasi dengan tenaga profesional.",
  },
};

const icons: Record<Level, string> = {
  Normal: "😀",
  Ringan: "🙂",
  Sedang: "😐",
  Parah: "😟",
  "Sangat Parah": "😢",
};

function getColor(level: Level) {
  if (level === "Normal") return { text: "text-green-600", chart: "#22c55e" };
  if (level === "Ringan" || level === "Sedang") return { text: "text-orange-500", chart: "#f97316" };
  return { text: "text-red-600", chart: "#ef4444" };
}

export default function ResultScreen({ answers, onRestart }: ResultScreenProps) {
  if (!answers) return null;

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

  const chartConfig = (value: number, color: string) => ({
    labels: [],
    datasets: [
      {
        data: [value, 42 - value],
        backgroundColor: [color, "#e5e7eb"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-center space-y-10">
      <h2 className="text-3xl font-bold">Hasil Skrining Anda</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
        {(["Depresi", "Kecemasan", "Stres"] as const).map((dimensi) => {
          const level = interpretasi[dimensi];
          const color = getColor(level);

          return (
            <div key={dimensi} className="space-y-2">
              <h4 className="font-semibold">{dimensi}:</h4>
              <p className={`text-lg font-bold ${color.text}`}>{level}</p>
              <div className="w-[120px] h-[120px] mx-auto relative">
                <Doughnut data={chartConfig(skor[dimensi], color.chart)} />
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                  {skor[dimensi]}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-6 text-left max-w-3xl mx-auto">
        {(["Depresi", "Kecemasan", "Stres"] as const).map((dimensi) => {
          const level = interpretasi[dimensi];
          const color = getColor(level);

          return (
            <div key={dimensi} className="flex gap-3 items-start">
              <span className="text-3xl">{icons[level]}</span>
              <div>
                <h5 className="font-bold mb-1">
                  {dimensi}:{" "}
                  <span className={`${color.text}`}>{level}</span>
                </h5>
                <p className={`text-sm ${color.text}`}>
                  {descriptions[dimensi][level]}
                </p>
              </div>
            </div>
          );
        })}
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
