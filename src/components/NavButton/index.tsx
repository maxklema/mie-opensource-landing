import React from 'react';
import { Button } from "@vaadin/react-components/Button.js";
import { Icon } from "@vaadin/react-components/Icon.js";
import '@vaadin/icons';

interface NavButtonProps {
    href: string;
    icon: string;
    text: string;
    theme?: string;
}

export default function NavButton({ href, icon, text, theme = "primary" }: NavButtonProps) {
    const handleClick = () => {
        window.location.href = href;
    };

    return (
        <Button theme={theme} onClick={handleClick}>
            <Icon icon={icon} slot="prefix" />
            {text}
        </Button>
    );
}