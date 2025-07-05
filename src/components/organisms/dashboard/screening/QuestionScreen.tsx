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

  return (
    <div className="max-w-3xl mx-auto mt-12 text-center">
      <p className="mb-4 text-lg font-medium">
        {index + 1}. {current.text}
      </p>

      {[0, 1, 2, 3].map((val) => (
        <button
          key={val}
          className={`block w-full py-2 px-4 my-2 rounded-md border ${
            answers[index] === val ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => {
            const updated = [...answers];
            updated[index] = val;
            setAnswers(updated);
          }}
        >
          {val === 0
            ? "TIDAK PERNAH"
            : val === 1
            ? "KADANG-KADANG"
            : val === 2
            ? "SERING"
            : "HAMPIR SELALU"}
        </button>
      ))}

      <div className="flex justify-between mt-6">
        <button
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
        >
          KEMBALI
        </button>

        <button
          disabled={answers[index] === -1}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded disabled:opacity-50"
          onClick={() => {
            if (index < 20) {
              setIndex(index + 1);
            } else {
              onFinish(answers);
            }
          }}
        >
          {index === 20 ? "SELESAI" : "BERIKUTNYA"}
        </button>
      </div>
    </div>
  );
}
