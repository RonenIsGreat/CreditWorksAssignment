import { Manufacturer } from "../models/manufacturer";
import HttpService from "./httpService";

class manufacturerService {
    async get(): Promise<Manufacturer[]> {
        return HttpService.get('Manufacturer') as Promise<Manufacturer[]>;
    }
}

const ManufacturerService = new manufacturerService();
export default ManufacturerService;