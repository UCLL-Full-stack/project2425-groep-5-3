import { EventInfo } from "./eventInfo";
import { User } from "./user";
import {
    Profile as ProfilePrisma,
    Event as EventPrisma,
    User as UserPrisma,
    EventInfo as EventInfoPrisma
} from '@prisma/client';

export class Event {
    private id?: number;
    private title: string;
    private description: string;
    private eventInfos: EventInfo[];

    constructor(event: {
        id?: number;
        title: string;
        description: string;
        eventInfos?: EventInfo[];
    }) {
        this.validate(event);
        this.id = event.id;
        this.title = event.title;
        this.description = event.description;
        this.eventInfos = event.eventInfos || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getEventInfos(): EventInfo[] {
        return this.eventInfos;
    }

    setTitle(title: string): void {
        this.title = title;
    }
    
    setDescription(description: string): void {
        this.description = description;
    }

    validate(event: {
        title: string;
        description: string;
        eventInfos?: EventInfo[];
    }) {
        if (!event.title?.trim()) {
            throw new Error('Title of event is required');
        }
        if (!event.description?.trim()) {
            throw new Error('Event description is required');
        }
    }

    equals(event: Event): boolean {
        return (
            this.title === event.getTitle() &&
            this.description === event.getDescription() &&
            this.eventInfos.every((eventInfo, index) => eventInfo.equals(event.getEventInfos()[index]))
        );
    }

    static from({ id, title, description, eventInfos }: EventPrisma & {eventInfos: EventInfoPrisma[]}) {
        return new Event({
            id,
            title,
            description,
            eventInfos: eventInfos.map((eventInfo) => EventInfo.from(eventInfo))
        });
    }
}
