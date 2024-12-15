import userDB from '../repository/user.db';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    return user;
};

export default { getAllUsers, getUserById};