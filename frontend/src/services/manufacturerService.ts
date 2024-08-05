import { Manufacturer } from "../models/manufacturer";
import HttpService from "./httpService";

class manufacturerService {
  async get(): Promise<Manufacturer[]> {
    return HttpService.get("Manufacturer") as Promise<Manufacturer[]>;
  }

  async getOne(id: number): Promise<Manufacturer> {
    return HttpService.getOne("Manufacturer", id) as Promise<Manufacturer>;
  }

  async post(manufacturer: Manufacturer): Promise<any> {
    return HttpService.post("Manufacturer", manufacturer);
  }

  async put(manufacturer: Manufacturer): Promise<any> {
    return HttpService.put(
      "Manufacturer",
      manufacturer.manufacturerId,
      manufacturer
    );
  }

  async delete(id: number): Promise<any> {
    return HttpService.delete("Manufacturer", id);
  }
}

const ManufacturerService = new manufacturerService();
export default ManufacturerService;
