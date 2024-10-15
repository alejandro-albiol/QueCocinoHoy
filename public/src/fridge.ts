export class Fridge {
    private items: string[] = [];

    addItem(item: string): void {
        this.items.push(item);
    }

    getItems(): string[] {
        return this.items;
    }
}

