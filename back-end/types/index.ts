type Role = 'admin' | 'guest';

type ProfileInput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
}

type UserInput = {
    id?: number;
    username: string;
    password: string;
    profile: ProfileInput;
};

type EventInfoInput = {
    id?: number;
    category: string;
    location: string;
}

type EventInput = {
    id?: number;
    title: string;
    description: string;
    createdAt: Date;
    eventInfo: EventInfoInput;
}

export {
    Role,
    UserInput,
    ProfileInput,
    EventInfoInput,
    EventInput,
};
