

let countryDB = [];
const inputRange = document.querySelector('#inputRange');
const btnSort = document.querySelectorAll(".btnSort");
// console.log(btnSort);

let sortMethode = "alpha"

let nbpays = inputRange.value;
inputRange.addEventListener("input", (e) => {
    rangeValue.textContent = e.target.value
    nbpays = e.target.value;
    fetchMethode()
    countryDisplay()
})


const fetchMethode = async () => {
   await fetch('https://restcountries.com/v3.1/all')
   .then((rep) => rep.json()
   .then((data) => countryDB = data))
   console.log(countryDB);
    countryDisplay()
   
}


fetchMethode()

const countryDisplay = () => {
    countryDB.length = nbpays;
    // fetchMethode()

    // countryDB.innerHTML = 
    affichage.innerHTML =  countryDB
    .sort((a, b) => {
        if (sortMethode === "minToMax") {
            return a.population - b.population
            
        }else if (sortMethode === "maxToMin") {  
            return b.population - a.population
           
        }else if (sortMethode === "alpha") {
            return a.translations.fra.common.localeCompare((b.translations.fra.common))
        }
    })
    .filter((pay) => pay.translations.fra.common.toLowerCase().includes(inputSearch.value.toLowerCase()))
    .map((pays) => {

        return `
        <div class="card" style="margin: 20px">
        <img src="${pays.flags.png}" alt="">
        <h2>${pays.translations.fra.common}</h2>
        <em><strong>${pays.capital}</strong> </em>
        <h4> Populations : ${pays.population} </h4>
        </div>
        `
    }

    ).join("")
}

countryDisplay()


inputSearch.addEventListener("input", (e) => {
    console.log(e.target.value)
    countryDisplay()
})

btnSort.forEach((btn) => {
    btn.addEventListener("click", (e) => {
       sortMethode = e.target.id;
       countryDisplay()
    })
})
