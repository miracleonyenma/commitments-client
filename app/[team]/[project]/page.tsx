import ErrorPage from "@/components/Error/Page";
import getFeed from "@/utils/feed/getFeed";
import getProject from "@/utils/project/getProject";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { formatRelative } from "date-fns";
import { Buildings2, Eye, Hierarchy2, Timer, Timer1 } from "iconsax-react";
import { cookies } from "next/headers";
import Link from "next/link";
import Markdown from "react-markdown";

const API_KEY = process.env.API_KEY as string;

const handleGetProject = async ({ slug }: { slug: string }) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  // console.log({ accessToken });

  const { project } = await getProject(
    {
      slug: slug,
    },
    {
      apiKey: API_KEY,
      ...(accessToken && { accessToken }),
    },
  );

  return project;
};

const handleGetFeed = async ({ projectId }: { projectId: string }) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  // console.log({ accessToken });

  const { feed } = await getFeed(
    {
      projectId: projectId,
      filter: {
        type: "announcement",
      },
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

  return feed;
};

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ project: string; team: string }>;
}) => {
  const projectSlug = (await params).project;
  const teamSlug = (await params).team;
  try {
    const project = await handleGetProject({ slug: projectSlug });
    // console.log(
    //   "🚀 ~ file: page.tsx ~ line 22 ~ ProjectPage ~ project",
    //   project,
    // );
    const feed = await handleGetFeed({
      projectId: project?.id as string,
    });
    // console.log("🚀 ~ file: page.tsx ~ line 27 ~ ProjectPage ~ feed", feed);

    const relativeCreated = formatRelative(
      new Date(parseInt(project?.createdAt as string)),
      new Date(),
    );
    const relativeUpdated = formatRelative(
      new Date(parseInt(project?.updatedAt as string)),
      new Date(),
    );

    return (
      <div className="site-section min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="wrapper flex !max-w-6xl flex-col-reverse gap-6 p-4 lg:grid lg:grid-cols-1 xl:grid-cols-3">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-16">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Project Information
              </h2>

              <div className="flex flex-col gap-2 rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {/* Project Name and Visibility */}
                <div className="px-4 pt-4">
                  <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                    {project?.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Eye className="icon" variant="Bulk" color="currentColor" />
                    {project?.visibility == "public"
                      ? "Visible to everyone"
                      : "Visible to team members"}
                  </div>
                </div>

                {/* Repository */}
                <div className="px-4 py-0">
                  {/* <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Repository
                  </h4> */}
                  <Link
                    href={project?.repository?.url as string}
                    className="flex items-center gap-2"
                    target="_blank"
                  >
                    <GitHubLogoIcon className="icon" />
                    {project?.repository?.fullName}
                  </Link>
                </div>

                {/* Team */}
                <div className="px-4 pb-4">
                  {/* <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Team
                  </h4> */}
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Buildings2
                      className="icon"
                      variant="Bulk"
                      color="currentColor"
                    />
                    {project?.team?.name}
                  </div>
                </div>

                {/* Dates */}
                <div className="border-t border-gray-200 px-4 py-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <p>Created {relativeCreated}</p>
                  <p>Updated {relativeUpdated}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2">
            <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Project Updates
            </h1>

            <div className="space-y-6">
              {feed?.data?.map((entry) => {
                const relativTime = formatRelative(
                  new Date(parseInt(project?.createdAt as string)),
                  new Date(),
                );
                const relativeUpdated = formatRelative(
                  new Date(parseInt(entry?.updatedAt as string)),
                  new Date(),
                );
                return (
                  <article key={entry.id} className="flex flex-col gap-0">
                    {/* Entry Header */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className="tag">
                        {entry.type === "changelog"
                          ? "Changelog"
                          : "Announcement"}
                      </span>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {relativTime}
                      </time>
                    </div>

                    {/* Entry Content */}
                    <div className="prose prose-sm lg:prose-base prose-blue dark:prose-invert max-w-none rounded-t-2xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                      <Markdown>{entry.content}</Markdown>
                    </div>

                    {/* Entry Details */}
                    {entry.details && (
                      <div className="prose prose-sm prose-blue dark:prose-invert max-w-none border border-y-0 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <Markdown>{entry.details}</Markdown>
                      </div>
                    )}

                    {/* Metadata */}
                    {entry.metadata && (
                      <div className="flex items-center gap-4 rounded-b-2xl border bg-white p-6 text-sm text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        <span className="flex items-center gap-1 capitalize">
                          <Hierarchy2
                            className="icon"
                            variant="Bulk"
                            color="currentColor"
                          />
                          {entry.metadata.branch}
                        </span>
                        <Link
                          href={entry?.metadata?.compareUrl as string}
                          className="btn ghost"
                          target="_blank"
                        >
                          <GitHubLogoIcon
                            className="icon"
                            color="currentColor"
                          />
                          View changes
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <main>
        <ErrorPage
          error={{
            message: (error as Error).message,
            stack: (error as Error).stack,
          }}
        />
      </main>
    );
  }
};

export default ProjectPage;
