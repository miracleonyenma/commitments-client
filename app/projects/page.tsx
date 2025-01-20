import { Project, ProjectData } from "@/types/gql/graphql";
import getProjects from "@/utils/project/getProjects";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const API_KEY = process.env.API_KEY as string;

const handleGetProjects = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  console.log({ accessToken });

  const { projects } = await getProjects(
    {
      pagination: {
        limit: 10,
        page: 1,
      },
    },
    {
      apiKey: API_KEY,
      ...(accessToken && { accessToken }),
    },
  );

  return projects;
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <article className="app-card flex flex-col gap-4 rounded-xl border border-gray-300 bg-gray-100 p-4 shadow-inner shadow-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-700">
      <header className="flex flex-wrap items-center gap-4">
        <figure className="app-icon">
          <Image
            src={"/images/commitment-project.png"}
            alt={project.name}
            width={50}
            height={50}
            className="rounded-xl"
          />
        </figure>
        <div className="text-cont">
          <h3 className="text-2xl font-bold">{project.name}</h3>
          {project.repository?.url && (
            <Link
              href={project.repository.url}
              className="flex flex-wrap items-center gap-2 underline"
              target="_blank" // Optional: Opens the link in a new tab
              rel="noopener noreferrer" // Improves security
            >
              <span>{project.repository.url}</span>
              <ExternalLinkIcon className="icon h-4 w-4" />
            </Link>
          )}
        </div>
      </header>
      <p>{project.description || "No description provided."}</p>
      <Link href={`/projects/${project.id}`} className="btn primary md">
        Open
      </Link>
    </article>
  );
};

const ProjectList: React.FC<{ projectData: ProjectData }> = ({
  projectData,
}) => {
  return (
    <ul>
      {projectData?.data?.map(
        (project) =>
          project && (
            <li key={project?.id}>
              <ProjectCard project={project} />
            </li>
          ),
      )}
    </ul>
  );
};

const ProjectsPage = async () => {
  let projectsData = null;
  try {
    projectsData = await handleGetProjects();
  } catch (error) {
    console.log("🚨 Error getting feed: ", error);
    projectsData = null;
  }

  return (
    <main>
      <header className="site-section">
        <div className="wrapper">
          <h1 className="text-xl font-bold lg:text-3xl">Projects</h1>
          <p>View all of your projects</p>
        </div>
      </header>
      <section className="site-section !py-0">
        <div className="wrapper">
          {projectsData ? (
            <ProjectList projectData={projectsData} />
          ) : (
            <div>
              <p>No projects found</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
