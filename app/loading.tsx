export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="flex flex-col items-center gap-4">
        <p className="text-storm-blue font-bold text-xl tracking-wide">StormOS</p>
        <div className="w-10 h-10 border-4 border-storm-blue border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
