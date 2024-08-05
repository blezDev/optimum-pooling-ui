export class ResultState<T> {
  constructor(public readonly data: T | null, public readonly message: string | null) {}
}

export class Success<T> extends ResultState<T> {
  constructor(data: T) {
    super(data, null);
  }
}

export class Error<T> extends ResultState<T> {
  constructor(message: string, data: T | null = null) {
    super(data, message);
  }
}
