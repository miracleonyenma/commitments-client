import getProjects from "@/utils/project/getProjects";
import { cookies } from "next/headers";
import ProjectList from "@/components/Project/List";

const API_KEY = process.env.API_KEY as string;

const handleGetProjects = async ({ teamSlug }: { teamSlug: string }) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  // console.log({ accessToken });

  const { projects } = await getProjects(
    {
      pagination: {
        limit: 10,
        page: 1,
      },
      filter: {
        teamSlug: teamSlug,
      },
    },
    {
      apiKey: API_KEY,
      ...(accessToken && { accessToken }),
    },
  );

  return projects;
};

const ProjectsPage = async ({
  params,
}: {
  params: Promise<{ team: string }>;
}) => {
  const teamSlug = (await params).team;

  let projectsData = null;
  try {
    projectsData = await handleGetProjects({ teamSlug });
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
