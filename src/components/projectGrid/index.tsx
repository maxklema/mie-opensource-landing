import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { GrGithub } from "react-icons/gr";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

interface ProjectDetails {
    name: string;
    description: string;
    author: string;
    projectURL: string;
    gitHubURL: string;
}

interface ProjectGridProps {
    ProjectList?: string[];
}

export default function ProjectGrid({ ProjectList }: ProjectGridProps) {
    const [projectDetails, setProjectDetails] = useState<ProjectDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            let projectsToShowCase: string[];
            if ( !ProjectList || ProjectList.length === 0) {
                projectsToShowCase = ["vistamate", "mieweb-timeharbor-main", "landing-page", "lattln-questionnaire-builder-main", "mieapi-mcp-server", "rankroom"];
            } else {
                const response = await fetch('/api/all-projects');
                projectsToShowCase = await response.json();
            }
            
            try {
                const promises = projectsToShowCase.map(async (project) => {
                    const response = await fetch(`/api/projects/${project}`);

                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${project}`);
                    }
                    const data = await response.json();
                    return {
                        name: project,
                        description: data.description || "No description available",
                        author: data.user || "Unknown",
                        projectURL: `https://${project}.opensource.mieweb.org`,
                        gitHubURL: "https://github.com/mieweb"
                    };
                });

                const results = await Promise.all(promises);
                setProjectDetails(results);
            } catch (err) {
                console.error('Error fetching project details:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, []);

    if (loading) {
        return (
            <div className={styles.projectShowcase}>
                <Heading as="h2" className={styles.projectTitle}>Featured Projects</Heading>
                <p>Loading projects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.projectShowcase}>
                <Heading as="h2" className={styles.projectTitle}>Featured Projects</Heading>
                <p>Error loading projects: {error}</p>
            </div>
        );
    }

    return (
        <BrowserOnly fallback={<div>Loading projects...</div>}>
            {() => {
                const { Button } = require("@vaadin/react-components/Button.js");
                const { Icon } = require("@vaadin/react-components/Icon.js");
                require('@vaadin/icons');
                
                return (
                    <div className={styles.projectShowcase}>
                        <div className={styles.projectGrid}>
                            {projectDetails.map((project) => (
                                <div key={project.name} className={styles.projectCard}>
                                    <div className={styles.projectHeader}>
                                        <div className={styles.projectInfo}>
                                            <h3 className={styles.projectName}>{project.name}</h3>
                                            <p className={styles.projectAuthor}>{project.author}</p>
                                        </div>
                                        <Link to={"https://github.com/mieweb"} style={{ textDecoration: 'none' }}>
                                            <GrGithub size={24} color="black" />
                                        </Link>
                                    </div>
                                    <p className={styles.projectDescription}>{project.description}</p>
                                    <Link to={project.projectURL} style={{ textDecoration: 'none' }}>
                                        <Button theme="tertiary-inline">
                                            View Project
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }}
        </BrowserOnly>
    );
}