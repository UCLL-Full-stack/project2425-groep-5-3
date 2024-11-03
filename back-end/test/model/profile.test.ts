import { Profile } from '../../model/profile';

test('given: valid profile data, when: creating profile, then: profile is created with those values', () => {
    // given
    const profileData = { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', gender: 'F' };

    // when
    const profile = new Profile(profileData);

    // then
    expect(profile.getFirstName()).toEqual(profileData.firstName);
    expect(profile.getLastName()).toEqual(profileData.lastName);
    expect(profile.getEmail()).toEqual(profileData.email);
    expect(profile.getGender()).toEqual(profileData.gender);
});

test('given: missing first name, when: creating profile, then: an error is thrown', () => {
    // given
    const invalidProfileData = { firstName: '', lastName: 'Doe', email: 'jane.doe@example.com', gender: 'F' };

    // when
    const createProfile = () => new Profile(invalidProfileData);

    // then
    expect(createProfile).toThrow('First Name is required');
});

test('given: missing email, when: creating profile, then: an error is thrown', () => {
    // given
    const invalidProfileData = { firstName: 'Jane', lastName: 'Doe', email: '', gender: 'F' };

    // when
    const createProfile = () => new Profile(invalidProfileData);

    // then
    expect(createProfile).toThrow('Email is required');
});
