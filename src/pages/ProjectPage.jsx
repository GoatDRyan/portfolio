import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getNextProject, getProjectBySlug } from "../data/projects";
import ProjectPageBackground from "../components/background/ProjectPageBackground";
import ProjectHero from "../components/project/ProjectHero";
import ProjectInfoSidebar from "../components/project/ProjectInfoSidebar";
import ProjectSection from "../components/project/ProjectSection";
import ProjectChallenges from "../components/project/ProjectChallenges";
import ProjectGallery from "../components/project/ProjectGallery";
import ProjectResults from "../components/project/ProjectResults";
import NextProject from "../components/project/NextProject";
import NotFound from "./NotFound";

function ProjectPage() {
  const { slug } = useParams();
  const { language } = useLanguage();

  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFound />;
  }

  const detail = project.detail?.[language] || project.detail?.fr;
  const nextProject = getNextProject(slug);

  if (!detail) {
    return <NotFound />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen px-5 pb-28 pt-32 text-foreground sm:px-8 lg:px-12"
    >
      <ProjectPageBackground />

      <div className="mx-auto max-w-7xl">
        <ProjectHero project={project} detail={detail} language={language} />

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 grid gap-10 lg:grid-cols-[320px_1fr]"
        >
          <ProjectInfoSidebar detail={detail} />

          <div className="space-y-20">
            <ProjectSection section={detail.overview} variant="overview" />
            <ProjectSection section={detail.role} variant="role" />
            <ProjectSection section={detail.process} variant="process" />
            <ProjectSection section={detail.features} variant="features" />
            <ProjectChallenges section={detail.challenges} />
            <ProjectGallery gallery={detail.gallery} />
            <ProjectResults results={detail.results} lessons={detail.lessons} />
            <NextProject project={nextProject} language={language} />
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

export default ProjectPage;