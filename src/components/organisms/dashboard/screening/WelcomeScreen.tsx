export default function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold mb-2">Screening Kesehatan Mental</h1>
      <p className="text-gray-600 mb-6">Luangkan waktu dan ikuti tes ini</p>
      <button
        onClick={onNext}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
      >
        IKUTI TES
      </button>
    </div>
  );
}
