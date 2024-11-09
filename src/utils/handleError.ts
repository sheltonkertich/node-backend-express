import { GraphQLError } from "graphql";

// Function to handle and format errors consistently
export function handleError(error: unknown): GraphQLError {
  if (error instanceof Error) {
    // Handle known Error structure
    const errorCode = (error as any).extensions?.code ?? 'UNKNOWN_ERROR';
    const errorMessage = (error as any).detail ?? error.message ?? 'An unexpected error occurred.';
    return new GraphQLError(errorMessage, {
      extensions: {
        code: errorCode,
      },
    });
  }

  // Handle unknown error structure
  return new GraphQLError('An unexpected error occurred.', {
    extensions: {
      code: 'UNKNOWN_ERROR',
    },
  });
}


// Centralized error handler for GraphQL resolvers
export function handleGraphQLError(
    error: any, 
    fallbackData: any = null // Allow passing fallback data to return in case of error
  ) {
    // Check if the error contains specific fields like message and extensions
    const errorMessage = error.message || 'An unexpected error occurred';
    const errorCode = error.extensions?.code || 'UNKNOWN_ERROR';
    const errorDetail = error.extensions?.detail || error;
  
    // Default error response structure
    const defaultErrorResponse = {
      success: false,
      message: errorMessage,
      errorCode,
      errorDetail, // Optionally include the full error object for more details
      data: fallbackData, // Include fallback data, e.g., empty array or null
    };
  
    return defaultErrorResponse;
  }