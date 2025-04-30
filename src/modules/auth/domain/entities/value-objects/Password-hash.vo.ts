export class PasswordHash {
  private readonly value: string;

  private constructor(hash: string) {
    if (!hash || hash.length < 10) {
      throw new Error('Invalid password hash');
    }

    this.value = hash;
  }

  public static create(hash: string): PasswordHash {
    return new PasswordHash(hash);
  }

  public getValue(): string {
    return this.value;
  }
}
