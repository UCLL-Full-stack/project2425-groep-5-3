export class EventInfo {
    private id?: number;
    private category: string;
    private location: string;
  
    constructor(eventInfo: { id?: number; category: string; location: string;}) {
      this.id = eventInfo.id;
      this.category = eventInfo.category;
      this.location = eventInfo.location;
    }
  
    getId(): number | undefined {
      return this.id;
    }
  
    getCategory(): string {
      return this.category;
    }
  
    getLocation(): string {
      return this.location;
    }
  
    setCategory(category: string): void {
      this.category = category;
    }
  
    setLocation(location: string): void {
      this.location = location;
    }
  }
  