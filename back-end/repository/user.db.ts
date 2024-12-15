import { User } from '../model/user';
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                profile: true,
                events: {
                    include: {
                        eventInfos: true,
                    },
                },
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch(error) {
        console.error(error);
        throw new Error('Database error: See servor log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {
                profile: true,
                events: {
                    include: {
                        eventInfos: true,
                    },
                },
            },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default { getAllUsers, getUserById};