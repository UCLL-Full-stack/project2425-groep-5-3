type Role = 'admin' | 'participant' | 'guest';

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
    role: Role;
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
    eventInfos: EventInfoInput[];
    users: UserInput[]
}

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};

export {
    Role,
    UserInput,
    ProfileInput,
    EventInfoInput,
    EventInput,
    AuthenticationResponse
};
