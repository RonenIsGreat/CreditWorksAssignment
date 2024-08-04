import { Vehicle } from "../models/vehicle";
import HttpService from "./httpService";

class vehicleService {
    async get(): Promise<Vehicle[]> {
        return HttpService.get('Vehicle') as Promise<Vehicle[]>;
    }
}

const VehicleService = new vehicleService();
export default VehicleService;