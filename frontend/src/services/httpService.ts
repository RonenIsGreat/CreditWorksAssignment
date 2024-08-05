const url = "http://localhost:5454/";

export type entityType = "Vehicle" | "Manufacturer" | "Category";

class httpService<T> {
  async get(entity: entityType): Promise<T[]> {
    const response = await fetch(url + entity);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  }

  async getOne(entity: entityType, id: number): Promise<T> {
    const response = await fetch(`${url}${entity}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  }

  async post(entity: entityType, body: any) {
    const response = await fetch(url + entity, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  }

  async put(entity: entityType, id: number, body: any) {
    const response = await fetch(`${url}${entity}/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  }

  async delete(entity: entityType, id: number) {
    const response = await fetch(`${url}${entity}/${id}`, {
      method: "delete",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  }
}

const HttpService = new httpService();
export default HttpService;
