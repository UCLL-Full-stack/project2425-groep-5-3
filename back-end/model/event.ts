import { EventInfo } from "./eventInfo";

export class Event {
    private id?: number;
    private title: string;
    private description: string;
    private createdAt: Date;
    private eventInfo: EventInfo;

    constructor(event: {
        id?: number;
        title: string;
        description: string;
        createdAt: Date;
        eventInfo: EventInfo;
    }) {
        this.id = event.id;
        this.title = event.title;
        this.description = event.description;
        this.createdAt = event.createdAt;
        this.eventInfo = event.eventInfo;
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

    getEventInfo(): EventInfo {
        return this.eventInfo;
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
    
    setEventInfo(eventInfo: EventInfo): void {
        this.eventInfo = eventInfo;
    }

    equals(event: Event): boolean {
        return (
            this.title === event.getTitle() &&
            this.description === event.getDescription() &&
            this.createdAt === event.getCreatedAt() &&
            this.eventInfo === event.getEventInfo()
        );
    }
}
