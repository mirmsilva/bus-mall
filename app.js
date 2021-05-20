'use strict'
//Global Constants/Variables
const resultsPannelUlElem = document.getElementById('item-clicks');
const itemImageSectionTag = document.getElementById('all_items');
const leftItemImageTag = document.getElementById('left_item_img');
const middleItemImageTag = document.getElementById('middle_item_img');
const rightItemImageTag = document.getElementById('right_item_img');
const leftItemH2Elem = document.getElementById('left_item_h2');
const middleItemH2Elem = document.getElementById('middle_item_h2');
const rightItemH2Elm = document.getElementById('right_item_h2');

let voteCounter= 0;

//current items
let currentLeftItem = null;
let currentMiddleItem = null;
let currentRightItem = null;


//constructor functions

// item
const Item = function(name, imgPath){
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0; 
  this.timesViewed = 0;

  Item.allItems.push(this)
}

Item.allItems = [];

//chart
const makeItemChart = function(){
  const itemChart = document.getElementById('itemChart').getContext('2d');
  const itemData =[]; //data array
  const itemViews =[]; // item view array
  const itemLabels= []; //label array

  //iterate through Item.allImages & grab the name, views & clicks
  for(let item of Item.allItems){
    itemData.push(item.votes);
    itemViews.push(item.timesViewed);
    itemLabels.push(item.name);
  }
  //chart data
  const myChart = new Chart(itemChart, {
    type: 'bar',
    data: {
        labels: itemLabels,
        datasets: [{
            label: '# of Votes',
            data: itemData,
            backgroundColor: 'purple',
    },{
      label: '# of Views',
            data: itemViews,
            backgroundColor: 'lightgrey',
    }]
  },
  options: {
      scales: {
        yAxes: [{
          ticks:{
            beginAtZero: true
          }
        }]
      }
    }
  });
}


//function prototype

//rendering an item
Item.prototype.renderItem= function(h2,imageTag){
  imageTag.src = this.imgPath;
  h2.textContent = this.name;
}

//functions

//render three items
function renderThreeItems(leftItem,middleItem, rightItem){
  leftItem.renderItem(leftItemH2Elem, leftItemImageTag);
  middleItem.renderItem(middleItemH2Elem, middleItemImageTag);
  rightItem.renderItem(rightItemH2Elm, rightItemImageTag);
}

//picking random items
function pickItems(){
  const usedItems = [];
  usedItems.push(currentLeftItem);
  usedItems.push(currentMiddleItem);
  usedItems.push(currentRightItem);
  while(usedItems.includes(currentLeftItem)){
    let leftItemIndex = Math.floor(Math.random()*Item.allItems.length);
    currentLeftItem = Item.allItems[leftItemIndex];
  }
  usedItems.push(currentLeftItem);

  while(usedItems.includes(currentMiddleItem)){
    let middleItemIndex = Math.floor(Math.random()*Item.allItems.length);
    currentMiddleItem = Item.allItems[middleItemIndex];
  }
  usedItems.push(currentMiddleItem);

  while(usedItems.includes(currentRightItem)){
    let rightItemIndex = Math.floor(Math.random()*Item.allItems.length);
    currentRightItem = Item.allItems[rightItemIndex];

    }
  }

//rendering results on screen
function renderResults(){
  resultsPannelUlElem.innerHTML= '';
  const h2Elem =document.createElement('h2');
  h2Elem.textContent = 'Item Likes';
  resultsPannelUlElem.appendChild(h2Elem);

  for(let item of Item.allItems){
    const liElem = document.createElement('li');
    liElem.textContent = `${item.name} received: ${item.votes} votes & ${item.timesViewed} views`;
    resultsPannelUlElem.appendChild(liElem);
}
}
//function to update storage
function updateStorage(){
  const stringifiedItems = JSON.stringify(Item.allItems);  //turn the thing i Want to store into a string
  localStorage.setItem('items', stringifiedItems);//set the item into storage with a key
}

//write a function to get things from storage
//if you have nothing in storage you'll need to make products
function getStuffOut(){
  let itemsFromStorage = localStorage.getItem('items');//request things from storage with our key
  //if I get stuff back, parse it
  if(itemsFromStorage){
    let parsedItem = JSON.parse(itemsFromStorage);
    console.log (parsedItem);
    //reinstate it
    for(let item of parsedItem){
      let myItem = new Item(item.name, item.imgPath)
      myItem.votes = items.votes;
      myItem.timesViewed = items.timesViewed;
    } console.log (Item.allItems)
    //render any orders we have from storage
  }else{
    makeItem();
  }
}
//click handler - increments item vote & views
function handleClick(e){
  let thingTheyClickedOn = e.target;
  console.log(thingTheyClickedOn);
  if(voteCounter<5){
    if (thingTheyClickedOn ===leftItemImageTag || thingTheyClickedOn === middleItemImageTag ||thingTheyClickedOn ===rightItemImageTag){
      //count vote & add to item
     voteCounter++;
     currentLeftItem.timesViewed++;
     currentMiddleItem.timesViewed++;
     currentRightItem.timesViewed++;
      if (thingTheyClickedOn ===leftItemImageTag){
      currentLeftItem.votes++;
      }else if(thingTheyClickedOn ===middleItemImageTag){
        currentMiddleItem.votes++;
      }else if(thingTheyClickedOn ===rightItemImageTag){
        currentRightItem.votes++;
      }

    //render new item
    pickItems();
    renderThreeItems(currentLeftItem,currentMiddleItem,currentRightItem);
    }else{
      alert('you missed the item');
    }
  } else{
    itemImageSectionTag.removeEventListener('click', handleClick);
    renderResults();
    makeItemChart();
  }
}

//listner
itemImageSectionTag.addEventListener('click', handleClick)

//item list
function makeItem(){
  new Item('bag', 'images/bag.jpeg');
  new Item('banana', 'images/banana.jpeg');
  new Item('bathroom', 'images/bathroom.jpeg');
  new Item('boots', 'images/boots.jpeg');
  new Item('breakfast', 'images/breakfast.jpeg');
  new Item('bubblegum', 'images/bubblegum.jpeg');
  new Item('chair', 'images/chair.jpeg');
  new Item('cthulhu', 'images/cthulhu.jpeg');
  new Item('dog-duck', 'images/dog-duck.jpeg');
  new Item('dragon', 'images/dragon.jpeg');
  new Item('pen', 'images/pen.jpeg');
  new Item('pet-sweep', 'images/pet-sweep.jpeg');
  new Item('scissors', 'images/scissors.jpeg');
  new Item('shark', 'images/shark.jpeg');
  new Item('sweep', 'images/sweep.png');
  new Item('tauntaun', 'images/tauntaun.jpeg');
}
//display items
getStuffOut();
pickItems();
console.log(currentRightItem)
console.log(currentMiddleItem)
console.log(currentLeftItem)
renderThreeItems(currentLeftItem, currentMiddleItem, currentRightItem);


