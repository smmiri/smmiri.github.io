import { useEffect, useId, useRef, useState } from "react";

export default function Playground({ items }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!items?.length) return null;

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-controls={panelId}
          className="playground-tab fixed top-1/2 right-0 z-30 -translate-y-1/2 rounded-l-md border border-r-0 border-default bg-surface-card px-2 py-3 text-xs font-medium tracking-wide text-label shadow-sm transition-colors hover:text-heading"
        >
          Playground
        </button>
      ) : null}

      <button
        type="button"
        aria-label="Close playground menu"
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-40 bg-heading/25 backdrop-blur-[1px] transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        id={panelId}
        aria-label="Playground"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-l border-default bg-surface-card shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-default px-5 py-4">
          <h2 className="text-sm font-semibold text-heading">Playground</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="rounded p-1 text-muted transition-colors hover:text-heading"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target={item.external !== false ? "_blank" : undefined}
                  rel={item.external !== false ? "noreferrer noopener" : undefined}
                  className="group block rounded-md px-3 py-2.5 transition-colors hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  <span className="block text-sm font-medium text-heading group-hover:text-accent">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 block text-xs leading-snug text-muted">{item.description}</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
