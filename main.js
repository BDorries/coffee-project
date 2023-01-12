"use strict"

//display coffee cards
function renderCard(coffee){

    let html= `<div class="card">`;
    html += `<h2 class="card-title">${coffee.name}</h2>`;
    html += `<img class="image" src="${coffee.image}" alt="Coffee Pic">`;
    html += `<h3 class="roast-type">${coffee.roast}</h3>`;
    html += `<hr>`;
    html += `<p class="card-body">`;
    html += `${coffee.description}`;
    html += `</p>`;
    html += `<button class="removeBtn"><i data-dbid="${coffee.id}" class="fa-solid fa-x"></i></button>`;
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

document.addEventListener("click", function (e){
    let target = e.target.id;
    coffees.splice(target,1);
})


//searchbar
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
//create a coffee
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

function submitModal(){
    modal.style.display = "none";
    let modalCoffeeName = document.getElementById('coffeeName').value;
    let modalCoffeeRoast = document.getElementById('roastType').value;
    document.querySelector('#modal-dimmer').style.display = "none";
    addCoffee(modalCoffeeName, modalCoffeeRoast);
    updateCoffees();
}
let imgLight = "img/lightRoast.svg";
let imgMedium = "img/mediumRoast.svg";
let imgDark = "img/darkRoast.svg";

let light = "Light brown in color, this roast is generally preferred for milder coffee varieties.";
let medium = "This roast is medium brown in color with a stronger flavor and a non-oily surface.";
let dark = "This roast produces shiny black beans with an oily surface and a pronounced bitterness.";
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
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

//modal
let modal = document.getElementById('inputModal');
let addCoffeeBtn = document.querySelector('#addCoffeeBtn');
addCoffeeBtn.addEventListener('click', function (){
    document.querySelector('#modal-dimmer').style.display = "block";
    modal.style.display = "flex";
});

let modalBtn = document.getElementById('modalBtn');
modalBtn.addEventListener('click',submitModal);

//close popups if !target
// document.onclick = function(e){
//     if (e.target.id !== "loginForm"){
//         document.querySelector('#loginForm').style.display = "none";
//     }
// }

//navbar functionality
function dropDown(){
    document.getElementById("myDropDown").style.display = "block";
}
let btn1 = document.querySelector("#btn1");
btn1.addEventListener('click', dropDown);

//login Button
loginBtn.addEventListener('click', function(){

    if(userName.value === 'admin' && password.value === 'admin'){
        document.querySelector('#addCoffeeBtn').style.display = "block";
        let removeBtns = document.querySelectorAll('.removeBtn');
        removeBtns.forEach(function(removeBtn){
            removeBtn.style.display = "block";
        });
    }
    document.querySelector('#loginForm').style.display = "none";
});

document.addEventListener('click',function(e){
    console.log(e);
    if (e.target.id !== "loginIcon" && e.target.id !== "username"&& e.target.id !== "password"){
        document.querySelector('#loginForm').style.display = "none";
    }

    // if (e.target.id !== "hamburger" && document.documentElement.clientWidth < 650){
    //     document.querySelector('#myDropDown').style.display = "none";
    // }
});

// document.addEventListener('resize', function (){
//     if(document.documentElement.clientWidth < 650){
//         document.querySelector('#myDropDown').style.display = "none";
//     }
//     if(document.documentElement.clientWidth >= 650){
//         document.querySelector('#myDropDown').style.display = "flex";
//     }
// })

//sign in menu
let signInBtn = document.getElementById('signIn');
signInBtn.addEventListener('click', function(){
   document.querySelector('#loginForm').style.display = "flex";
});

let cardsDiv = document.querySelector('div.cards');
let searchbar = document.getElementById("searchbar");
// let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
searchbar.addEventListener("keyup", updateCoffees);
// submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change',updateCoffees)
updateCoffees();