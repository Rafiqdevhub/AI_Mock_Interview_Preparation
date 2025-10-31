export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-24 px-6">
        <div className="w-full rounded-2xl bg-white/80 p-12 shadow-lg backdrop-blur-sm dark:bg-black/60">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold">
              JP
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
                JobPsych — Interview Prep AI
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                AI-powered mock interviews, personalized feedback, and tailored
                study plans.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-black dark:text-zinc-50">
                Coming soon
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                We are building an intelligent interviewer that helps you
                practice, improves your answers, and tracks your progress. Sign
                up to be notified when we launch.
              </p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="mailto:notify@jobpsych.ai?subject=Notify%20me%20about%20JobPsych"
                  className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                >
                  Get notified
                </a>
                <a
                  href="#"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline"
                >
                  Request early access
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                What we will include
              </h3>
              <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>• Mock interviews across roles and levels</li>
                <li>• Real-time AI feedback & scoring</li>
                <li>• Personalized study plans and resources</li>
                <li>• Progress tracking and analytics</li>
              </ul>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:underline"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 dark:text-zinc-400 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-xs text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} JobPsych — AI Interview Preparation.
          </footer>
        </div>
      </main>
    </div>
  );
}
