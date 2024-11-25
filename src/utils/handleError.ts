import { GraphQLError } from "graphql";

interface ErrorResponse {
  message: string;
  code: string;
}

export function handleError(error: unknown): never {
  if (error instanceof GraphQLError) {
    throw error;
  }

  const defaultError: ErrorResponse = {
    message: "An unexpected error occurred",
    code: "INTERNAL_SERVER_ERROR"
  };

  if (error instanceof Error) {
    // Handle specific database errors or other known error types
    if ('code' in error) {
      switch (error.code) {
        case '23505': // Postgres unique violation
          throw new GraphQLError("Duplicate entry found.", {
            extensions: { code: "BAD_USER_INPUT" }
          });
        // Add other specific error codes as needed
      }
    }

    throw new GraphQLError(error.message, {
      extensions: { code: "INTERNAL_SERVER_ERROR" }
    });
  }

  throw new GraphQLError(defaultError.message, {
    extensions: { code: defaultError.code }
  });
}

export function handleGraphQLError<T>(error: unknown, defaultValue: T): T & { 
  success: false; 
  message: string; 
} {
  const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
  
  return {
    success: false,
    message: errorMessage,
    ...defaultValue
  };
}