import type { Project } from "@/types";
import { ProjectGallery } from "@/components/ProjectGallery";

export function ProjectCard({ project }: { project: Project }) {
  return <ProjectGallery projects={[project]} className="grid-cols-1 md:grid-cols-1 lg:grid-cols-1" />;
}
