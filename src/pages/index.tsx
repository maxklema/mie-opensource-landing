import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import NavButton from "@site/src/components/NavButton";
import React, { useEffect, useState } from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { GrGithub } from "react-icons/gr";

// Vaadin components

function HomepageHeader() {
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className={styles.gridOverlay}></div>
            <div className={styles.heroContainer}>
                <div>
                    <h1 className={styles.heroTitle}>Opensource at MIE</h1>
                    <p className={styles.heroParagraph}>Empowering collaboration and innovation through open source, one commit at a time</p>
                    <BrowserOnly fallback={<div>Loading buttons...</div>}>
                        {() => {
                            const { HorizontalLayout } = require('@vaadin/react-components/HorizontalLayout.js');
                            const NavButton = require("@site/src/components/NavButton").default;
                            
                            return (
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
                            );
                        }}
                    </BrowserOnly>
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
                        <Button>
                            View all Projects
                            <Icon icon="vaadin:arrow-right" slot={'suffix'} />
                        </Button>
                    </div>
                );
            }}
        </BrowserOnly>
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
