"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex-center flex-col min-h-screen px-4">
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <div className="relative">
          <Image
            src="/robot.png"
            alt="Error Robot"
            width={150}
            height={150}
            className="opacity-60 mx-auto mt-4"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Something Went Wrong</h2>
          <p className="text-lg text-light-100">
            We encountered an unexpected error. Don&apos;t worry, our AI is
            working to fix it!
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="border-gradient p-0.5 rounded-2xl w-full">
            <div className="dark-gradient rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-destructive-100">
                Error Details
              </h3>
              <div className="text-left">
                <p className="text-sm text-gray-400 mb-2">Message:</p>
                <code className="block bg-dark-200 p-4 rounded-lg text-sm overflow-auto">
                  {error.message}
                </code>
                {error.digest && (
                  <>
                    <p className="text-sm text-gray-400 mt-4 mb-2">
                      Error Digest:
                    </p>
                    <code className="block bg-dark-200 p-4 rounded-lg text-sm">
                      {error.digest}
                    </code>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-4 max-sm:flex-col max-sm:w-full">
          <Button onClick={reset} className="btn-primary">
            Try Again
          </Button>
          <Button asChild className="btn-secondary">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          If this problem persists, please contact our support team.
        </p>
      </div>
    </main>
  );
}
