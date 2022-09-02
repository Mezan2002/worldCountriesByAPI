const loadCountryData = async () => {
  const url = "https://restcountries.com/v2/all";
  const res = await fetch(url);
  const data = await res.json();
  displayCountryData(data);
};

const displayCountryData = (countries) => {
  const cardContainer = document.getElementById("cardContainer");
  for (const country of countries) {
    const countryCard = document.createElement("div");
    countryCard.classList.add("col");
    countryCard.innerHTML = `
    <div class="card h-100">
        <img src="${country.flags.png}" class="card-img-top h-50" alt="" />
        <div class="card-body text-center">
        <h5 class="card-title">${country.name}</h5>
        <p class="card-text mb-5">
            This Country name is ${country.name}. This country has a beautiful appearance.The people of that country is so kind and helpful. They don't like to fight they like to love everyone.
        </p>
        <button
            onclick="loadCountryDetails('${country.alpha3Code}')"
            class="btn btn-primary mt-5 w-100"
            data-bs-toggle="modal"
            data-bs-target="#countryDetails"
          >
            Show Details
          </button>
        </div>
    </div>
    `;
    cardContainer.appendChild(countryCard);
    toggleSpinner(false);
  }
};
const loadCountryDetails = async (alphaCode) => {
  const url = `https://restcountries.com/v3.1/alpha/${alphaCode}`;
  const res = await fetch(url);
  const data = await res.json();
  displayCountryDetails(data[0]);
};

const displayCountryDetails = (countryDetails) => {
  console.log(countryDetails);
  const modalTitle = document.getElementById("countryDetailsLabel");
  modalTitle.innerText = `${countryDetails.name.common}`;
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <img src="${countryDetails.flags.png}" class="w-100 h-75 mb-5">
    <h5>Is Independent : ${countryDetails.independent} </h5>
    <h5>Capital of ${countryDetails.name.common} : ${countryDetails.capital} </h5>
    <h5>The Continent : ${countryDetails.continents[0]} </h5>
    <h5>Country Code : ${countryDetails.cca3} </h5>
    <h5>Population of ${countryDetails.name.common} : ${countryDetails.population} Milion </h5>
    <h5>Timezone of ${countryDetails.name.common} : ${countryDetails.timezones[0]} </h5>
  `;
};

const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("spinner");
  if (isLoading === true) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};
toggleSpinner(true);
loadCountryData();
