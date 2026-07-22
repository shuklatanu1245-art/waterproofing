import ProjectsClient from "./ProjectsClient";
import { getProjects } from "@/lib/actions";

export const revalidate = 10;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient allProjects={projects} />;
}
