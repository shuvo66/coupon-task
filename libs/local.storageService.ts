class LocalStorageService {
	private storage: Storage | undefined;
    
	constructor() {
        if (typeof window !== "undefined") {
            this.storage =  window.localStorage;
          }
	}

	get<T>(key: string): T | null {
		const value = this.storage && this.storage?.getItem(key);
		return value ? JSON.parse(value) : null;
	}

	set(key: string, value: unknown) {
        this.storage && this.storage.setItem(key, JSON.stringify(value));
	}

	remove(key: string) {
        this.storage && this.storage.removeItem(key);
	}
}

export const localStorageService = new LocalStorageService();
