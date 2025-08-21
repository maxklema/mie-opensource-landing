import React from 'react';
import { Button } from "@vaadin/react-components/Button.js";
import { Icon } from "@vaadin/react-components/Icon.js";
import '@vaadin/icons';
import Link from '@docusaurus/Link';

interface NavButtonProps {
    href: string;
    icon: string;
    text: string;
    theme?: string;
}

export default function NavButton({ href, icon, text, theme = "primary" }: NavButtonProps) {
    return (
        <Link to={href} style={{ textDecoration: 'none' }}>
            <Button theme={theme}>
                <Icon icon={icon} slot="prefix" />
                {text}
            </Button>
        </Link>
    );
}