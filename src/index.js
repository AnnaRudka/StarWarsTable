import './styles/main.scss';
import './index.html';
import 'regenerator-runtime/runtime';
import { getData } from './getData';
import { getImage } from './getImage';
import { getSpeciesFromSStorage, setSpeciesToSStorage } from './sessionStorage';

// Selectors for elements
const tableBody = document.querySelector('.table-body');
const buttons = document.querySelectorAll('.buttons-list__item');

//Event listeners
document.addEventListener('DOMContentLoaded', onDOMLoaded);
buttons.forEach((button) =>
    button.addEventListener('click', (e) => createPageOnButtonClick(e))
);

function onDOMLoaded() {
    showSpecies('1');
}

function createPageOnButtonClick(e) {
    buttons.forEach((button) => {
        button.classList.remove('buttons-list__item--active');
    });
    e.target.classList.add('buttons-list__item--active');
    const page = e.target.dataset.component;
    showSpecies(page);
}

const showSpecies = async (page) => {
    tableBody.innerHTML =
        '<tr><td colspan="4"><div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></td></tr>';
    const storageSpecies = getSpeciesFromSStorage(page);
    const speciesList = storageSpecies.length
        ? storageSpecies
        : await getData(page);
    setSpeciesToSStorage(page, speciesList);
    tableBody.innerHTML = '';
    speciesList.map((species) => addSpeciesToTable(species));
};

function addSpeciesToTable({ planet, residentName, species }) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('table-body__row');

    // Create table data cell for image
    const imageTd = document.createElement('td');
    imageTd.classList.add('table-body__row-item');
    const image = new Image();
    image.classList.add('table-body__photo');
    image.src = getImage(species);
    imageTd.appendChild(image);
    // Create table data cell for planet name
    let planetName = document.createElement('td');
    planetName.classList.add('table-body__row-item');
    planetName.innerHTML = planet ?? '-';
    // Create table data cell for resident
    let resident = document.createElement('td');
    resident.classList.add('table-body__row-item');
    resident.innerHTML = residentName ?? '-';
    // Create table data cell for species
    let speciesName = document.createElement('td');
    speciesName.classList.add('table-body__row-item');
    speciesName.innerHTML = species ?? '-';

    //Add data cells to table row
    tableRow.appendChild(imageTd);
    tableRow.appendChild(planetName);
    tableRow.appendChild(resident);
    tableRow.appendChild(speciesName);
    tableBody.appendChild(tableRow);
}
