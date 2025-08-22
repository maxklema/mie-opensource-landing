import type { ReactNode } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import ProjectGrid from "@site/src/components/projectGrid";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import { DiCode } from "react-icons/di";
import { GrCpu } from "react-icons/gr";
import { GrCheckmark } from "react-icons/gr";
import { GrCube } from "react-icons/gr";

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
                                        href="/projects" 
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

function DocumentationHighlites() {
    return (
        <div className={styles.documentationHighlightsParent}>
            <div className={styles.docGridOverlay}></div>
            <div className={styles.documentationHighlights}>
                <h2>Documentation Highlights</h2>
                <p className={styles.docIntro}>Explore our latest documentation to learn everything you need to know about getting set up with Proxmox, creating containers, and setting up automated deployments</p>

                <div className={styles.documentationGrid}>
                    <div className={styles.docSection}>
                        <div className={styles.docIcon}>
                            <GrCpu size={24} color="white" />
                        </div>
                        <h3>Opensource Infrastructure</h3>
                        <p className={styles.docDescription}>
                            Our robust infrastructure is built on Proxmox, providing a secure and scalable environment for all your containerized applications.
                        </p>
                        
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>Proxmox virtualization platform</span>
                        </div>
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>High-availability cluster</span>
                        </div>
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>Security with Wazuh and LDAP</span>
                        </div>
                        
                        <Link to="/docs/infrastructure/overview" className={styles.docLink}>
                            Learn about our infrastructure →
                        </Link>
                    </div>
                
                    <div className={styles.docSection}>
                        <div className={styles.docIcon}>
                            <GrCube size={24} color="white" />
                        </div>
                        <h3>Manage and Create a Container</h3>
                        <p className={styles.docDescription}>
                            Create and deploy containers quickly with multiple interfaces to suit your workflow, from simple apps to complex systems.
                        </p>
                        
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>Web GUI and CLI tools</span>
                        </div>
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>Single and multi-component deployments</span>
                        </div>
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>Predefined templates</span>
                        </div>
                        
                        <Link to="/docs/creating-containers/basic-containers/web-gui" className={styles.docLink}>
                            Get started with containers →
                        </Link>
                    </div>
                    
                    <div className={styles.docSection}>
                        <div className={styles.docIcon}>
                            <DiCode size={36} color="white" />
                        </div>
                        <h3>Automate your Workflow</h3>
                        <p className={styles.docDescription}>
                            Streamline your development process with our integrated CI/CD pipeline that creates environments for each branch automatically.
                        </p>
                        
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>GitHub Actions integration</span>
                        </div>
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>Isolated container environments</span>
                        </div>
                        <div className={styles.checklistItem}>
                            <GrCheckmark className={styles.checkIcon} />
                            <span>Public URLs and SSH access</span>
                        </div>
                        
                        <Link to="/docs/proxmox-launchpad/what-is-proxmox-launchpad" className={styles.docLink}>
                            Explore automation options →
                        </Link>
                    </div>
                </div>
            </div>
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
                <BrowserOnly>
                    {() => {
                        const { Button } = require("@vaadin/react-components/Button.js");
                        const { Icon } = require("@vaadin/react-components/Icon.js");
                        require('@vaadin/icons');
                        
                        return (
                            <>
                                <div className={styles.projectShowcase}>
                                    <Heading as="h2" className={styles.projectTitle}>Featured Projects</Heading>
                                    <p>Explore some of our open source projects</p>
                                    <ProjectGrid />
                                    <Link to="/projects" style={{ textDecoration: 'none' }}>
                                        <Button className={styles.Button} theme="primary">
                                            View all Projects
                                            <Icon icon="vaadin:arrow-right" slot={'suffix'} />
                                        </Button>
                                    </Link>
                                </div>
                                <DocumentationHighlites />
                            </>
                        );
                    }}
                </BrowserOnly>
            </main>
        </Layout>
    );
}
