import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { ReactNode, useEffect, useRef, useState } from "react";
import ProjectGrid from "@site/src/components/projectGrid";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <main>
                <div className={styles.projectShowcase}>
                    <Heading as="h2" className="projectTitle">MIE Opensource Projects</Heading>
                    <p>Explore our open source projects and contributions.</p>
                    <ProjectGrid ProjectList={[""]} itemsPerPage={9}/>
                </div>
            </main>
        </Layout>
    );
}