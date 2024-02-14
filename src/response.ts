export class ApiResponse<T> {
  private data: T;
  private error: any;

  constructor(data: T, error: any = null) {
    this.data = data;
    this.error = error;
  }
}
