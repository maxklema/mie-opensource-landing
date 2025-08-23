import type { ReactNode } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

function DocumentationHighlites({ DiCode, GrCpu, GrCheckmark, GrCube }: { DiCode: any, GrCpu: any, GrCheckmark: any, GrCube: any }) {
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

function ManagingContainers({GrAdd, GrView, Snippet, Button, Icon, FaCode, FaTerminal}: {GrAdd: any, GrView: any, Snippet: any, Button: any, Icon: any, FaCode: any, FaTerminal: any}) {
    return (
        <div className={styles.ManagingContainersHeader}>
            <h2>Managing Containers</h2>
            <p>Create and access containers through multiple interfaces. Choose between command-line flexibility or web-based convenience.</p>
            <div className={styles.MCOptionsHeader}>
                <div className={styles.MCSection}>
                    <div className={styles.docIcon}>
                        <GrAdd size={24} color="white" />
                    </div>
                    <h3>Creating Containers</h3>
                    <p className={styles.MCSectionParagraph}>Deploy new containers instantly using your preferred method. The command line provides more flexibility while the web gui is more efficient.</p>
                    <div className={styles.mcInnerDiv}>
                        <h4>
                            <span className={styles.mcInnerDivIcon}>
                                <FaTerminal size={16} color="#2196F3" />
                            </span>
                            SSH Command
                        </h4>
                        <p>Get started quickly with Docker by running a simple container. This command creates and starts a new nginx web server container in detached mode.</p>
                         <SyntaxHighlighter className={styles.codeSnippet} language="bash" style={github} wrapLongLines={true}>
                            {"ssh create-container@opensource.mieweb.org"}
                        </SyntaxHighlighter>
                    </div>
                    <div className={styles.mcInnerDiv}>
                        <h4>Use the Web GUI</h4>
                        <p>Deploy and manage containers easily through the Proxmox Web GUI. While this approach is less flexible for more complex container setups, its a lot faster.</p>
                        <Link to="https://create-a-container.opensource.mieweb.org" style={{ textDecoration: 'none' }}>
                            <Button theme="primary" className={styles.Button}>
                                Open Web Interface
                                <Icon icon="vaadin:arrow-right" slot={'suffix'} />
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={styles.MCSection}>
                    <div className={styles.docIcon}>
                        <GrView size={24} color="white" />
                    </div>
                    <h3>Accessing Containers</h3>
                    <p className={styles.MCSectionParagraph}>Monitor and interact with your running containers through multiple access points.</p>
                    <div className={styles.mcInnerDiv}>
                        <h4>
                            <span className={styles.mcInnerDivIcon}>
                                <FaTerminal size={16} color="#2196F3" />
                            </span>
                            SSH Command
                        </h4>
                        <p>Connect securely to your running containers via SSH. Each container gets a unique URL that you can use to access your applications remotely.</p>
                        <SyntaxHighlighter className={styles.codeSnippet} language="bash" style={github} wrapLongLines>
                            {"ssh -p <port> <username>@opensource.mieweb.org"}
                        </SyntaxHighlighter>
                    </div>
                    <div className={styles.mcInnerDiv}>
                        <h4>Access via Proxmox Web GUI</h4>
                        <p>Manage all of your containers right from the Proxmox Web GUI. This provides a user-friendly interface for monitoring container metrics and interacting with your applications.</p>
                        <Link to="https://opensource.mieweb.org:8006" style={{ textDecoration: 'none' }}>
                            <Button theme="primary" className={styles.Button}>
                                Login to Proxmox
                                <Icon icon="vaadin:arrow-right" slot={'suffix'} />
                            </Button>
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
            title={`Home | ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHeader />
            <main>
                <BrowserOnly>
                    {() => {
                        const { Button } = require("@vaadin/react-components/Button.js");
                        const { Icon } = require("@vaadin/react-components/Icon.js");
                        const { DiCode } = require("react-icons/di");
                        const { GrCpu } = require("react-icons/gr");
                        const { GrCheckmark } = require("react-icons/gr");
                        const { GrCube } = require("react-icons/gr");
                        const { GrAdd } = require("react-icons/gr");
                        const { GrView } = require("react-icons/gr");
                        const { FaCode } = require("react-icons/fa");
                        const { FaTerminal } = require("react-icons/fa");
                        const { Snippet } = require("@heroui/snippet");
                        require('@vaadin/icons');
                        
                        return (
                            <>
                                <ManagingContainers GrAdd={GrAdd} GrView={GrView} Snippet={Snippet} Button={Button} Icon={Icon} FaCode={FaCode} FaTerminal={FaTerminal} />
                                <DocumentationHighlites DiCode={DiCode} GrCpu={GrCpu} GrCheckmark={GrCheckmark} GrCube={GrCube} />
                                <div className={styles.projectShowcase}>
                                    <Heading as="h2" className={styles.projectTitle}>Featured Projects</Heading>
                                    <p>Explore some of our open source projects</p>
                                    <BrowserOnly fallback={<div>Loading projects...</div>}>
                                        {() => {
                                            const ProjectGrid = require("@site/src/components/projectGrid").default;
                                            return <ProjectGrid />;
                                        }}
                                    </BrowserOnly>
                                    <Link to="/projects" style={{ textDecoration: 'none' }}>
                                        <Button className={styles.Button} theme="primary">
                                            View all Projects
                                            <Icon icon="vaadin:arrow-right" slot={'suffix'} />
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        );
                    }}
                </BrowserOnly>
            </main>
        </Layout>
    );
}
