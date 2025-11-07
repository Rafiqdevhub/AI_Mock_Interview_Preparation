import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | JobPsych AI",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-center flex-col min-h-[calc(100vh-200px)] px-4 my-12">
        <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
          {/* 404 Illustration */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary-200/20 max-sm:text-7xl">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/robot.png"
                alt="Lost Robot"
                width={200}
                height={200}
                className="opacity-80 max-sm:w-32 max-sm:h-32"
                priority
              />
            </div>
          </div>

          {/* Error Message */}
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold max-sm:text-3xl">
              Page Not Found
            </h2>
            <p className="text-lg text-light-100">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It
              might have been moved or deleted.
            </p>
          </div>

          {/* Suggestions */}
          <div className="border-gradient p-0.5 rounded-2xl w-full">
            <div className="dark-gradient rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Where to go?</h3>
              <ul className="flex flex-col gap-3 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-primary-200 text-xl">→</span>
                  <span>
                    <Link
                      href="/"
                      className="text-primary-200 hover:underline font-semibold"
                    >
                      Home Page
                    </Link>{" "}
                    - Start your career journey
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-200 text-xl">→</span>
                  <span>
                    <Link
                      href="/dashboard"
                      className="text-primary-200 hover:underline font-semibold"
                    >
                      Dashboard
                    </Link>{" "}
                    - View your interviews and progress
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-200 text-xl">→</span>
                  <span>
                    <Link
                      href="/interview"
                      className="text-primary-200 hover:underline font-semibold"
                    >
                      Start Interview
                    </Link>{" "}
                    - Practice with AI interviewer
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-4 max-sm:flex-col max-sm:w-full">
            <Button asChild className="btn-primary">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild className="btn-secondary">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-400 mt-8">
            If you believe this is an error, please contact support or try
            refreshing the page.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
