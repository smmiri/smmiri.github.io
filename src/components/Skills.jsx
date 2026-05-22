export default function Skills({ groups }) {
  return (
    <ul className="space-y-3 text-sm leading-relaxed">
      {groups.map((group) => (
        <li key={group.label}>
          <span className="font-medium text-heading">{group.label}:</span> {group.items}
        </li>
      ))}
    </ul>
  );
}
