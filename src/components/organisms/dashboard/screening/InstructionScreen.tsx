import React from "react";

export default function InstructionScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex justify-center items-center min-h-[75vh] px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h2 className="text-2xl font-bold">Petunjuk Pengerjaan</h2>

        <div className="text-base text-gray-800 space-y-6 leading-relaxed">
          <p>
            Bacalah setiap pernyataan dan pilih jawaban dari angka{" "}
            yang paling sesuai dengan kondisi
            Anda selama <strong>seminggu terakhir</strong>.
          </p>
          <p>
            Tidak ada jawaban benar atau salah. Jangan menghabiskan terlalu
            banyak waktu untuk setiap pernyataan.
          </p>

          <div className="text-left inline-block text-[16px] space-y-2">
            <p>
              <strong>0</strong>: Tidak sesuai sama sekali –{" "}
              <strong>TIDAK PERNAH</strong>
            </p>
            <p>
              <strong>1</strong>: Sesuai pada tingkat tertentu –{" "}
              <strong>KADANG-KADANG</strong>
            </p>
            <p>
              <strong>2</strong>: Sesuai pada tingkat cukup besar –{" "}
              <strong>SERING</strong>
            </p>
            <p>
              <strong>3</strong>: Sangat sesuai / hampir selalu –{" "}
              <strong>HAMPIR SELALU</strong>
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow"
        >
          MULAI
        </button>
      </div>
    </div>
  );
}
