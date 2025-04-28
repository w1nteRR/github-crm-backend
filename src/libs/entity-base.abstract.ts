export type AggregateId = string;

export interface EntityProps {
  id: AggregateId;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateEntityProps<T> extends EntityProps {
  props: T;
}

export abstract class Entity<EntityProps> {
  constructor(protected readonly entityProps: CreateEntityProps<EntityProps>) {
    this.setId(entityProps.id);
    const now = new Date();

    this._createdAt = entityProps.created_at || now;
    this._updatedAt = entityProps.created_at || now;

    this.props = entityProps.props;
  }

  protected readonly props: EntityProps;

  protected abstract _id: AggregateId;

  private readonly _createdAt: Date;

  private _updatedAt: Date;

  get id(): AggregateId {
    return this.entityProps.id;
  }

  private setId(id: AggregateId): void {
    this.entityProps.id = id;
  }

  get createdAt(): Date {
    return this.entityProps?.created_at ?? new Date();
  }

  get updatedAt(): Date {
    return this.entityProps?.updated_at ?? new Date();
  }
}
