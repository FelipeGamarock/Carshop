import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import  CarModel from '../../../models/Car';
import { carMock, carMockWithId, carMockForChange } from '../mocks/Car';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChange);
    sinon.stub(Model, 'deleteOne').resolves({ ...carMock, acknowledged: true, deletedCount: 1 });
  });

  after(() => {
    sinon.restore();
  });

  describe('creat method, creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('read method, list all a car ', () => {
    it('successfully list', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('readOne method, searching a car with ID', () => {
    it('successfully found', async () => {
      const carFound = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(carFound).to.be.deep.equal(carMockWithId);
    });
    it('_id not found', async () => {
      try {
        await carModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  })

  describe('update method, changing a car', () => {
    it('successfully changed', async () => {
      const car = await carModel.update(carMockForChange._id, carMockForChange);
      expect(car).to.be.deep.equal(carMockForChange);
    })

    // it('throws an error if the id is invalid', async () => {
    //   try {
    //     await carModel.update('123ERRADO', carMockForChange);
    //   } catch (error: any) {
    //     expect(error).to.have.property('message', 'Id must have 24 hexadecimal characters');
    //     expect(error).to.have.property('code', 400);
    //   }
    // })
  })

  describe('delete method, deleting a car', () => {
    it('returns the deleted object', async () => {
      const car = await carModel.delete(carMockWithId._id);
      expect(car).to.have.property('acknowledged', true);
      expect(car).to.have.property('deletedCount', 1);
    });
    // it('throws an error if the id is invalid', async () => {
    //   try {
    //     await carModel.delete('123ERRADO');
    //   } catch (error: any) {
    //     expect(error).to.have.property('message', 'Id must have 24 hexadecimal characters');
    //     expect(error).to.have.property('code', 400);
    //   }
    // });
  });
})