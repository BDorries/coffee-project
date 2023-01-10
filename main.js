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
    let recorded = document.getElementById("searchbar").value;
    if (selectedRoast === "All..."){
        cardsDiv.innerHTML = renderCoffees(coffees);
    } else{
        coffees.forEach(function(coffee) {
            if (coffee.name.indexOf(recorded) >= 0) {
                filteredCoffees.push(coffee);
            } else
                if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
    cardsDiv.innerHTML = renderCoffees(filteredCoffees);
    }
}
//navbar functionality
function dropDown(){
    document.getElementById("myDropDown").classList.toggle("show");
}
document.querySelector("#btn1");

window.onclick = function(event) {
    if (!event.target.matches('.btn1')) {
        var dropdowns = document.getElementsByClassName("searchbar");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

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
let searchbar = document.getElementById("#searchbar");
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');

// if (document.getElementById('#searchbar').hasFocus()) {
    searchbar.addEventListener("keyup", updateCoffees);
// };

submitButton.addEventListener('click', updateCoffees);