"use client";

import { ProjectData } from "@/types/gql/graphql";
import ProjectCard from "@/components/Project/Card";
import { useUserStore } from "@/store/useUserStore";

const ProjectList: React.FC<{ projectData: ProjectData }> = ({
  projectData,
}) => {
  const { user } = useUserStore();
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projectData?.data?.map(
        (project) =>
          project && (
            <li key={project?.id}>
              <ProjectCard project={project} user={user} />
            </li>
          ),
      )}
    </ul>
  );
};

export default ProjectList;
