import { Repository } from "typeorm";
import { EventCategories } from "../entities/Event";

export class EventCategoryService {
  private eventCategoryRepository: Repository<EventCategories>;

  constructor(eventCategoryRepository: Repository<EventCategories>) {
    this.eventCategoryRepository = eventCategoryRepository;
  }

  async getAllCategories(): Promise<EventCategories[]> {
    return await this.eventCategoryRepository.find();
  }
  async createCategory(categoryName: string, eventId: number){
    const newCategory = this.eventCategoryRepository.create({ categoryName, event: { id: eventId } });
    return await this.eventCategoryRepository.save(newCategory);
  }

  async deleteCategory(id: number){
    const category = await this.eventCategoryRepository.findOneBy({ id });
    if (!category) return null;
    await this.eventCategoryRepository.softDelete({ id });
    return category;
  }
}