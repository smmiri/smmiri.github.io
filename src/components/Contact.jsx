export default function Contact({ email, linkedin, github }) {
  return (
    <nav aria-label="Contact" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <a href={`mailto:${email}`}>{email}</a>
      <a href={linkedin} target="_blank" rel="noreferrer noopener">
        LinkedIn
      </a>
      <a href={github} target="_blank" rel="noreferrer noopener">
        GitHub
      </a>
    </nav>
  );
}
