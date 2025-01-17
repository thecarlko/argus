import { generateRocketAltitude } from "$lib/utilities/telemetry";
import { type Writable, writable } from "svelte/store";



export interface Canvas {
    title: string;
    widgets: (ChartProps | TrajectoryProps | StreamProps | RocketProps)[];
}


export interface WidgetProps {
    location: WidgetLocation;
    title?: string;
    type: "chart" | "stream" | "rocket" | "trajectory";
    backgroundType?: "shadow" | "solid" | "none" | string;
}

export interface WidgetLocation {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface TrajectoryProps extends WidgetProps {
    departure: [number, number]
    arrival: [number, number]  
}

export interface ChartProps extends WidgetProps {
    axisLabels?: [string | undefined, string | undefined]
    dataType: "altitude" | "velocity" | "temperature" | "pressure" | "acceleration" | "thrust" 
    graphType: ("line" | "area" | "dots" | "bar" | "hexgrid" | "box")[]
}

export interface StreamProps extends WidgetProps {

}

export interface RocketProps extends WidgetProps {

};


const charts: ChartProps[] = [
    {
        location: { x: 10, y: 24, width: 9, height: 14 },
        title: "Velocity",
        graphType: ["line", "area"],
        dataType: "velocity",
        axisLabels: ["time (s)", "km/s"],
        type: "chart"
    },
    {
        location: { x: 19, y: 24, width: 9, height: 14 },
        title: "Acceleration",
        graphType: ["line", "area"],
        dataType: "acceleration",
        axisLabels: ["time (s)", "km/s²"],
        type: "chart"
    },
    {
        location: { x: 1, y: 12, width: 9, height: 12 },
        title: "Altitude",
        graphType: ["area", "line"],
        dataType: "altitude",
        axisLabels: ["time (s)", "km"],
        type: "chart"
    },
    {
        location: { x: 28, y: 12, width: 9, height: 12 },
        title: "Pressure",
        graphType: ["line"],
        dataType: "pressure",
        axisLabels: ["time (s)", "k/Pa"],
        type: "chart"
    },
    {
        location: { x: 28, y: 24, width: 9, height: 14 },
        title: "Thrusters",
        graphType: ["box"],
        dataType: "thrust",
        axisLabels: ["Thusters I, II, III, and IV -- N/Kg", undefined],
        type: "chart"
    },
    {
        location: { x: 1, y: 24, width: 9, height: 14 },
        title: "Temperature",
        graphType: ["line"],
        axisLabels: ["time (s)", "°K"],
        dataType: "temperature",
        type: "chart"
    }
];

const trajectory: TrajectoryProps = {
    location: { x: 1, y: 1, width: 9, height: 11 },
    title: "Trajectory",
    type: "trajectory",
    departure: [-82.9988, 39.9612],
    arrival: [-97.7431, 30.2672],
};

const stream: StreamProps = {
    location: { x: 28, y: 1, width: 9, height: 11 },
    title: "Video Camera 1",
    type: "stream",
};

const rocket: RocketProps = {
    location: { x: 10, y: 1, width: 18, height: 23 },
    title: "Rocket",
    type: "rocket",
    backgroundType: "none",
};

const dashboardViews: any[] = [
    trajectory,
    ...charts,
    stream,
    rocket
];


export let playing: Writable<boolean> = writable(true);
export let canvasIndex: Writable<number> = writable(0);
export const canvasTabs: Writable<Canvas[]> = writable([
    { title: "Mission Control", widgets: dashboardViews },
    { title: "Trajectory", widgets: [] },
]);

