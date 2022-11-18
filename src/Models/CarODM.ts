import { Schema, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async getAll(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<ICar | null> {
    if (isValidObjectId(id)) {
      return this.model.findById({ _id: id });
    }
    throw new Error('Invalid mongo id');
  }
}

export default CarODM;