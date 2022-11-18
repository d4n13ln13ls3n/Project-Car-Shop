import IVehicle from './IVehicle';

export type Categories = 'Street' | 'Custom' | 'Trail';

interface IMotorcycle extends IVehicle{
  category: Categories;
  engineCapacity: number;
}

export default IMotorcycle;