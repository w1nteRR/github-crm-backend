export class GetProjectFromDbQuery {
  constructor(
    public readonly project_id: string,
    public readonly user_id: string,
  ) {}
}
