import { Repository, ObjectLiteral } from "typeorm";
import { GraphQLError } from "graphql";
import { handleError } from "../utils/handleError.js";

export abstract class BaseService<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  protected async executeOperation<R>(operation: () => Promise<R>): Promise<R> {
    try {
      return await operation();
    } catch (error) {
      throw handleError(error);
    }
  }

  protected throwNotFoundError(entityName: string, id: number | string): never {
    throw new GraphQLError(`${entityName} with id ${id} not found.`, {
      extensions: { code: "NOT_FOUND" }
    });
  }

  protected throwValidationError(message: string): never {
    throw new GraphQLError(message, {
      extensions: { code: "BAD_USER_INPUT" }
    });
  }

  protected async findOneByIdOrThrow(id: number, relations?: string[]): Promise<T> {
    const entity = await this.repository.findOne({ 
      where: { id } as any, 
      relations 
    });
    
    if (!entity) {
      this.throwNotFoundError(this.repository.metadata.name, id);
    }
    
    return entity;
  }
} 