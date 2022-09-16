import { Model, isValidObjectId, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    const result = await this._model.create({ ...obj });

    return result;
  }

  public async read(): Promise<T[]> {
    const result = await this._model.find();
    return result;
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findOne({ _id });
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    return result as T;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.deleteOne({ _id: id });
    return result as unknown as T;
  }
}

export default MongoModel;