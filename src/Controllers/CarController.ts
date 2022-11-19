import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;
  readonly NOT_FOUND = 'Car not found';
  readonly INVALID_ID = 'Invalid mongo id';

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      id: this.req.body.id,
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const allCars = await this.service.getAll();
    return this.res.status(200).json(allCars);
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const car = await this.service.getById(id);
      if (!car) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(422).json({ message: this.INVALID_ID });
    }
  }
  
  public async updateCar() {
    try {
      const { id } = this.req.params;
      const updatedCar = await this.service.updateCar(id, this.req.body);
      if (!updatedCar) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      return this.res.status(422).json({ message: this.INVALID_ID });
    }
  }

  public async deleteCar() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: this.INVALID_ID });
      }
      const deletedCar = await this.service.getById(id);
      if (!deletedCar) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      await this.service.deleteCar(id);
      return this.res.status(204).end();
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;