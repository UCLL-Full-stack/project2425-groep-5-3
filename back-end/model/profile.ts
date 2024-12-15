import {
  Profile as ProfilePrisma,
  Event as EventPrisma,
  User as UserPrisma
} from '@prisma/client';

export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private gender: string;
  
    constructor(profile: { id?: number; firstName: string; lastName: string; email: string; gender: string }) {
      this.validate(profile);
      this.id = profile.id;
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.email = profile.email;
      this.gender = profile.gender;
    }

    static from({id, firstName, lastName, email, gender}: ProfilePrisma){
      return new Profile({
          id,
          firstName,
          lastName,
          email,
          gender,
      });
  }
  
    getId(): number | undefined {
      return this.id;
    }
  
    getFirstName(): string {
      return this.firstName;
    }
  
    getLastName(): string {
      return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getGender(): string {
        return this.gender;
    }
  
    setFirstName(firstName: string): void {
      this.firstName = firstName;
    }
  
    setLastName(lastName: string): void {
      this.lastName = lastName;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setGender(gender: string): void {
        this.gender = gender;
    }

    validate(profile: {
        firstName: string;
        lastName: string;
        email: string;
        gender: string;
    }) {
        if (!profile.firstName?.trim()) {
            throw new Error('First Name is required');
        }
        if (!profile.lastName?.trim()) {
            console.log('Last Name is required')
            throw new Error('Last Name is required');
        }
        if (!profile.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!profile.gender) {
            throw new Error('Gender is required');
        }
    }
  }
  