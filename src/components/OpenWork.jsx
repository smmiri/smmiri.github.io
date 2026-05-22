export default function OpenWork({ intro, repos }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p>{intro}</p>
      <ul className="space-y-2">
        {repos.map((repo) => (
          <li key={repo.url}>
            <a href={repo.url} target="_blank" rel="noreferrer noopener" className="font-medium">
              {repo.name}
            </a>
            <span className="text-muted"> — {repo.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
