import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import NavButton from "@site/src/components/NavButton";
import React, { useEffect, useState } from "react";

// Vaadin components

import { Button } from "@vaadin/react-components/Button.js";
import { Icon } from "@vaadin/react-components/Icon.js";
import '@vaadin/icons';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js'; // Example for layout
import { GrGithub } from "react-icons/gr";


function HomepageHeader() {
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className={styles.gridOverlay}></div>
            <div className={styles.heroContainer}>
                <div>
                    <h1 className={styles.heroTitle}>Opensource at MIE</h1>
                    <p className={styles.heroParagraph}>Empowering collaboration and innovation through open source, one commit at a time</p>
                    <HorizontalLayout theme="spacing" className={styles.buttons}>
                        <NavButton 
                            href="/" 
                            icon="vaadin:cubes" 
                            text="Projects" 
                        />
                        <NavButton 
                            href="/docs/intro" 
                            icon="vaadin:arrow-right" 
                            text="Getting Started" 
                        />
                    </HorizontalLayout>
                </div>
            </div>
        </header>
    );
}

interface ProjectDetails {
    name: string;
    description: string;
    author: string;
    projectURL: string;
    gitHubURL: string;
}

function ProjectShowcase() {
    const [projectDetails, setProjectDetails] = useState<ProjectDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const projectsToShowCase = ["vistamate", "mieweb-timeharbor-main", "landing-page", "lattln-questionnaire-builder-main", "mieapi-mcp-server", "rankroom",];
            
            try {
                const promises = projectsToShowCase.map(async (project) => {
                    const response = await fetch(`http://localhost:3001/api/projects/${project}`);

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

    const handleClick = (href: string) => {
        window.open(href, '_blank');
    }

    return (
        <div className={styles.projectShowcase}>
            <Heading as="h2" className={styles.projectTitle}>Featured Projects</Heading>
            <p className={styles.projectDescription}>Explore our latest open source projects and contributions.</p>
            <div className={styles.projectGrid}>
                {projectDetails.map((project) => (
                    <div key={project.name} className={styles.projectCard}>
                        <div className={styles.projectHeader}>
                            <div className={styles.projectInfo}>
                                <h3 className={styles.projectName}>{project.name}</h3>
                                <p className={styles.projectAuthor}>{project.author}</p>
                            </div>
                            <GrGithub size={24} color="black" onClick={() => handleClick("https://github.com/mieweb")} />
                        </div>
                        <p className={styles.projectDescription}>{project.description}</p>
                        <Button theme="tertiary-inline" onClick={() => handleClick(project.projectURL)}>View Project</Button>
                    </div>
                ))}
            </div>
            <Button>
                View all Projects
                <Icon icon="vaadin:arrow-right" slot={'suffix'} />
            </Button>
        </div>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader />
            <main>
                <ProjectShowcase />
            </main>
        </Layout>
    );
}
