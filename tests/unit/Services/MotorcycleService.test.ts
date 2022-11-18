import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';

describe('Deveria buscar uma moto por id', function () {
  it('Deveria buscar uma moto por id com SUCESSO', async function () {
    const MotorcycleOutput: Motorcycle = new Motorcycle(
      {
        id: '634852326b35b59438fbea2f',
        model: 'Yamaha',
        year: 2012,
        color: 'White',
        status: true,
        buyValue: 1299,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    sinon.stub(Model, 'findById').resolves(MotorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.getById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(MotorcycleOutput);
  });

  it('Deveria lançar um erro quando o id é inválido', async function () {
    sinon.stub(Model, 'findById').resolves(undefined);

    try {
      const service = new MotorcycleService();
      await service.getById('634852326b35b59438fbea2z');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Deveria retornar undefined quando nenhuma moto é encontrada', async function () {
    sinon.stub(Model, 'findById').resolves(undefined);

    try {
      const service = new MotorcycleService();
      await service.getById('634852326b35b59438fbea29');
    } catch (error) {
      expect((error as Error).message).to.be.equal(undefined);
    }
  });
  
  it('Deveria buscar todas as motos com SUCESSO', async function () {
    const MotorcycleOutput: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Yamaha',
        year: 2012,
        color: 'White',
        status: true,
        buyValue: 1299,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea2a',
        model: 'Honda',
        year: 2015,
        color: 'Orange',
        status: true,
        buyValue: 12993,
        category: 'Trail',
        engineCapacity: 700,
      },
    ];
    sinon.stub(Model, 'find').resolves(MotorcycleOutput);
  
    const service = new MotorcycleService();
    const result = await service.getAll();
  
    expect(result).to.be.deep.equal(MotorcycleOutput);
  });

  it('Deveria retornar [] se a busca por todas as motos retornar vazia', async function () {
    sinon.stub(Model, 'find').resolves([]);

    const service = new MotorcycleService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal([]);
  });

  it('Deveria cadastrar um carro com SUCESSO', async function () {
    const MotorcycleOutput: Motorcycle = new Motorcycle(
      {
        id: '634852326b35b59438fbea24',
        model: 'Kawasaki',
        year: 2022,
        color: 'Gray',
        status: true,
        buyValue: 22990,
        category: 'Street',
        engineCapacity: 1200,
      },
    );

    const MotorcycleInput: IMotorcycle = {
      model: 'Kawasaki',
      year: 2022,
      color: 'Gray',
      status: true,
      buyValue: 22990,
      category: 'Street',
      engineCapacity: 1200,
    };
    sinon.stub(Model, 'create').resolves(MotorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.create(MotorcycleInput);

    expect(result).to.be.deep.equal(MotorcycleOutput);
  });

  it('Deveria atualizar uma moto com SUCESSO', async function () {
    const id = '634852326b35b59438fbea2c'; 
    const MotorcycleOutput = {
      id: '634852326b35b59438fbea24',
      model: 'Kawasaki',
      year: 2015,
      color: 'Purple',
      status: true,
      buyValue: 22990,
      category: 'Street',
      engineCapacity: 1200,
    };

    const MotorcycleInput: IMotorcycle = {
      model: 'Kawasaki',
      year: 2015,
      color: 'Purple',
      status: true,
      buyValue: 22990,
      category: 'Street',
      engineCapacity: 1200,
    };
    sinon.stub(Model, 'findByIdAndUpdate').resolves(MotorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.updateMotorcycle(id, MotorcycleInput);

    expect(result).to.be.deep.equal(MotorcycleOutput);
  });

  it('Deveria retornar undefined ao atualizar uma moto que não foi encontrada', async function () {
    const id = '634852326b35b59438fbea20'; 
    const MotorcycleInput: IMotorcycle = {
      model: 'Kawasaki',
      year: 2015,
      color: 'Purple',
      status: true,
      buyValue: 22990,
      category: 'Street',
      engineCapacity: 1200,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(undefined);

    const service = new MotorcycleService();
    const result = await service.updateMotorcycle(id, MotorcycleInput);

    expect(result).to.be.deep.equal(undefined);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});