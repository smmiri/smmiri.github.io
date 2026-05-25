import { useEffect, useId, useRef, useState } from "react";

function useHoverCapable() {
  const [hoverCapable, setHoverCapable] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHoverCapable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return hoverCapable;
}

export default function Playground({ items }) {
  const [open, setOpen] = useState(false);
  const hoverCapable = useHoverCapable();
  const rootRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((value) => !value);

  const onRootBlur = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget)) closeMenu();
  };

  if (!items?.length) return null;

  return (
    <div
      ref={rootRef}
      className="playground-root fixed top-0 left-0 z-50 flex h-full"
      onMouseEnter={hoverCapable ? openMenu : undefined}
      onMouseLeave={hoverCapable ? closeMenu : undefined}
      onFocus={openMenu}
      onBlur={onRootBlur}
    >
      <button
        type="button"
        onClick={hoverCapable ? undefined : toggleMenu}
        aria-expanded={open}
        aria-controls={panelId}
        className="playground-tab self-center shrink-0 rounded-r-md border border-l-0 border-default bg-surface-card px-2 py-3 text-xs font-medium tracking-wide text-label shadow-sm transition-colors hover:text-heading"
      >
        Playground
      </button>

      <aside
        id={panelId}
        aria-label="Playground"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`h-full shrink-0 overflow-hidden border-default bg-surface-card shadow-xl transition-[width] duration-300 ease-out motion-reduce:transition-none ${
          open ? "w-72 border-r" : "w-0 border-r-0"
        }`}
      >
        <div className="flex h-full w-72 flex-col">
          <div className="border-b border-default px-5 py-4">
            <h2 className="text-sm font-semibold text-heading">Playground</h2>
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
                    onClick={closeMenu}
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
        </div>
      </aside>
    </div>
  );
}
