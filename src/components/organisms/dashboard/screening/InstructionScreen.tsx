import React from "react";

export default function InstructionScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex justify-center items-center min-h-[75vh] px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h2 className="text-2xl font-bold">Petunjuk Pengerjaan</h2>

        <div className="text-base text-gray-800 space-y-6 leading-relaxed">
          <p>
            Bacalah setiap pernyataan dan pilih jawaban yang paling sesuai dengan kondisi
            Anda selama <strong>seminggu terakhir</strong>.
          </p>
          <p>
            Tidak ada jawaban benar atau salah. Jangan menghabiskan terlalu
            banyak waktu untuk setiap pernyataan.
          </p>

          <div className="text-left inline-block text-[16px] space-y-2">
            <p><strong>TIDAK PERNAH</strong>: Tidak sesuai sama sekali</p>
            <p><strong>KADANG-KADANG</strong>: Sesuai pada tingkat tertentu</p>
            <p><strong>SERING</strong>: Sesuai pada tingkat cukup besar</p>
            <p><strong>HAMPIR SELALU</strong>: Sangat sesuai / hampir selalu</p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
        >
          MULAI
        </button>
      </div>
    </div>
  );
}
