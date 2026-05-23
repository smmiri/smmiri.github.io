export default function Sidebar({ tools, className = "" }) {
  if (!tools?.length) return null;

  return (
    <aside aria-label="Tools" className={className}>
      <div className="lg:sticky lg:top-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">Tools</h2>
        <ul className="mt-3 space-y-3">
          {tools.map((tool) => (
            <li key={tool.url}>
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer noopener"
                className="block rounded-lg border border-default bg-surface-card px-3 py-2.5 text-sm transition-colors hover:border-accent/40"
              >
                <span className="font-medium text-heading">{tool.label}</span>
                {tool.description ? (
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{tool.description}</span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
