import { Router } from 'express';
import CarModel from '../models/Car';
import CarController from '../controllers/Car';
import CarService from '../services/Car';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.route('/').post((req, res) => carController.create(req, res));
route.route('/').get((req, res) => carController.create(req, res));

route.route('/:id')
  .get((req, res) => carController.readOne(req, res))
  .put((req, res) => carController.update(req, res))
  .delete((req, res) => carController.delete(req, res));

export default route;