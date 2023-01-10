"use strict"

// function renderCoffee(coffee) {
//     var html = '<tr class="coffee">';
//     html += '<td>' + coffee.id + '</td>';
//     html += '<td>' + coffee.name + '</td>';
//     html += '<td>' + coffee.roast + '</td>';
//     html += '</tr>';
//
//     return html;
// }

function renderCard(coffee){

    let html= `<div class="card">`;
    html += `<h2 class="card-title">${coffee.name}</h2>`;
    html += `<img class="image" src="img/testCoffee.jpeg" alt="Coffee Pic">`;
    html += `<h3 class="roast-type">${coffee.roast}</h3>`;
    html += `<hr>`;
    html += `<p class="card-body">`;
    html += `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dicta dolorem earum facilis iure ut.`;
    html += `</p>`;
    html += `</div>`;
    return html;
}

function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCard(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    let recorded = document.getElementById("searchbar").value.trim();
    // if (selectedRoast === "All..."){
    //     cardsDiv.innerHTML = renderCoffees(coffees);
    // }

    coffees.forEach(function(coffee) {
        if(selectedRoast === "All..." && recorded === ""){
            filteredCoffees.push(coffee);
            return;
        }
        if (selectedRoast !== "All..." && coffee.roast !== selectedRoast){
            return;
        }
        if (coffee.name.includes(recorded) && coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
            return;
        }
        if(selectedRoast === "All..." && coffee.name.includes(recorded)){
            filteredCoffees.push(coffee);
            return;
        }
    });
    cardsDiv.innerHTML = renderCoffees(filteredCoffees);

}


//navbar functionality
function dropDown(){
    // document.getElementById("myDropDown").classList.add("show");
    document.getElementById("myDropDown").style.display = "block";
}
let btn1 = document.querySelector("#btn1");
btn1.addEventListener('click', dropDown);

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let cardsDiv = document.querySelector('div.cards');
let searchbar = document.getElementById("searchbar");
// let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
searchbar.addEventListener("keyup", updateCoffees);
// submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change',updateCoffees)
updateCoffees();