import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

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
    // console.log('all cars em getAll no controller:', allCars);
    return this.res.status(200).json(allCars);
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      // console.log('id no controller:', id);
      const car = await this.service.getById(id);
      // console.log('car no controller:', car);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
  
  public async updateCar() {
    try {
      const { id } = this.req.params;
      console.log('id no update em controller:', id);
      // const { updatedCar } = this.req.body;
      console.log('this.req.body:', this.req.body);
      const updatedCar = await this.service.updateCar(id, this.req.body);
      console.log('updated car no controller:', updatedCar);
      if (!updatedCar) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      return this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }
}

export default CarController;