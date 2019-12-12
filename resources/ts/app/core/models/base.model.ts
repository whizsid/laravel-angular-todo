type ObjectType<R extends {}, T extends keyof R> = R[T];


export type AppendId<T> = T & {id: number};

export abstract class Base<T> {

  public static link: string;

  public static title: string;

  public data: AppendId<T>;

  public original = true;

  public deleted = false;

  constructor(
    fields: T,
    alreadyCreated = true
  ) {
    this.data = {id: 0, ...fields};
    this.original = alreadyCreated;
  }

  public getProperty<R extends keyof AppendId<T>>(name: R): ObjectType<AppendId<T>, R> {
    return this.data[name];
  }

  public setProperty<R extends keyof AppendId<T>>(name: R, value: ObjectType<AppendId<T>, R>) {
    this.data[name] = value;
    this.original = false;
  }
}
