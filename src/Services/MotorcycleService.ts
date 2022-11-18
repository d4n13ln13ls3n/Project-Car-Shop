import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    console.log('new motorcycle no service:', newMotorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  // public async getAll(): Promise<Car[]> {
  //   const carODM = new CarODM();
  //   const allCars = await carODM.getAll();
  //   // console.log('allCars no service:', allCars);
  //   if (allCars.length) {
  //     const result = allCars.map((car) => this.createCarDomain(car));
  //     return result;
  //   }
  //   return [];
  // }

  // public async getById(id: string): Promise<Car | null> {
  //   const carODM = new CarODM();
  //   const car = await carODM.getById(id);
  //   if (car) {
  //     return this.createCarDomain(car);
  //   }
  //   return car;
  // }

  // public async updateCar(id: string, data: ICar): Promise<Car | null> {
  //   console.log('id no update da MotorcycleService:', id);
  //   console.log('data no update da MotorcycleService:', data);
  //   const carODM = new CarODM();
  //   const updatedCar = await carODM.update(id, data);
  //   console.log('updated car no service:', updatedCar);
  //   if (updatedCar) {
  //     return this.createCarDomain(updatedCar);
  //   }
  //   return updatedCar;
  // }
}

export default MotorcycleService;