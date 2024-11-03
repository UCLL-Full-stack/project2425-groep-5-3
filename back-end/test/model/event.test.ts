import { Event } from '../../model/event';
import { EventInfo } from '../../model/eventInfo';

test('given: valid event data, when: creating event, then: event is created with those values', () => {
    // given
    const eventInfo = new EventInfo({ id: 1, category: 'Sports', location: 'Stadium' });
    const eventData = {
        title: 'Football Match',
        description: 'Football match at stadium',
        createdAt: new Date(),
        eventInfo: eventInfo,
    };

    // when
    const event = new Event(eventData);

    // then
    expect(event.getTitle()).toEqual(eventData.title);
    expect(event.getDescription()).toEqual(eventData.description);
    expect(event.getCreatedAt()).toEqual(eventData.createdAt);
    expect(event.getEventInfo()).toEqual(eventInfo);
});

test('given: missing title, when: creating event, then: an error is thrown', () => {
    // given
    const eventInfo = new EventInfo({ id: 1, category: 'Tech', location: 'Campus' });
    const invalidEventData = {
        title: '',
        description: 'Tech conference at campus',
        createdAt: new Date(),
        eventInfo: eventInfo,
    };

    // when
    const createEvent = () => new Event(invalidEventData);

    // then
    expect(createEvent).toThrow('Title of event is required');
});

