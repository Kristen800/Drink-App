'use strict';
/*function getDrink(){
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(responseJson => 
    displayResults(responseJson.drinks[0]))
  .catch(error => alert('Something went wrong. Try again later.'));
}
*/
function getSpecificDrink(){
  let drinkInput = $('#drinkInput').val();
  console.log(drinkInput)
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkInput)
  .then(response => response.json())
  .then(responseJson => 
    displayResults(responseJson.drinks[0]))
  .catch(error => alert('Please check your spelling and try again'));
}

function displayResults(newDrink){
  //if there are previous results, remove them
  console.log(newDrink);
  let ingredients = '';
  $('#results-list').empty();
  //iterate through the drinks array
  for (let i=1; i<=15;i++){
     if(newDrink[`strIngredient${i}`] && newDrink[`strMeasure${i}`]){
     ingredients += createDrink(
     newDrink[`strIngredient${i}`], newDrink[`strMeasure${i}`]);
     }else if(newDrink[`strIngredient${i}`] && !newDrink[`strMeasure${i}`]){
       ingredients += createDrink(newDrink[`strIngredient${i}`])
     }else{
    //stop if there are no more ingredients
    break;
    }
 }
    //for each drink object in the drinks array, add a list item to the reuslts.
    //list with the drink title, image, glass type, ingredients, measurements, and instructions.
    $('#results-list').append(
      `<li>
      <h4>${newDrink.strDrink}<h4>
      <div class="row">
        <div class="five columns">
         <img src="${newDrink.strDrinkThumb}" alt="${newDrink.strDrink}" width=200 height=200>
        </div>
      
      <div class="seven columns">
      <h4>Ingredients:</h4>
      <ul>
      ${ingredients}
       </ul>
       </div>
      </div>
      <p>${newDrink.strInstructions}</p>
      <p>Serve in a ${newDrink.strGlass} and enjoy!</p>
      
      <li>`
    );
    //display the results section
    $('#results').removeClass('hidden');
  };


  let createDrink=(ingredient,measurement='') =>{
  return `<li>
  <span>
  <p>${ingredient} ${measurement}</p>
  </span>
  </li>`
    
}
//form submission
function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
   // getDrink();
    getSpecificDrink();
  });
}


//call the function
$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});