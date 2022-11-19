import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;
  readonly NOT_FOUND = 'Motorcycle not found';
  readonly INVALID_ID = 'Invalid mongo id';
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }
  
  public async create() {
    const motorcycle: IMotorcycle = {
      id: this.req.body.id,
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const allMotorcycles = await this.service.getAll();
    return this.res.status(200).json(allMotorcycles);
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const motorcycle = await this.service.getById(id);
      if (!motorcycle) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      return this.res.status(422).json({ message: this.INVALID_ID });
    }
  }
  
  public async updateMotorcycle() {
    try {
      const { id } = this.req.params;
      const updatedMotorcycle = await this.service.updateMotorcycle(id, this.req.body);
      if (!updatedMotorcycle) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      return this.res.status(422).json({ message: this.INVALID_ID });
    }
  }

  public async deleteMotorcycle() {
    try {
      const { id } = this.req.params;
      const deletedMotorcycle = await this.service.getById(id);
      console.log('deletedMotorcycle no controller:', deletedMotorcycle);
      await this.service.deleteMotorcycle(id);
      if (!deletedMotorcycle) {
        return this.res.status(404).json({ message: 'não encontra id' });
      }
      return this.res.status(204).end();
    } catch (error) {
      return this.res.status(422).json({ message: this.INVALID_ID });
    }
  }
}

export default MotorcycleController;