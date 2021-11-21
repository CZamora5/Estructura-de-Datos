import CircularList from './circularList.js';
import Station from './station.js';

class App {
  constructor() {
    this._route = new CircularList();
    this._$infoRouteChanges = document.querySelector('.change-route .info-div');
    this._$infoCards = document.querySelector('.create-card .info-div');

    this._$btnAdd = document.getElementById('btn-add');
    this._$btnDelete = document.getElementById('btn-delete');
    this._$btnSearch = document.getElementById('btn-search');
    this._$btnList = document.getElementById('btn-list');
    this._$btnReverse = document.getElementById('btn-reverse');
    this._$btnCreateCard = document.getElementById('btn-create');

    this._$btnAdd.addEventListener('click', this.addStation);
    this._$btnDelete.addEventListener('click', this.deleteStation);
    this._$btnSearch.addEventListener('click', this.searchStation);
    this._$btnList.addEventListener('click', this.listStations);
    this._$btnReverse.addEventListener('click', this.reverseListStations);
    this._$btnCreateCard.addEventListener('click', this.createCard);
  }

  addStation = () => {
    let name = document
      .getElementById('change-route__station-name')
      .value.trim();
    let duration = document.getElementById('change-route__duration').value;

    if (!(name && duration)) {
      Swal.fire(
        'Error',
        'Faltaron campos para esta operación, consulta las instrucciones',
        'error'
      );
      return;
    }

    duration = parseInt(duration);

    if (duration <= 0) {
      Swal.fire(
        'Error',
        'La duración debe ser un número entero positivo',
        'error'
      );
      return;
    }

    let station = new Station(name, duration);
    this.reset('.change-route form');

    let result = this._route.addStation(station);
    if (result === false) {
      Swal.fire('Error', 'Ya existe una base con ese nombre', 'error');
      return;
    }

    Swal.fire('Correcto', 'Se agregó una nueva base', 'success');
    this._$infoRouteChanges.innerHTML = `
      <h3>Se ha agregado una nueva base</h3>
      ${station.getInfo()}
    `;
  };

  createCard = () => {
    let name = document
      .getElementById('create-card__station-name')
      .value.trim(); 
    let startingTime = document.getElementById('create-card__starting-time').value;
    let duration = document.getElementById('create-card__duration').value;

    if (!(name && startingTime && duration)) {
      Swal.fire(
        'Error',
        'Faltaron campos para esta operación, consulta las instrucciones',
        'error'
      );
      return;
    }

    startingTime = parseInt(startingTime);
    duration = parseInt(duration);

    if (duration <= 0 || startingTime < 0 || startingTime > 23) {
      Swal.fire(
        'Error',
        'Datos incorrectos, consulta las intrucciones',
        'error'
      );
      return;
    }

    this.reset('.create-card form');

    let result = this._route.createCard(name, startingTime, duration);
    if (result === '') {
      Swal.fire('Error', `No existe ninguna base con el nombre ${name}`, 'error');
      this._$infoCards.innerHTML = '<h3>No existe ninguna base con el nombre ingresado</h3>';
      return;
    }

    Swal.fire('Correcto', 'Se ha creado una nueva tarjeta', 'success');
    this._$infoCards.innerHTML = result;
  };

  reset = (selector) => {
    document.querySelector(selector).reset();
  };

  deleteStation = () => {
    let name = document
      .getElementById('change-route__station-name')
      .value.trim();

    if (!name) {
      Swal.fire(
        'Error',
        'Faltaron campos para esta operación, consulta las instrucciones',
        'error'
      );
      return;
    }

    this.reset('.change-route form');

    let station = this._route.removeByName(name);
    if (station === null) {
      this._$infoRouteChanges.innerHTML = `
        <h3>No se ha encontrado ninguna base con el nombre ${name}</h3>
      `;
      return;
    }

    this._$infoRouteChanges.innerHTML = `
      <h3>Se ha eliminado la base</h3>
      ${station.getInfo()}
    `;
  };

  searchStation = () => {
    let name = document
      .getElementById('change-route__station-name')
      .value.trim();

    if (!name) {
      Swal.fire(
        'Error',
        'Faltaron campos para esta operación, consulta las instrucciones',
        'error'
      );
      return;
    }

    this.reset('.change-route form');

    let station = this._route.getStationByName(name);
    if (station === null) {
      this._$infoRouteChanges.innerHTML = `
        <h3>No se ha encontrado ninguna base con el nombre ${name}</h3>
      `;
      return;
    }

    this._$infoRouteChanges.innerHTML = `
      <h3>La base con nombre ${name} es</h3>
      ${station.getInfo()}
    `;
  };

  listStations = () => {
    this._$infoRouteChanges.innerHTML = this._route.getList();
  };

  reverseListStations = () => {
    this._$infoRouteChanges.innerHTML = this._route.getReverseList();
  };
}

new App();