import { Vehicle } from "../models/vehicle";
import HttpService from "./httpService";

class vehicleService {
  async get(): Promise<Vehicle[]> {
    return HttpService.get("Vehicle") as Promise<Vehicle[]>;
  }

  async getOne(id: number): Promise<Vehicle> {
    return HttpService.getOne("Vehicle", id) as Promise<Vehicle>;
  }

  async post(vehicle: Vehicle): Promise<any> {
    return HttpService.post("Vehicle", vehicle);
  }

  async put(vehicle: Vehicle): Promise<any> {
    return HttpService.put("Vehicle", vehicle.vehicleId, vehicle);
  }

  async delete(id: number): Promise<any> {
    return HttpService.delete("Vehicle", id);
  }
}

const VehicleService = new vehicleService();
export default VehicleService;
