export default function Experience({ roles }) {
  return (
    <ul className="space-y-8">
      {roles.map((role) => (
        <li key={role.title + role.dates}>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-semibold text-heading">
              {role.title}
              <span className="font-normal text-body"> · {role.org}</span>
            </h3>
            <p className="shrink-0 text-sm text-muted">{role.dates}</p>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-muted">
            {role.bullets.map((bullet) => (
              <li key={bullet.slice(0, 48)}>{bullet}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
