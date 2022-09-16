import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  constructor(private _car:IModel<ICar>) {}

  public async create(obj:ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const created = await this._car.create(obj);
    return created;
  }

  public async read(): Promise<ICar[]> {
    const allCars = await this._car.read();
    return allCars; 
  }

  public async readOne(_id:string):Promise<ICar | null> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): 
  Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const updated = await this._car.update(_id, parsed.data);
    if (!updated) throw new Error(ErrorTypes.EntityNotFound);
    return updated;
  }

  public async delete(id: string): Promise<ICar | null> {
    const car = await this._car.readOne(id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    const carDeleted = await this._car.delete(id);
    return carDeleted;
  }
}

export default CarService;