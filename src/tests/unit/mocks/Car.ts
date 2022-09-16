import { ICar } from "../../../interfaces/ICar";

const carMock:ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockWithId:ICar & { _id:string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Fiat Uno",
  year: 1963,
  color: "blue",
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4
};

const carMockForChange= {
  _id: "4edd40c86762e0fb12000003",
  buyValue: 9000,
  color: "silver",
  doorsQty: 4,
  model: "Audi A4 turbo",
  seatsQty: 4,
  status: true,
  year: 2021,
  __v: 0
}

export { carMock, carMockWithId, carMockForChange };