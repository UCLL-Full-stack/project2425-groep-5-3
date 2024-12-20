import eventDB from '../repository/event.db';
import { Event } from '../model/event';
import { EventInput } from '../types';

const getAllEvents = async (): Promise<Event[]> => eventDB.getAllEvents();

const getEventById = async (id: number): Promise<Event> => {
    const event = await eventDB.getEventById({ id });
    if (!event) {
        throw new Error(`Event with id ${id} does not exist.`);
    }
    return event;
};

const getEventByTitle = async ({ title }: { title: string }): Promise<Event> => {
    const event = await eventDB.getEventByTitle({ title });
    if (!event) {
        throw new Error(`Event with title: ${title} does not exist.`);
    }
    return event;
};

const createEvent = async ({
    title,
    description,
    eventInfos,
}: EventInput): Promise<Event> => {
    const existingEvent = await eventDB.getEventByTitle({ title });

    if (existingEvent) {
        throw new Error(`Event with title ${title} is already registered.`);
    }

    const event = new Event({ title, description, eventInfos: []});

    return await eventDB.createEvent(event);
};

const deleteEvent = async ({id}: {id : number}): Promise<void> => {
    const existingEvent = await eventDB.getEventById({ id });

    if (!existingEvent) {
        throw new Error(`Event with ID ${id} does not exist.`);
    }
    try {
        await eventDB.deleteEvent(existingEvent);
    } catch (error) {
        throw new Error('Failed to delete the event. Please try again later.');
    }
};

const updateEvent = async ({ id }: { id: number }, {title, description, eventInfos}: EventInput): Promise<Event> => {
    const existingEvent = await eventDB.getEventById({id});

    if (!existingEvent) {
        throw new Error(`Event with ID ${id} does not exist.`);
    }

    const updatedEvent = new Event({ title, description, eventInfos: []});

    return await eventDB.updateEvent(id, updatedEvent);;
};

export default { getAllEvents, getEventById, createEvent, deleteEvent, updateEvent};