import { Repository, In } from "typeorm";
import { EventCategories } from "../entities/Event.js";
import { BaseService } from "./baseService.js";
import { GraphQLError } from "graphql";

export class CategoryService extends BaseService<EventCategories> {
  constructor(repository: Repository<EventCategories>) {
    super(repository);
  }

  async createCategory(categoryName: string, description?: string): Promise<EventCategories> {
    return this.executeOperation(async () => {
      const existingCategory = await this.repository.findOne({ 
        where: { categoryName } 
      });

      if (existingCategory) {
        throw new GraphQLError("Category already exists", {
          extensions: {
            code: 'BAD_USER_INPUT',
            field: 'name'
          }
        });
      }

      const category = this.repository.create({
        categoryName,
        description
      });

      return this.repository.save(category);
    });
  }

  async updateCategory(
    id: number, 
    updates: { categoryName?: string; description?: string }
  ): Promise<EventCategories> {
    return this.executeOperation(async () => {
      const category = await this.findOneByIdOrThrow(id);

      if (updates.categoryName) {
        const existingCategory = await this.repository.findOne({ 
          where: { categoryName: updates.categoryName } 
        });

        if (existingCategory && existingCategory.id !== id) {
          throw new GraphQLError("Category name already exists", {
            extensions: {
              code: 'BAD_USER_INPUT',
              field: 'name'
            }
          });
        }
      }

      Object.assign(category, updates);
      return this.repository.save(category);
    });
  }

  async getAllCategories(): Promise<EventCategories[]> {
    return this.executeOperation(() => 
        this.repository.find({
          relations: {
            event: true
          },
        })
      );
  }

  async getCategoryById(id: number): Promise<EventCategories> {
    return this.executeOperation(async () => {
      const category = await this.repository.findOne({
        where: { id },
        relations: ['event']
      });

      if (!category) {
        throw new GraphQLError("Category not found", {
          extensions: {
            code: 'NOT_FOUND',
            field: 'id'
          }
        });
      }

      return category;
    });
  }

  async getCategoriesByIds(ids: number[]): Promise<EventCategories[]> {
    return this.executeOperation(async () => {
      const categories = await this.repository.find({
        where: { id: In(ids) },
        relations: ['events']
      });

      if (categories.length !== ids.length) {
        throw new GraphQLError("One or more categories not found", {
          extensions: {
            code: 'NOT_FOUND',
            field: 'categoryIds'
          }
        });
      }

      return categories;
    });
  }

  async deleteCategory(id: number): Promise<EventCategories> {
    return this.executeOperation(async () => {
      const category = await this.findOneByIdOrThrow(id);
      await this.repository.remove(category);
      return category;
    });
  }

  async addEventToCategories(eventId: number, categoryIds: number[]): Promise<EventCategories[]> {
    return this.executeOperation(async () => {
      const categories = await this.repository.find({
        where: { id: In(categoryIds) },
        relations: ['events']
      });

      if (categories.length !== categoryIds.length) {
        throw new GraphQLError("One or more categories not found", {
          extensions: {
            code: 'NOT_FOUND',
            field: 'categoryIds'
          }
        });
      }

      categories.forEach(category => {
        if (!category.event.find(e => e.id === eventId)) {
          category.event.push({ id: eventId } as any);
        }
      });

      return this.repository.save(categories);
    });
  }

  async removeEventFromCategories(eventId: number, categoryIds: number[]): Promise<EventCategories[]> {
    return this.executeOperation(async () => {
      const categories = await this.repository.find({
        where: { id: In(categoryIds) },
        relations: ['events']
      });

      categories.forEach(category => {
        category.event = category.event.filter(e => e.id !== eventId);
      });

      return this.repository.save(categories);
    });
  }
} 