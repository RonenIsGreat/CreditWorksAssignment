const url = 'http://localhost:5454/';

export type entityType = 'Vehicle' | 'Manufacturer' | 'Category';

class httpService<T> {
    async get(entity: entityType): Promise<T[]> {
        const response = await fetch(url + entity);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }
}

const HttpService = new httpService();
export default HttpService;