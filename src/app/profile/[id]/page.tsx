export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validate username
  const isValidUsername = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(id);

  if (!isValidUsername) {
    return (
        <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">
            Invalid username: {id}
        </h1>

        
      </div>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Your Profile
        </h1>

        <p className="text-zinc-400">
          Thanks for logging in, {id}
        </p>
      </div>
    </div>
  );
}