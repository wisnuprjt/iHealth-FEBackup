"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import CardListScreening from "@/components/molecules/card/CardListScreening";
import { useGetAllScreening } from "@/http/screening/get-all-screening";
import { useGetAllHistoryScreening } from "@/http/screening/get-history-all-screening";

// Import komponen modular
import WelcomeScreen from "./WelcomeScreen";
import InstructionScreen from "./InstructionScreen";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";

export default function DashboardScreeningWrapper() {
  const [step, setStep] = useState<"welcome" | "instruction" | "question" | "result" | "list">("welcome");
  const [result, setResult] = useState<number[] | null>(null);

  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const { data: historyScreening } = useGetAllHistoryScreening(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  // Langkah 1: Welcome
  if (step === "welcome") return <WelcomeScreen onNext={() => setStep("instruction")} />;

  // Langkah 2: Petunjuk
  if (step === "instruction") return <InstructionScreen onNext={() => setStep("question")} />;

  // Langkah 3: Pertanyaan
  if (step === "question")
    return (
      <QuestionScreen
        onFinish={(answers) => {
          setResult(answers);
          setStep("result");
        }}
      />
    );

  // Langkah 4: Hasil
  if (step === "result")
    return (
      <ResultScreen
        answers={result}
        onRestart={() => {
          setResult(null);
          setStep("welcome");
        }}
      />
    );

  // Fallback: list lama
  return (
    <div className="space-y-4">
      <CardListScreening
        data={data?.data || []}
        isLoading={isPending}
        history={historyScreening?.data || []}
      />
    </div>
  );
}
