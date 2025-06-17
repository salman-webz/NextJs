"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 rounded-full border border-transparent bg-blue-600 text-white px-6 py-3 text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </main>
    </div>
  );
}
