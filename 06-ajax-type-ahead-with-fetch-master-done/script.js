const endpoint = 'cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data)); // @TODO mi az a then()

function findMatches(wordToMatch, cities) {
    return cities.filter(place => { // @TODO mit csinál pontosan
        // here we need to figure out if city or state matches what was searched

        const regex = new RegExp(wordToMatch, 'gi'); // @TODO mi a RegExp és miért pont gi van ott
        return place.city.match(regex) || place.state.match(regex) // @TODO mire jó a match függvény
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // @TODO karatek készlet mik pontosan
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => { // @TODO mi a map function
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`);
        const cityState = place.state.replace(regex, `<span class="h1">${this.value}</span>`);

        return `
            <li>
                <span class="name">${cityName}, ${cityState}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join(''); // @TODO mi a join function

    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);