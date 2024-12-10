export type User = {
    username?: string;
    password?: string;
    profile: Profile;
    role?: string;
    events: Event[];
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
    createdAt: Date;
    eventInfos: EventInfos[];
    users: User[];
}

export type EventInfos = {
    id?: number;
    category: string;
    location: string;
}

