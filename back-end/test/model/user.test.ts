import { User } from '../../model/user'; 
import { Profile } from '../../model/profile'; 

const validprofile = new Profile({ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', gender: 'M' });

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given
    
    // when
    const user = new User({ username: 'janedoe', password: 'securePass123', profile: validprofile, role: 'admin' });

    // then
    expect(user.getUsername()).toBe('janedoe');
    expect(user.getPassword()).toBe('securePass123');
    expect(user.getProfile()?.getFirstName()).toBe('Jane');
    expect(user.getRole()).toBe('admin');
});

test('given: invalid username, when: creating user, then: an error is thrown', () => {
    // given

    // when
    const user = () => new User({
        username: '', // Invalid username
        password: 'password123',
        profile: validprofile,
        role: 'admin', 
    });
    // then
    expect(user).toThrow('Username is required');
});