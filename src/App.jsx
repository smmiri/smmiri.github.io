import cv from "../content/cv.json";
import Contact from "./components/Contact.jsx";
import Experience from "./components/Experience.jsx";
import Header from "./components/Header.jsx";
import OpenWork from "./components/OpenWork.jsx";
import Publications from "./components/Publications.jsx";
import Section from "./components/Section.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Skills from "./components/Skills.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-body">
      <Header name={cv.name} location={cv.location} summary={cv.summary} />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:gap-12">
        <main className="min-w-0 flex-1 max-w-3xl">
          <Contact email={cv.email} linkedin={cv.linkedin} github={cv.github} />
          <Sidebar tools={cv.tools} className="mt-6 lg:hidden" />
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
        <Sidebar tools={cv.tools} className="hidden w-52 shrink-0 lg:block" />
      </div>
      <footer className="border-t border-default py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} {cv.name}
      </footer>
    </div>
  );
}
