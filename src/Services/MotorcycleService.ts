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
    // console.log('new motorcycle no service:', newMotorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll(): Promise<Motorcycle[]> {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.getAll();
    console.log('allmotorcycles no service:', allMotorcycles);
    if (allMotorcycles.length) {
      const result = allMotorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
      return result;
    }
    return [];
  }

  public async getById(id: string): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getById(id);
    console.log('motorcycles no service:', motorcycle);
    if (motorcycle) {
      return this.createMotorcycleDomain(motorcycle);
    }
    return motorcycle;
  }

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