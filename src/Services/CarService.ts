import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

class CarService {
  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll(): Promise<Car[]> {
    const carODM = new CarODM();
    const allCars = await carODM.getAll();
    if (allCars.length) {
      const result = allCars.map((car) => this.createCarDomain(car));
      return result;
    }
    return [];
  }

  public async getById(id: string): Promise<Car | null> {
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    console.log('car no service:', car);
    if (car) {
      return this.createCarDomain(car);
    }
    return car;
  }
}

export default CarService;