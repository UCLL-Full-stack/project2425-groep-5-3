import { Role } from "../types";
import { Profile } from "./profile";
import { Event } from "./event";
import {
    Profile as ProfilePrisma,
    Event as EventPrisma,
    User as UserPrisma,
    EventInfo as EventInfoPrisma
} from '@prisma/client';
import { EventInfo } from "./eventInfo";

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    static from({id, username, password, role}: UserPrisma) {
        return new User({
            id,
            username,
            password,
            role: role as Role,
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role{
        return this.role;
    }

    setUsername(userName: string) {
        this.username = userName;
    }

    setPassword(password: string) {
        this.password = password;
    }

    validate(user: {
        username: string;
        password: string;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        )
    }
}
