// Wrote this on a whim, not used and NOT TESTED

export class List<T> {
    private items: T[] = [];

    constructor(elements?: T[]) {
        if (elements) {
            this.items = elements;
        }
    }

    public size(): number {
        return this.items.length;
    }

    public add(value: T): this {
        this.items.push(value);
        return this;
    }

    public remove(value: T): this {
        let index = -1;
        while (this.items
        && this.items.length > 0
        && (index = this.items.indexOf(value)) > -1) {
            this.items.splice(index, 1);
        }
        return this;
    }

    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    public indexOf(value: T): number {
        return this.items.indexOf(value);
    }

    public contains(value: T): boolean {
        return this.indexOf(value) !== -1;
    }

    public toArray(): T[] {
        return this.items;
    }

    public toIterator(): IterableIteratorShim<[number, T]> {
        return this.items.entries();
    }

    public forEach(func: (value: T, index: number, array: T[]) => void): void {
        this.items.forEach(func);
    }

    public reverse(): this {
        this.items.reverse();
        return this;
    }

    public toString(): string {
        return this.items.toString();
    }
}
