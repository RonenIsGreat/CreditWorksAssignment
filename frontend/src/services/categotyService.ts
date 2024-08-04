import { Category } from "../models/category";
import HttpService from "./httpService";

class categoryService {
    async get(): Promise<Category[]> {
        return HttpService.get('Category') as Promise<Category[]>;
    }
}

const CategoryService = new categoryService();
export default CategoryService;