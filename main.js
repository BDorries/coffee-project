"use strict"

var isAdmin = false;

//coffee card html
function renderCard(coffee){
    let loggedInStr = `style="display: none;"`
    if(isAdmin){
        loggedInStr = "";
    }

    let html= `<div class="card">`;
    html += `<h2 class="card-title">${coffee.name}</h2>`;
    html += `<img class="image" src="${coffee.image}" alt="Coffee Pic">`;
    html += `<h3 class="roast-type">${coffee.roast}</h3>`;
    html += `<hr>`;
    html += `<p class="card-body">`;
    html += `${coffee.description}`;
    html += `</p>`;
    html += `<button data-id="${coffee.id}" type="button" class="removeBtn" ${loggedInStr}><i class="fa-solid fa-x"></i></button>`;
    html += `</div>`;
    return html;
}

//display coffee cards
function renderCoffees(coffees) {
    let html = '';
    for(let i = 0; i < coffees.length; i++) {
        html += renderCard(coffees[i]);
    }
    return html;
}

//searchbar functionality
function updateCoffees(e) {
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    let recorded = document.getElementById("searchbar").value.trim();
    coffees.forEach(function(coffee) {
        if(selectedRoast === "All..." && recorded === ""){
            filteredCoffees.push(coffee);
            return;
        }
        if (selectedRoast !== "All..." && coffee.roast !== selectedRoast){
            return;
        }
        if ((coffee.name.toLowerCase().includes(recorded) || coffee.name.includes(recorded)) && coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
            return;
        }
        if(selectedRoast === "All..." && (coffee.name.toLowerCase().includes(recorded) || coffee.name.includes(recorded))){
            filteredCoffees.push(coffee);
            return;
        }
    });
    cardsDiv.innerHTML = renderCoffees(filteredCoffees);
    let removeBtns = document.querySelectorAll('.removeBtn');
    removeBtns.forEach(function(removeBtn){
        removeBtn.addEventListener("click", function (e){
            let coffeeId = parseInt(e.target.dataset.id);
            deleteCoffeeById(coffeeId);
            updateCoffees();
        })
    });
}

//login functionality
let userName = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#loginBtn");

function logIn(username,password){
    if(username === "admin" && password === "admin"){
    //TODO: display add a coffee function
    }
}

//display associated coffee description on new card
function getCoffeeDesc(coffee){
    if (coffee.roast.toLowerCase() === 'light'){
        return light;
    } else
    if (coffee.roast.toLowerCase() === 'medium'){
        return medium;
    } else
    if (coffee.roast.toLowerCase() === 'dark'){
        return dark;
    }
}

//display associated coffee image on new card
function getCoffeeImage(coffee){
    if (coffee.roast.toLowerCase() === 'light'){
        return imgLight;
    } else
    if (coffee.roast.toLowerCase() === 'medium'){
        return imgMedium;
    } else
    if (coffee.roast.toLowerCase() === 'dark'){
        return imgDark;
    }
}

//create a new coffee card
function addCoffee(inputName, inputRoast){
    let coffee = {};
    let lastID = coffees.length;
    coffee.id = lastID+1;
    coffee.name = inputName;
    coffee.roast = inputRoast;
    coffee.description = getCoffeeDesc(coffee);
    coffee.image = getCoffeeImage(coffee);
    console.log(coffee);
    coffees.push(coffee);
}

//submit modal button
function submitModal(){
    modal.style.display = "none";
    let modalCoffeeName = document.getElementById('coffeeName').value;
    let modalCoffeeRoast = document.getElementById('roastType').value;
    document.querySelector('#modal-dimmer').style.display = "none";
    addCoffee(modalCoffeeName, modalCoffeeRoast);
    updateCoffees();
}

//variables for coffee images
let imgLight = "img/lightRoast.svg";
let imgMedium = "img/mediumRoast.svg";
let imgDark = "img/darkRoast2.svg";

//variables for coffee description
let light = "Light brown in color, this roast is generally preferred for milder coffee varieties.";
let medium = "This roast is medium brown in color with a stronger flavor and a non-oily surface.";
let dark = "This roast produces shiny black beans with an oily surface and a pronounced bitterness.";

//coffees array from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light',description:light, image:imgLight},
    {id: 2, name: 'Half City', roast: 'light',description:light, image:imgLight},
    {id: 3, name: 'Cinnamon', roast: 'light',description:light, image:imgLight},
    {id: 4, name: 'City', roast: 'medium',description:medium, image:imgMedium},
    {id: 5, name: 'American', roast: 'medium',description:medium, image:imgMedium},
    {id: 6, name: 'Breakfast', roast: 'medium',description:medium, image:imgMedium},
    {id: 7, name: 'High', roast: 'dark', description:dark, image:imgDark},
    {id: 8, name: 'Continental', roast: 'dark',description:dark, image:imgDark},
    {id: 9, name: 'New Orleans', roast: 'dark',description:dark, image:imgDark},
    {id: 10, name: 'European', roast: 'dark',description:dark, image:imgDark},
    {id: 11, name: 'Espresso', roast: 'dark',description:dark, image:imgDark},
    {id: 12, name: 'Viennese', roast: 'dark',description:dark, image:imgDark},
    {id: 13, name: 'Italian', roast: 'dark',description:dark, image:imgDark},
    {id: 14, name: 'French', roast: 'dark',description:dark, image:imgDark},
];

//modal functionality
let modal = document.getElementById('inputModal');
let addCoffeeBtn = document.querySelector('#addCoffeeBtn');
addCoffeeBtn.addEventListener('click', function (){
    document.querySelector('#modal-dimmer').style.display = "block";
    modal.style.display = "flex";
});

let modalBtn = document.getElementById('modalBtn');
modalBtn.addEventListener('click',submitModal);

//navbar functionality
function dropDown(){
    document.getElementById("myDropDown").style.display = "block";
}

//login Button functionality
loginBtn.addEventListener('click', function(){

    if(userName.value === 'admin' && password.value === 'admin'){
        isAdmin = true;
        document.querySelector('#addCoffeeBtn').style.display = "block";
        let removeBtns = document.querySelectorAll('.removeBtn');
        removeBtns.forEach(function(removeBtn){
            removeBtn.style.display = "block";
        });
    }
    document.querySelector('#loginForm').style.display = "none";
});

//remove button functionality
function deleteCoffeeById(coffeeId){
    let target = coffees.findIndex(coffee => coffee.id === coffeeId);
    coffees.splice(target,1);
}

//closes login dropdown
document.addEventListener('click',function(e){
    if (e.target.id !== "loginIcon" && e.target.id !== "username"&& e.target.id !== "password" && e.target.id !=="signIn"){
        document.querySelector('#loginForm').style.display = "none";
    }
});

//sign in menu functionality
let signInBtn = document.getElementById('signIn');
signInBtn.addEventListener('click', function(){
   document.querySelector('#loginForm').style.display = "flex";
});

let cardsDiv = document.querySelector('div.cards');
let searchbar = document.getElementById("searchbar");
let roastSelection = document.querySelector('#roast-selection');

searchbar.addEventListener("keyup", updateCoffees);
roastSelection.addEventListener('change',updateCoffees)
updateCoffees();