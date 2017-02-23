import {assert} from 'chai';
import {payload, people} from '../serialization';
// you can ge row data form payload.js file

describe('payload', function () {

  // in this tests try to use as least as possible number of assignments

  it('car quantity with owners older than 20 years', function () {

    let answer;
    let cars    = [];
    let allCars = payload.data
                         .filter((car) => {
        return car.type == 'Car';
  }
    );

    allCars.forEach((car) => {
      car.owners.forEach((owner) => {
      if (owner.personalInfo.age > 20) {
      cars.push(car);
    }
  }
    )
  });

    answer = cars.length;
    assert.equal(answer, 2);

  });

  it('all car colors separated by comma without duplicates', function () {

    let answer;
    let carColors;
    let allCars = payload.data
                         .filter((car) => {
        return car.type == 'Car';
  }
    );

    carColors = allCars.map((car) => {
        return car.attrs.color;
  });

    carColors = carColors.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });

    answer = carColors.join();
    assert.equal(answer, 'red,yellow');

  });

  it('id\'s of all vehicles separated by comma', function () {

    let answer;
    let vehicles = payload.data.filter((vehicle) => {
        return (vehicle.type == 'Car' || vehicle.type == 'Bicycle');
  }
    );

    let vehiclesIds = vehicles.map((vehicle) => {
        return vehicle.id;
  });

    vehiclesIds = vehiclesIds.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });

    answer = vehiclesIds.join();
    assert.equal(answer, '1,3,6,4,2');

  });

  it('summary price of all items', function () {

    let answer;
    let items       = payload.data;
    let itemsPrices = items.map(item => item.attrs.price);

    function sum(total, num) {
      return total + num;
    };

    answer = itemsPrices.reduce(sum);

    assert.equal(answer, 42800);

  });

  it('price of all things john has own', function () {

    let answer;
    let johnsStuff = [];

    payload.data.forEach((item) => {
      item.owners.forEach((owner) => {
      if (owner == people.johnSmith) {
      johnsStuff.push(item);
    }
  })
  });

    let prices = johnsStuff.map(item => item.attrs.price);

    function sum(total, num) {
      return total + num;
    };

    answer = prices.reduce(sum);
    assert.equal(answer, 25000);

  });

  it('all cities', function () {

    let answer;
    let owners = [];

    payload.data.forEach((item) => {
      if (item.owners.length) {
      item.owners.forEach((owner) => {
        owners.push(owner);
    })
    }
  });

    owners = owners.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });

    let cities = owners.map(owner => owner.cities);
    answer = cities.reduce((a,b) => a.concat(b)).join();
    assert.equal(answer, 'New York,Boston,Columbia,Rapture');
  });
});
