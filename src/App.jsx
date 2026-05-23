import cv from "../content/cv.json";
import Contact from "./components/Contact.jsx";
import Experience from "./components/Experience.jsx";
import Header from "./components/Header.jsx";
import OpenWork from "./components/OpenWork.jsx";
import Playground from "./components/Playground.jsx";
import Publications from "./components/Publications.jsx";
import Section from "./components/Section.jsx";
import Skills from "./components/Skills.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-body">
      <Header name={cv.name} location={cv.location} summary={cv.summary} />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Contact email={cv.email} linkedin={cv.linkedin} github={cv.github} />
        <Section title="Experience">
          <Experience roles={cv.experience} />
        </Section>
        <Section title="Education">
          <ul className="space-y-2 text-sm leading-relaxed">
            {cv.education.map((row) => (
              <li key={row.year + row.degree}>
                <span className="font-medium text-heading">{row.year}</span>
                {" · "}
                {row.degree}, {row.institution}
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Selected publications">
          <Publications items={cv.publications} />
        </Section>
        <Section title="Skills">
          <Skills groups={cv.skills} />
        </Section>
        <Section title="Open work & code">
          <OpenWork intro={cv.openWorkIntro} repos={cv.repos} />
        </Section>
      </main>
      <Playground items={cv.playground} />
      <footer className="border-t border-default py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {cv.name}
      </footer>
    </div>
  );
}
