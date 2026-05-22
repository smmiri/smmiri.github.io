export default function Publications({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-muted">
      {items.map((item) => (
        <li key={item.url}>
          <a href={item.url} target="_blank" rel="noreferrer noopener">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
