export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { id } = await params;
  const { name } = await searchParams;

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Your Profile
        </h1>

        <p className="mt-2 text-zinc-400">
          Thanks for logging in,{" "}
          <span className="font-medium text-white">
            {name}
          </span>
        </p>
      </div>
    </div>
  );
}