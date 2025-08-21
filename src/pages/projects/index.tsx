import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { ReactNode, useEffect, useState } from "react";
import ProjectGrid from "@site/src/components/projectGrid";

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <main>
                <ProjectGrid />
            </main>
        </Layout>
    );
}