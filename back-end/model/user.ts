import { ro } from "date-fns/locale";
import { Role } from "../types";
import { Profile } from "./profile";

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private profile: Profile;
    private role: Role;

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        profile: Profile;
        role: Role;
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.profile = user.profile;
        this.role = user.role;
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

    getProfile(): Profile | undefined{
        return this.profile;
    }

    getRole(): Role | undefined{
        return this.role;
    }

    setUsername(userName: string) {
        this.username = userName;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setProfile(profile: Profile) {
        this.profile = profile;
    }

    validate(user: {
        username: string;
        password: string;
        profile: Profile;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (user.profile) {
            user.profile.validate({
                firstName: user.profile.getFirstName(),
                lastName: user.profile.getLastName(),
                email: user.profile.getEmail(),
                gender: user.profile.getGender(),
            });
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.profile === user.getProfile() &&
            this.role === user.getRole()
        );
    }
}
