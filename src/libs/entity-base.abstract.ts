export type AggregateId = string;

export interface EntityProps {
  id: AggregateId;
  created_at?: Date | number;
  updated_at?: Date | number;
}

export interface CreateEntityProps<T> extends EntityProps {
  props: T;
}

export abstract class Entity<EntityProps> {
  constructor(protected entityProps: CreateEntityProps<EntityProps>) {
    this.setId(entityProps.id);
    const now = new Date();

    this._createdAt = entityProps.created_at || now;
    this._updatedAt = entityProps.created_at || now;

    this.props = entityProps.props;
  }

  protected props: EntityProps;
  protected abstract _id: AggregateId;

  private readonly _createdAt: Date | number;
  private _updatedAt: Date | number;

  get id(): AggregateId {
    return this.entityProps.id;
  }

  private setId(id: AggregateId): void {
    this.entityProps.id = id;
  }

  get createdAt(): Date {
    return <Date>this.entityProps?.created_at ?? new Date();
  }

  get updatedAt(): Date {
    return <Date>this.entityProps?.updated_at ?? new Date();
  }

  public getProps(): EntityProps {
    return Object.freeze({
      id: this.entityProps.id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.entityProps.props,
    });
  }

  protected setProps(newProps: EntityProps): void {
    this.props = newProps;
    this._updatedAt = new Date();
  }
}
