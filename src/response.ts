export class ApiResponse<T> {
  private data: T;
  private error: string | null;

  constructor(data: T, error: string | null = null) {
    this.data = data;
    this.error = error;
  }
}
