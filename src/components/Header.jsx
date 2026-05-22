export default function Header({ name, location, summary }) {
  return (
    <header className="border-b border-default bg-surface-card">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-heading sm:text-3xl">{name}</h1>
        <p className="mt-1 text-sm text-muted">{location}</p>
        <p className="mt-4 max-w-prose text-sm leading-relaxed sm:text-base">{summary}</p>
      </div>
    </header>
  );
}
