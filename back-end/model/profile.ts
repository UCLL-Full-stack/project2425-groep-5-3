export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private gender: string;
  
    constructor(profile: { id?: number; firstName: string; lastName: string; email: string; gender: string }) {
      this.id = profile.id;
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.email = profile.email;
      this.gender = profile.gender;
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
  }
  