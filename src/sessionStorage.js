export function getSpeciesFromSStorage(page) {
    const storageSpecies = sessionStorage.getItem(page);
    return storageSpecies ? JSON.parse(storageSpecies) : [];
}

export function setSpeciesToSStorage(page, speciesList) {
    sessionStorage.setItem(page, JSON.stringify(speciesList));
}
