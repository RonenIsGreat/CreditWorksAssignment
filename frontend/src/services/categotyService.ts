import { Category } from "../models/category";
import HttpService from "./httpService";

class categoryService {
  async get(): Promise<Category[]> {
    return HttpService.get("Category") as Promise<Category[]>;
  }

  async getOne(id: number): Promise<Category> {
    return HttpService.getOne("Category", id) as Promise<Category>;
  }

  async post(category: Category): Promise<any> {
    return HttpService.post("Category", category);
  }

  async put(category: Category): Promise<any> {
    return HttpService.put("Category", category.categoryId, category);
  }

  async delete(id: number): Promise<any> {
    return HttpService.delete("Category", id);
  }
}

const CategoryService = new categoryService();
export default CategoryService;
