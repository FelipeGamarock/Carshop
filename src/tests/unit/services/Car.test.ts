import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { Model } from 'mongoose';
import  CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId, carMockForChange } from '../mocks/Car';
import { ICar } from '../../../interfaces/ICar';

describe('', () =>{
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carMockForChange)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);  
      
  });

  after(() => {
    sinon.restore();
  });

  describe('Create Frame', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let err;
			try {
				await carService.create({} as ICar);
			} catch (error) {
				err = error;
			}
			expect(err).to.be.instanceOf(ZodError);
		});
	});

  describe('Read Cars', () => {
    it('Success', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('ReadOne Car', () => {
    it('Sucess', async () => {
      const carFound = await carService.readOne(carMockWithId._id);
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
			let err: any;
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error:any) {
				err = error;
			}
			expect(err, 'error should be defined').not.to.be.undefined;
			expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
  });

  describe('Update Car', () => {
    it('Success', async () => {
      const carUpdated = await carService.update(carMockForChange._id, carMockForChange);
      expect(carUpdated).to.be.deep.equal(carMockForChange);
    });

    it('Failure - invalid object', async () => {
      let err;
      try{
        await carService.update(carMockForChange._id, {} as ICar);
      } catch (error: any) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
      expect(err).to.be.instanceOf(ZodError);
    });

    it('Failure - not found', async () => {
      let err;
      try {
        await carService.update('123ERRADO', carMockForChange);
      } catch (error: any) {
        err = error;
      }
      expect(err, 'error should be defined').not.to.be.undefined;
      expect(err.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Delete Car', () => {
    
    it('Failure', async () => {
      try {
        await carService.delete('123ERRADO');
      } catch (e: any) {
        expect(e, 'error should be defined').not.to.be.undefined;
        expect(e.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      };
    });
  });

})
