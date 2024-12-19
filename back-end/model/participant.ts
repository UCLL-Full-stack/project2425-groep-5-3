import { User } from './user';
import { Event } from './event';

export class Participant {
  private id: number;
  private user: User;
  private events: Event[];

  constructor(participant: {
    id: number;
    user: User;
    events: Event[];
  }) {
    this.id = participant.id;
    this.user = participant.user;
    this.events = participant.events;
  }

  getId(): number {
    return this.id;
  }

  getUser(): User {
    return this.user;
  }

  getEvents(): Event[] {
    return this.events;
  }

  // Validate participant information
  validate(participant: {
    user: User;
    events: Event[];
  }) {
    if (!participant.user) {
      throw new Error('User is required');
    }
    if (!participant.events) {
      throw new Error('Event is required');
    }
  }

  equals(participant: Participant): boolean {
    return (
      this.user === participant.getUser() &&
      this.events.every((event, index) => event.equals(participant.getEvents()[index]))
    );
  }
}
