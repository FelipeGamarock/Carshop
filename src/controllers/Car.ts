import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class FrameController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request & { body:ICar }, res: Response<ICar>) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }
  
  public async read(req: Request, res: Response) {
    const allCars = await this._service.read();
    return res.status(200).json(allCars);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const car = await this._service.readOne(req.params.id);
    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const updated = await this._service.update(req.params.id, req.body);
    return res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response) {
    const carDeleted = await this._service.delete(req.params.id);
    return res.status(204).json(carDeleted);
  }
}