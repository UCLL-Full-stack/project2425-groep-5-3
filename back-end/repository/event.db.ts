import { Event } from '../model/event';
import { EventInfo } from '../model/eventInfo';
import database from './database';


const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventsPrisma = await database.event.findMany({
            include: {
               eventInfos: true,
            },
        });
        return eventsPrisma.map((eventPrisma) => Event.from(eventPrisma));
    } catch(error) {
        console.error(error);
        throw new Error('Database error: See servor log for details.');
    }
};

const getEventById = async ({ id }: { id: number }): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findUnique({
            where: { id },
            include: {
                eventInfos: true,
            },
        });

        return eventPrisma ? Event.from(eventPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllEvents, getEventById};