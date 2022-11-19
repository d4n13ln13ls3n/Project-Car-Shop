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
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll(): Promise<Motorcycle[]> {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.getAll();
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
    const motorcycleODM = new MotorcycleODM();
    const updatedMotorcycle = await motorcycleODM.update(id, data);
    if (updatedMotorcycle) {
      return this.createMotorcycleDomain(updatedMotorcycle);
    }
    return updatedMotorcycle;
  }

  public async deleteMotorcycle(id: string) {
    const motorcycleODM = new MotorcycleODM();
    await motorcycleODM.deleteMotorcycle(id);
  }
}

export default MotorcycleService;