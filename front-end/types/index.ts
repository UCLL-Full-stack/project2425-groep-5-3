export type User = {
    username?: string;
    password?: string;
    role?: string;
}

export type Profile = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
}

export type Event = {
    id?: number;
    title: string;
    description: string;
    eventInfos: EventInfo[];
}

export type EventInfo = {
    id?: number;
    category: string;
    location: string;
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};


