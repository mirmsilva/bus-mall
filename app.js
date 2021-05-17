'use strict'
//Global Constants/Variables
const resultsPannelUlElem = document.getElementById('goat-clicks');
const goatImageSectionTag = document.getElementById('all_goats');
const leftGoatImageTag = document.getElementById('left_goat_img');
const rightGoatImageTag = document.getElementById('right_goat_img');
const leftGoatH2Elem = document.getElementById('left_goat_h2');
const rightGoatH2Elm = document.getElementById('right_goat_h2');

let voteCounter= 0;

let currentLeftGoat = null;
let currentRightGoat = null;

//goat constructor function
function Goat(name, imgPath){
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0; 
  this.timesShown = 0;

  Goat.allGoats.push(this)
}
let locations = [];
Goat.allGoats = [];

//method for rendering one goat. 
// needs to know 'this'
// needs to know where to render h2 & img tag

Goat.prototype.renderGoat= function(h2,imageTag){
  imageTag.src = this.imgPath;
  h2.textContent = this.name;
}

//global function for taking two goats & calls the function
function renderTwoGoats(leftGoat,rightGoat){
  leftGoat.renderGoat(leftGoatH2Elem, leftGoatImageTag);
  rightGoat.renderGoat(rightGoatH2Elm, rightGoatImageTag);
}

//pick random goats
function pickGoats(){
  const leftGoatIndex = Math.floor(Math.random()*Goat.allGoats.length);
    let rightGoatIndex; 
    while(rightGoatIndex === undefined || rightGoatIndex === leftGoatIndex){
      rightGoatIndex = Math.floor(Math.random()*Goat.allGoats.length);
    }

// assign current left & right goats based off index numbers we got
currentLeftGoat= Goat.allGoats[leftGoatIndex];
currentRightGoat= Goat.allGoats[rightGoatIndex];
}

function renderResults(){
  resultsPannelUlElem.innerHTML= '';
  const h2Elem =document.createElement('h2');
  h2Elem.textContent = 'Goat Likes';
  resultsPannelUlElem.appendChild(h2Elem);
  for(let goat of Goat.allGoats){
    const liElem = document.createElement('li');
    liElem.textContent = `${goat.name} : ${goat.votes}`;
    resultsPannelUlElem.appendChild(liElem);
}
}
//listner & handler
function handleClick(e){
  console.log('i am listening');
  let thingTheyClickedOn = e.target;
  console.log(thingTheyClickedOn);
  if(voteCounter<10){
    if (thingTheyClickedOn ===leftGoatImageTag || thingTheyClickedOn ===rightGoatImageTag){
    //count the vote
     voteCounter++
    //add to the goat
      if (thingTheyClickedOn ===leftGoatImageTag){
      currentLeftGoat.votes++;
      } else{
      currentRightGoat.votes++;
      }
    //render new
    pickGoats();
    renderTwoGoats(currentLeftGoat,currentRightGoat);
    }else{
      alert('you missed the goat');
    }
  } else{
    goatImageSectionTag.removeEventListener('click', handleClick);
    renderResults();
  }
}


goatImageSectionTag.addEventListener('click', handleClick)

new Goat('Cruising Goat', './images/cruisin-goat.jpg');

new Goat('Float Your Goat', './images/float-your-goat.jpg');
new Goat('Goat Away', './images/goat-away.jpg')
new Goat('Goat Out of Hand', './images/goat-out-of-hand.jpg')
new Goat('Kissing Goat', './images/kissing-goat.jpg');
new Goat('Sassy Goat', './images/sassy-goat.jpg');
new Goat('Sweater Goat', './images/sweater-goat.jpg');
new Goat('Smiling Goat', './images/smiling-goat.jpg');

pickGoats();
console.log(currentRightGoat)
console.log(currentLeftGoat)
renderTwoGoats(currentLeftGoat, currentRightGoat)