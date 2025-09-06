export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
    }

    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val
        };
        
        this.#cache.set(key, entry)
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key) as CacheEntry<T> | undefined;
        return entry?.val;
    }

    #reap() {
        const now = Date.now();
         for (const [key, entry] of this.#cache) {
            const createdAt = entry?.createdAt;
            if (typeof createdAt === 'number' && createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            };
         };
    }

    #startReapLoop() {
        const intervalID = setInterval(this.#reap, this.#interval);
        this.#reapIntervalId = intervalID;
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

}
