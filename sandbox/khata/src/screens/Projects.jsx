import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../mockData";

export default function Projects() {
  return (
    <div>
      <PageHeader title="Projects" />
      <div className="flex flex-col gap-3 px-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <div className="h-4" />
    </div>
  );
}
