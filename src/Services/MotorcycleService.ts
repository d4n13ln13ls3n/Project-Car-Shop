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
    if (motorcycle) {
      return this.createMotorcycleDomain(motorcycle);
    }
    return motorcycle;
  }

  public async updateMotorcycle(id: string, data: IMotorcycle): Promise<Motorcycle | null> {
    console.log('id no update da MotorcycleService:', id);
    console.log('data no update da MotorcycleService:', data);
    const motorcycleODM = new MotorcycleODM();
    const updatedMotorcycle = await motorcycleODM.update(id, data);
    console.log('updated motorcycle no service:', updatedMotorcycle);
    if (updatedMotorcycle) {
      return this.createMotorcycleDomain(updatedMotorcycle);
    }
    return updatedMotorcycle;
  }
}

export default MotorcycleService;