export interface TErrorSource {
  path: string;
  message: string;
}

export interface TErrorResponse {
  success: boolean;
  message: string;
  errorSources: TErrorSource[];
  error?: unknown;
  stack?:string
  statusCode: number;
}
