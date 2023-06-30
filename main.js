"use strict"


//coffee card html
var isAdmin = false;
function renderCard(coffee){
    let loggedInStr = `style="display: none;"`
    if(isAdmin){
        loggedInStr = "";
    }
    let roastName = coffee.roast;
    roastName = roastName.charAt(0).toUpperCase()+roastName.slice(1);
    let coffeeNode = document.createElement('div');
    coffeeNode.classList.add('card');
    coffeeNode.innerHTML = `
        <h2 class="card-title">${coffee.name}</h2>\
        <img class="image" src="${coffee.image}" alt="Coffee Pic">
        <h3 class="roast-type">${roastName}</h3>
        <hr class="card-break">
        <p class="card-body">
            ${coffee.description}
        </p>
        <button data-id="${coffee.id}" type="button" class="removeBtn" ${loggedInStr}><i data-id="${coffee.id}" class="fa-solid fa-x"></i></button>
    `;
    let removeButton = coffeeNode.querySelector('button');
    removeButton.addEventListener('click', function(){
        coffeeNode.remove();
        coffees = coffees.filter(thisCoffee => thisCoffee.name !== coffee.name);
    });
    return coffeeNode;
}

//searchbar functionality
function updateCoffees(e) {
    document.querySelector('.cards').innerHTML = '';
    let selectedRoast = roastSelection.value.toString().toLowerCase();
    let searchValue = document.getElementById("searchbar").value.trim();
    console.log(searchValue);
    document.querySelector('#no-search').style.display="none";
    let filteredCoffees = coffees;
    if (selectedRoast !== 'all...') {
        filteredCoffees = filteredCoffees.filter(coffee => coffee.roast.toLowerCase() === selectedRoast);
    }
    if (searchValue !== '') {
        filteredCoffees = filteredCoffees.filter(coffee => coffee.name.toLowerCase().includes(searchValue))
    }
    if(filteredCoffees.length === 0){
        document.querySelector('#no-search').style.display="block";
    }
    for(let coffee of filteredCoffees){
        cardsDiv.appendChild(renderCard(coffee));
    }
}

//login functionality
let userName = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#loginBtn");

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

let newCoffeeSubmit = document.getElementById('newCoffeeSubmit');
newCoffeeSubmit.addEventListener('click',submitModal);

let newCoffeeCancel = document.getElementById('newCoffeeCancel');
newCoffeeCancel.addEventListener('click', function(){
    modal.style.display = "none";
    document.querySelector('#modal-dimmer').style.display = "none";
});

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