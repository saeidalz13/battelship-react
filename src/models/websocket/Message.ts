export interface Message<T> {
  code: number;
  payload?: T;
  error?: ServerError;
}

export interface ServerError {
  error_details?: string;
  message?: string;
}
