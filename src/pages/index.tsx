import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import NavButton from "@site/src/components/NavButton";

// Vaadin components

import { Button } from "@vaadin/react-components/Button.js";
import { Icon } from "@vaadin/react-components/Icon.js";
import '@vaadin/icons';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js'; // Example for layout


function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
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

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
