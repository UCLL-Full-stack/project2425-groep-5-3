import { User } from '../model/user';
import { Profile } from '../model/profile';

const users: User[] = [
    new User({ 
        id: 1,
        username: 'Robz459',
        password: '123',
        profile: new Profile({
            id : 1,
            firstName: "Robin",
            lastName: "De Koninck",
            email: "r0804949@ucll.be",
            gender: "M"
        }),
        role: "admin"
    }),
    new User({ 
        id: 2,
        username: 'appel',
        password: 'password',
        profile: new Profile({
            id : 2,
            firstName: "max",
            lastName: "Verstraeten",
            email: "max@gmail.be",
            gender: "M"
        }),
        role: "guest"
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = ({ id }: { id: number }): User | undefined => {
    return users.find(user => user.getId() === id);
};

export default { getAllUsers, getUserById };