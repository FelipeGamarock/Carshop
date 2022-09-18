import { expect } from 'chai';
import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { carMock, carMockWithId, carMockForChange } from '../mocks/Car';
import { ICar } from '../../../interfaces/ICar';

describe('Car Controller', () => {

  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService)

  const req = {} as Request;
  const res = {} as Response;

  
  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMockWithId]);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carMockForChange);
    sinon.stub(carService, 'delete').resolves(carMockWithId);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Read Cars', () => {
    it('Success', async () => {
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect((statusStub).calledWith(200)).to.be.true;
      expect((jsonStub).calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub
      const jsonStub = res.json as sinon.SinonStub

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMock;
      await carController.update(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    })
  })

  describe('Delete Car', () => {
    it('returns status 204 and the deleted object', async () => {
      await carController.delete(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(204)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  });
})