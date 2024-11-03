import { Event } from '../model/event';
import { EventInfo } from '../model/eventInfo';

const events: Event[] = [
    new Event({ 
        id: 1,
        title: 'Conference',
        description: 'Tech conference',
        createdAt: new Date(),
        eventInfo: new EventInfo({
            id : 1,
            category: "IT",
            location: "Leuven"
        })
    }),
    new Event({ 
        id: 2,
        title: 'Meeting',
        description: 'Schedule changes',
        createdAt: new Date(),
        eventInfo: new EventInfo({
            id : 2,
            category: "Work",
            location: "Zaventem"
        })
    }),
];

const getAllEvents = (): Event[] => {
    return events;
};

const getEventById = ({ id }: { id: number }): Event | undefined => {
    return events.find(event => event.getId() === id);
};

export default { getAllEvents, getEventById };