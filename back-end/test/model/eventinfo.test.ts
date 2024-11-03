import { EventInfo } from '../../model/eventInfo';

test('given: valid event info data, when: creating event info, then: event info is created with those values', () => {
    // given
    const eventInfoData = {
        id: 1,
        category: 'Music',
        location: 'Sportpaleis',
    };

    // when
    const eventInfo = new EventInfo(eventInfoData);

    // then
    expect(eventInfo.getId()).toEqual(eventInfoData.id);
    expect(eventInfo.getCategory()).toEqual(eventInfoData.category);
    expect(eventInfo.getLocation()).toEqual(eventInfoData.location);
});

test('given: missing category, when: creating event info, then: an error is thrown', () => {
    // given
    const invalidEventInfoData = {
        id: 2,
        category: '',
        location: 'Conference Room',
    };

    // when
    const createEventInfo = () => new EventInfo(invalidEventInfoData);

    // then
    expect(createEventInfo).toThrow('Category is required');
});

test('given: missing location, when: creating event info, then: an error is thrown', () => {
    // given
    const invalidEventInfoData = {
        id: 3,
        category: 'Workshop',
        location: '',
    };

    // when
    const createEventInfo = () => new EventInfo(invalidEventInfoData);

    // then
    expect(createEventInfo).toThrow('Location is required');
});
