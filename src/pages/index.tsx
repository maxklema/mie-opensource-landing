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
                            <div className={styles.projectShowcase}>
                                <Heading as="h2" className={styles.projectTitle}>Featured Projects</Heading>
                                <p>Explore some of our open source projects and contributions.</p>
                                    <ProjectGrid />
                                <Link to="/projects" style={{ textDecoration: 'none' }}>
                                    <Button theme="primary">
                                        View all Projects
                                        <Icon icon="vaadin:arrow-right" slot={'suffix'} />
                                    </Button>
                                </Link>
                            </div>
                        );
                    }}
                </BrowserOnly>
            </main>
        </Layout>
    );
}
