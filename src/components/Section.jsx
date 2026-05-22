export default function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 border-b border-default pb-2 text-sm font-semibold uppercase tracking-wide text-heading">
        {title}
      </h2>
      {children}
    </section>
  );
}
