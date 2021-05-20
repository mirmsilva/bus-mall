'use strict';

//global variables inlcuding the listerner
const orderFormElem = document.getElementById('orderForm');
const orderUlElem = document.getElementById ('orders');
Coffee.drinks = [];

//constructor function
function Coffee (name, size, milk, dt){
  this.name = name;
  this.size = size;
  this.milk = milk;
  this.dt = dt;
 
}

Coffee.prototype.renderCoffee = function(){
  const liElem = document.createElement('li');
  orderUlElem.appendChild(liElem);
  const orderInfoPelem = document.createElement('p')
  orderInfoPelem.textContent. = `${this.name} ordered ${this.size} oz ${this.dt} with ${this.milk} `
  liElem.appendChild(orderInfoPelem);
}  
function renderAllOrders(){
  orderUlElem.innerHTML= '';
  //go through my array of drinks and call renderCoffee on each one
  for (let drink of Coffee.drink){
    drink.renderCoffee();
  }
}
const makeADrink = function(name, size, milk, dt){
  let drink = new Coffee(name, size, milk, dt);
  //everytime I make a drink it will be put in the array
  Coffee.drinks.push(drink); //update storage here
  updateStorage();//update storage
}

//fucntion to update storage
function updateStorage(){
  //turn the thing i Want to store into a string
  const stringifiedDrinks = JSON.stringify(Coffee.drinks);
  //set the item into storage with a key
  localStorage.setItem('drinks', stringifiedDrinks);
}

//write a fucntion to get things from storage
//if you have nothing in storage you'll need to make products
function getStuffOut(){
  //request things from storage with our key
  let drinksFromStorage = localStorage.getItem('drinks');
  //if I get stuff back, parse it
  if(drinksFromStorage){
    let parsedDrink = JSON.parse(drinksFromStorage);
    console.log (parsedDrink);
    //reinstate it
    for(let drink of parsedDrink){
      makeADrink(drink.name, drink.size, drink.milk, drink.dt);
    }
    //render any orders we have from storage
    renderAllOrders();
  }else{
    makeADrink('sample','empty', 'none', 'air');
  }
}
//function to handle submit
function handleSubmit(e){
  e.preventDefault();
  const name = e.target.name.value;
  const size = e.target.size.value;
  const milk = e.target.milk.value;
  const dt = e.target.dt.value;
  makeADrink(name, size, milk, dt);
  renderAllOrders();
}
//attach listener & handle
orderFormElem.addEventListener('submit', handleSubmit)
getStuffOut();
//put something in storage