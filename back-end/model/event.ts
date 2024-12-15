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
    private createdAt: Date;
    private eventInfos: EventInfo[];

    constructor(event: {
        id?: number;
        title: string;
        description: string;
        createdAt: Date;
        eventInfos?: EventInfo[];
    }) {
        this.validate(event);
        this.id = event.id;
        this.title = event.title;
        this.description = event.description;
        this.createdAt = event.createdAt;
        this.eventInfos = event.eventInfos || [];
    }

    static from({id, title, description, createdAt, eventInfos}: EventPrisma & {eventInfos: EventInfoPrisma[]}){
        return new Event({
            id,
            title,
            description,
            createdAt,
            eventInfos: eventInfos.map((eventInfo) => EventInfo.from(eventInfo))
        });
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

    getCreatedAt(): Date {
        return this.createdAt;
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
    
    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    validate(event: {
        title: string;
        description: string;
        createdAt: Date;
        eventInfos?: EventInfo[];
        users?: User[];
    }) {
        if (!event.title?.trim()) {
            throw new Error('Title of event is required');
        }
        if (!event.description?.trim()) {
            throw new Error('Event description is required');
        }
        if (!event.createdAt) {
            throw new Error('Date of created event is required');
        }
    }

    equals(event: Event): boolean {
        return (
            this.title === event.getTitle() &&
            this.description === event.getDescription() &&
            this.createdAt === event.getCreatedAt() &&
            this.eventInfos.every((eventInfo, index) => eventInfo.equals(event.getEventInfos()[index]))
        );
    }
}
