import { githubProfile, linkedIn } from "@lib/socials";
import GithubIcon from "@components/icons/github";
import LinkedInIcon from "@components/icons/linkedIn";

export default function Footer() {
  return (
    <footer className="bg-primary mt-auto flex flex-col gap-3 py-6 text-center text-white dark:bg-slate-900">
      <span>© Axel Pettersson 2023</span>
      <span>
        <a href="mailto:hello@partiguiden.se">hello@partiguiden.se</a>
      </span>
      <span className="flex items-center justify-center gap-3">
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Skaparens LinkedIn profil"
        >
          <LinkedInIcon />
        </a>
        <a
          href={githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Skaparens GitHub profil"
        >
          <GithubIcon />
        </a>
      </span>
    </footer>
  );
}
