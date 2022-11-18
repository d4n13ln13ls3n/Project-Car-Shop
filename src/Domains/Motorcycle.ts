import IMotorcycle, { Categories } from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: Categories;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super(motorcycle);
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }

  public setCategory(category: Categories) {
    this.category = category;
  }

  public getCategory() {
    return this.category;
  }
  
  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}

export default Motorcycle;