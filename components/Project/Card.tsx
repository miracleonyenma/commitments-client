"use client";

import { Project, User } from "@/types/gql/graphql";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { formatRelative } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const ProjectCard: React.FC<{ project: Project; user: User | null }> = ({
  project,
  user,
}) => {
  const relativTime = formatRelative(
    new Date(parseInt(project?.createdAt as string)),
    new Date(),
  );

  return (
    <article className="app-card flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-300 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex max-w-full flex-wrap items-center gap-4">
          <figure className="app-icon shrink-0">
            <Image
              src={"/images/commitment-project.png"}
              alt={project.name}
              width={50}
              height={50}
              className="rounded-xl"
            />
          </figure>
          <div className="text-cont max-w-full">
            <h3 className="text-2xl font-bold">{project.name}</h3>
            {project.repository?.url && (
              <Link
                href={project.repository.url}
                className="flex items-center gap-2 underline"
                target="_blank" // Optional: Opens the link in a new tab
                rel="noopener noreferrer" // Improves security
              >
                <span className="truncate">{project.repository.url}</span>
                <ExternalLinkIcon className="icon h-4 w-4 shrink-0" />
              </Link>
            )}
          </div>
        </div>

        <Link
          href={`/${user?.team?.slug}/${project.slug}`}
          className="btn primary md"
        >
          Open
        </Link>
      </header>
      <p>{project.description || "No description provided."}</p>
      <footer className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <span>By {project.team?.name}</span>|
        <span>Last updated {relativTime}</span>
      </footer>
    </article>
  );
};

export default ProjectCard;
