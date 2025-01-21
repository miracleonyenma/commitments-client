import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="site-section">
        <div className="wrapper flex flex-col items-center gap-4">
          <h1 className="text-center text-5xl font-bold tracking-tight lg:text-8xl">
            Turn Every Commit into a Commitment!
          </h1>
          <p className="mx-auto text-center text-lg lg:w-4/5 lg:text-xl">
            Turn every commit into an announcement, every issue into a solution,
            and every collaboration into progress. Keep your team informed,
            aligned, and ready to tackle anything.
          </p>
          <Link
            href={"https://github.com/apps/commitments-bot"}
            className="btn primary lg"
          >
            <GitHubLogoIcon className="icon" />
            <span>Install the Bot</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
