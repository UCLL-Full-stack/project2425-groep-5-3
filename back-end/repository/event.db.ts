import { Event } from '../model/event';
import { EventInfo } from '../model/eventInfo';
import { EventInput } from '../types';
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

const getEventByTitle = async ({ title }: { title: string }): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findFirst({
            where: { title },
            include: {
                eventInfos: true,
            }
        });

        return eventPrisma ? Event.from(eventPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createEvent = async (event: Event): Promise<Event> => {
    try {
        const eventPrisma = await database.event.create({
            data: {
                title: event.getTitle(),
                description: event.getDescription(),
                eventInfos: {
                    connect: event.getEventInfos().map((event) => ({ id: event.getId() })),
                } 
            },
            include: { eventInfos: true},
        });
        return Event.from(eventPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteEvent = async (event: Event): Promise<void> => {
    try {
        await database.event.delete({
            where: { id: event.getId() }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const updateEvent = async (id: number, event:Event): Promise<Event> => {
    try {
        const eventPrisma = await database.event.update({
            where: { id },
            data: {
                title : event.getTitle(),
                description: event.getDescription(),
                eventInfos: {
                    connect: event.getEventInfos().map((event) => ({ id: event.getId() })),
                },
            }, 
            include: {
                eventInfos: true,
            }
        });
        return Event.from(eventPrisma); 
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllEvents, getEventById, getEventByTitle, createEvent, deleteEvent, updateEvent};