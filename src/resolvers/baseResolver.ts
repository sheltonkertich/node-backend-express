import { BaseResponse } from '../types/eventTypes.js';
import { GraphQLError } from 'graphql';
import { EventStatus } from '../types/eventTypes.js';

export class BaseResolver {
  protected static async executeResolver<T extends BaseResponse>(
    operation: () => Promise<Partial<T>>
  ): Promise<T> {
    try {
      const result = await operation();
      return this.createSuccessResponse<T>(result);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  protected static createSuccessResponse<T extends BaseResponse>(
    data: Partial<T>,
    message = 'Operation successful'
  ): T {
    return {
      success: true,
      message,
      ...data
    } as T;
  }

  protected static createErrorResponse<T extends BaseResponse>(
    error: Error | string,
    errorCode = 'INTERNAL_SERVER_ERROR'
  ): T {
    const message = error instanceof Error ? error.message : error;
    
    if (error instanceof GraphQLError) {
      return {
        success: false,
        message,
        errorCode: error.extensions?.code as string || errorCode,
        errorDetail: error.extensions || error
      } as T;
    }

    return {
      success: false,
      message,
      errorCode,
      errorDetail: error instanceof Error ? error : undefined
    } as T;
  }

  protected static handleError<T extends BaseResponse>(error: unknown): T {
    if (error instanceof GraphQLError) {
      return this.createErrorResponse<T>(error, error.extensions?.code as string);
    }

    if (error instanceof Error) {
      // Handle specific database or validation errors
      if ('code' in error) {
        switch ((error as any).code) {
          case '23505': // Postgres unique violation
            return this.createErrorResponse<T>(error, 'DUPLICATE_ENTRY');
          case '23503': // Foreign key violation
            return this.createErrorResponse<T>(error, 'FOREIGN_KEY_VIOLATION');
          default:
            return this.createErrorResponse<T>(error, (error as any).code);
        }
      }
      return this.createErrorResponse<T>(error);
    }

    return this.createErrorResponse<T>('An unexpected error occurred');
  }

  protected static validateId(id: string | number): number {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId) || numericId <= 0) {
      throw new GraphQLError('Invalid ID format', {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }
    return numericId;
  }

  protected static validateRequiredFields(data: any, requiredFields: string[]): void {
    const missingFields = requiredFields.filter(
      field => data[field] === undefined || data[field] === null
    );

    if (missingFields.length > 0) {
      throw new GraphQLError(`Missing required fields: ${missingFields.join(', ')}`, {
        extensions: {
          code: 'BAD_USER_INPUT',
          fields: missingFields
        }
      });
    }
  }

  protected static sanitizeInput<T>(input: T): T {
    if (!input || typeof input !== 'object') {
      return input;
    }

    const sanitized = { ...input };
    for (const [key, value] of Object.entries(sanitized)) {
      if (typeof value === 'string') {
        (sanitized as any)[key] = value.trim();
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        (sanitized as any)[key] = this.sanitizeInput(value);
      }
    }

    return sanitized;
  }

  protected static validateDateRange(startDate: Date | string, endDate: Date | string): void {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new GraphQLError('Invalid date format', {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }

    if (start >= end) {
      throw new GraphQLError('Start date must be before end date', {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }
  }

  protected static validatePaginationParams(
    page?: number,
    limit?: number,
    maxLimit = 100
  ): { skip: number; take: number } {
    const validPage = Math.max(1, page || 1);
    const validLimit = Math.min(maxLimit, Math.max(1, limit || 10));

    if (page && (isNaN(page) || page < 1)) {
      throw new GraphQLError('Page must be a positive number', {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }

    if (limit && (isNaN(limit) || limit < 1)) {
      throw new GraphQLError('Limit must be a positive number', {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }

    return {
      skip: (validPage - 1) * validLimit,
      take: validLimit
    };
  }

  protected static validateNumericValue(
    value: number,
    min: number,
    max: number,
    fieldName: string
  ): void {
    if (isNaN(value) || value < min || value > max) {
      throw new GraphQLError(
        `${fieldName} must be between ${min} and ${max}`,
        {
          extensions: {
            code: 'BAD_USER_INPUT',
            field: fieldName,
            min,
            max
          }
        }
      );
    }
  }

  protected static validateEventStatus(status: string): EventStatus {
    if (Object.values(EventStatus).includes(status as EventStatus)) {
      return status as EventStatus;
    }
    throw new GraphQLError('Invalid event status', {
      extensions: {
        code: 'BAD_USER_INPUT',
        validStatuses: Object.values(EventStatus)
      }
    });
  }
} 