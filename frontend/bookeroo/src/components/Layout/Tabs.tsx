import {
    AppBar,
    Tabs as TabsMUI,
    Tab,
    Box,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";

interface Props {
    tabs: { label: string; component: React.ReactNode }[];
}

// https://v4.mui.com/components/tabs/
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const renderChild = value === index ? children : undefined;

    return <div {...other}>{renderChild}</div>;
}

export default function Tabs(props: Props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <TabsMUI value={value} onChange={handleChange}>
                {props.tabs.map((tab, index) => (
                    <Tab key={`tab-${index}`} label={tab.label} />
                ))}
            </TabsMUI>
            {props.tabs.map((tab, index) => (
                <TabPanel key={`tabPanel-${index}`} value={value} index={index}>
                    {tab.component}
                </TabPanel>
            ))}
        </div>
    );
}
