const Loading = () => {
  return (
    <main className="flex-center flex-col min-h-screen">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="size-20 rounded-full border-4 border-primary-200/20 border-t-primary-200 animate-spin" />
          <div className="absolute inset-0 size-20 rounded-full border-4 border-primary-200/10 border-b-primary-200/50 animate-spin animation-delay-150" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold">Loading</h2>
          <p className="text-light-100 animate-pulse">
            Preparing your experience...
          </p>
        </div>

        <div className="flex gap-2">
          <span className="size-3 bg-primary-200 rounded-full animate-bounce" />
          <span className="size-3 bg-primary-200 rounded-full animate-bounce animation-delay-200" />
          <span className="size-3 bg-primary-200 rounded-full animate-bounce animation-delay-400" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
