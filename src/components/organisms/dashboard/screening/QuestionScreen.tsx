import { useState } from "react";

interface QuestionScreenProps {
  onFinish: (answers: number[]) => void;
}

const questions = [
  { id: "D1", text: "Saya sama sekali tidak dapat merasakan perasaan positif (contoh: merasa gembira, bangga, dsb).", type: "Depresi" },
  { id: "D2", text: "Saya merasa sulit berinisiatif melakukan sesuatu.", type: "Depresi" },
  { id: "D3", text: "Saya merasa tidak ada lagi yang bisa saya harapkan.", type: "Depresi" },
  { id: "D4", text: "Saya merasa sedih dan tertekan.", type: "Depresi" },
  { id: "D5", text: "Saya tidak bisa merasa antusias terhadap hal apapun.", type: "Depresi" },
  { id: "D6", text: "Saya merasa diri saya tidak berharga.", type: "Depresi" },
  { id: "D7", text: "Saya merasa hidup ini tidak berarti.", type: "Depresi" },
  { id: "A1", text: "Saya merasa rongga mulut saya kering.", type: "Kecemasan" },
  { id: "A2", text: "Saya merasa kesulitan bernafas (misalnya seringkali terengah-engah atau tidak dapat bernafas padahal tidak melakukan aktivitas fisik sebelumnya).", type: "Kecemasan" },
  { id: "A3", text: "Saya merasa gemetar (misalnya pada tangan).", type: "Kecemasan" },
  { id: "A4", text: "Saya merasa khawatir dengan situasi dimana saya mungkin menjadi panik dan mempermalukan diri sendiri.", type: "Kecemasan" },
  { id: "A5", text: "Saya merasa hampir panik.", type: "Kecemasan" },
  { id: "A6", text: "Saya menyadari kondisi jantung saya (seperti meningkatnya atau melemahnya detak jantung) meskipun sedang tidak melakukan aktivitas fisik.", type: "Kecemasan" },
  { id: "A7", text: "Saya merasa ketakutan tanpa alasan yang jelas.", type: "Kecemasan" },
  { id: "S1", text: "Saya merasa sulit untuk beristirahat.", type: "Stres" },
  { id: "S2", text: "Saya cenderung menunjukkan reaksi berlebihan terhadap suatu situasi.", type: "Stres" },
  { id: "S3", text: "Saya merasa energi saya terkuras karena terlalu cemas.", type: "Stres" },
  { id: "S4", text: "Saya merasa gelisah.", type: "Stres" },
  { id: "S5", text: "Saya merasa sulit untuk merasa tenang.", type: "Stres" },
  { id: "S6", text: "Saya sulit untuk bersabar dalam menghadapi gangguan yang terjadi ketika sedang melakukan sesuatu.", type: "Stres" },
  { id: "S7", text: "Perasaan saya mudah tergugah atau tersentuh.", type: "Stres" },
];

export default function QuestionScreen({ onFinish }: QuestionScreenProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(21).fill(-1));
  const current = questions[index];

  const options = ["TIDAK PERNAH", "KADANG-KADANG", "SERING", "HAMPIR SELALU"];

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <p className="text-lg font-medium">
          {index + 1}. {current.text}
        </p>

        <div className="space-y-3">
          {options.map((label, val) => (
            <button
              key={val}
              className={`block w-full py-3 px-6 rounded-lg border font-medium transition ${
                answers[index] === val
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => {
                const updated = [...answers];
                updated[index] = val;
                setAnswers(updated);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded disabled:opacity-50"
          >
            KEMBALI
          </button>

          <button
            disabled={answers[index] === -1}
            onClick={() => {
              if (index < 20) {
                setIndex(index + 1);
              } else {
                onFinish(answers);
              }
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded disabled:opacity-50"
          >
            {index === 20 ? "SELESAI" : "BERIKUTNYA"}
          </button>
        </div>
      </div>
    </div>
  );
}
