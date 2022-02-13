import 'regenerator-runtime/runtime';

const handleError = (err) => console.log('Failed to load', err);

const fetchUrl = async (url) => {
    return await fetch(url)
        .then((res) => res.json())
        .catch(handleError);
};

const fetchUrls = async (urls) => {
    return await Promise.all(urls.map((url) => fetchUrl(url)));
};

const getPlanetsList = async (page) => {
    return await fetchUrl(`https://swapi.dev/api/planets/?1=&page=${page}`);
};

const getResidentsList = async (planetsList) => {
    return await Promise.all(
        planetsList.results.map(async (planet) => {
            const residents = await fetchUrls(planet.residents);
            if (residents.length === 0) {
                return { planet: planet.name };
            }
            return residents.map((resident) => ({
                planet: planet.name,
                residentName: resident.name,
                index: `image${resident.url.replace(/\D+/g, '')}`,
                species: resident.species,
            }));
        })
    );
};

const getSpeciesList = async (residentsList) => {
    return await Promise.all(
        [].concat(...residentsList).map(async (resident) => {
            if (!resident.hasOwnProperty('residentName')) {
                return resident;
            } else if (resident.species.length === 0) {
                resident.species = 'Human';
            } else {
                const species = await fetchUrl(resident.species);
                resident.species = species.name;
            }
            return resident;
        })
    );
};
export const getData = async (page) => {
    const planetsList = await getPlanetsList(page);
    const residentsList = await getResidentsList(planetsList);
    const speciesList = await getSpeciesList(residentsList);

    return speciesList;
};
