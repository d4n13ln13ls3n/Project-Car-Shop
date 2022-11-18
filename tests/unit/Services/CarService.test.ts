import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import ICar from '../../../src/Interfaces/ICar';

describe('Deveria buscar um carro por id', function () {
  it('Deveria buscar um carro por id com SUCESSO', async function () {
    const CarOutput: Car = new Car(
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'findById').resolves(CarOutput);

    const service = new CarService();
    const result = await service.getById('634852326b35b59438fbea2b');

    expect(result).to.be.deep.equal(CarOutput);
  });

  it('Deveria lançar um erro quando o id é inválido', async function () {
    sinon.stub(Model, 'findById').resolves(undefined);

    try {
      const service = new CarService();
      await service.getById('634852326b35b59438fbea2z');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
  
  it('Deveria buscar todos os carros com SUCESSO', async function () {
    const CarOutput: ICar[] = [
      {
        id: '634852326b35b59438fbea2c',
        model: 'Monza',
        year: 1992,
        color: 'Black',
        status: true,
        buyValue: 1399,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea38',
        model: 'Fusca',
        year: 1955,
        color: 'White',
        status: false,
        buyValue: 3900,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    sinon.stub(Model, 'find').resolves(CarOutput);
  
    const service = new CarService();
    const result = await service.getAll();
  
    expect(result).to.be.deep.equal(CarOutput);
  });

  it('Deveria cadastrar um carro com SUCESSO', async function () {
    const CarOutput: Car = new Car(
      {
        id: '634852326b35b59438fbea2c',
        model: 'Audi A3',
        year: 2022,
        color: 'Black',
        status: true,
        buyValue: 159945,
        doorsQty: 4,
        seatsQty: 5,
      },
    );

    const CarInput: ICar = {
      model: 'Audi A3',
      year: 2022,
      color: 'Black',
      status: true,
      buyValue: 159945,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'create').resolves(CarOutput);

    const service = new CarService();
    const result = await service.create(CarInput);

    expect(result).to.be.deep.equal(CarOutput);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});