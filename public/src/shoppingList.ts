export class ShoppingList {
    private items: string[] = [];

    addItem(item: string): void {
        this.items.push(item);
    }

    getItems(): string[] {
        return this.items;
    }
}

