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
    data: any[]
    axisLabels?: [string | undefined, string | undefined]
    dataType?: "scalar" | "vector" | "trigonal" | "quaternion"
    graphType: ("line" | "area" | "dots" | "bar" | "hexgrid" | "box")[]
}

export interface StreamProps extends WidgetProps {

}

export interface RocketProps extends WidgetProps {

};


const velocity = [0, 5, 20, 50, 90, 130, 170, 200, 220, 230, 220, 200, 170, 130, 90, 50, 20, 0, -5];
const altitude = [0, 2, 8, 18, 32, 50, 72, 98, 128, 162, 190, 212, 228, 238, 242, 240, 232, 218, 200];
const thrusters = [20, 12, 37, 87, 54];

const charts: ChartProps[] = [
    {
        location: { x: 10, y: 24, width: 9, height: 14 },
        title: "Velocity",
        graphType: ["line", "area"],
        data: velocity,
        axisLabels: ["time (s)", "m/s"],
        type: "chart"
    },
    {
        location: { x: 19, y: 24, width: 9, height: 14 },
        title: "Velocity",
        graphType: ["line", "area"],
        data: [0, 10, 20, 30, 40, 50, 55],
        axisLabels: ["time (s)", "m/s"],
        type: "chart"
    },
    {
        location: { x: 1, y: 12, width: 9, height: 12 },
        title: "Altitude",
        graphType: ["area", "line"],
        data: altitude,
        axisLabels: ["time (s)", "km"],
        type: "chart"
    },
    {
        location: { x: 28, y: 12, width: 9, height: 12 },
        title: "Pressure",
        graphType: ["bar"],
        data: [...velocity.slice(2, 15), altitude.slice(7)],
        axisLabels: ["time (s)", "k/Pa"],
        type: "chart"
    },
    {
        location: { x: 28, y: 24, width: 9, height: 14 },
        title: "Thrusters",
        graphType: ["box"],
        data: thrusters,
        axisLabels: ["Thusters I, II, III, and IV", undefined],
        type: "chart"
    },
    {
        location: { x: 1, y: 24, width: 9, height: 14 },
        title: "Temperature",
        graphType: ["line", "bar"],
        axisLabels: ["time (s)", undefined],
        data: velocity,
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


export let canvasIndex: Writable<number> = writable(0);
export const canvasTabs: Writable<Canvas[]> = writable([
    { title: "Mission Control", widgets: dashboardViews },
    { title: "Trajectory", widgets: [] },
]);

