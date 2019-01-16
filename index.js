let recipe_db = []
class Recipe{
  /*  
    Purpose: Hold data from the recipe-form form. 
    name <string> 
    description <string>
    ingredients array<string>
  */
  constructor(form, name, description, ingredients){
    this.form = form.innerHTML || undefined; 
    this.name = name || ""
    this.description = description || ""
    this.ingredients = Array.from(ingredients) || []
    this.id = recipe_db.length + 1
    
    recipe_db.push(this)
  }
  getDetails(){
    return {"name":this.name.value, "description":this.description.value, "ingredients": this.ingredients.map( (ele) => ele.value ) }
  }
}
document.addEventListener("DOMContentLoaded", function(event) {
  init()
})
function init() {
  //put any page initialization/handlebars initialization here
  Handlebars.registerHelper("displayIngredient", displayIngredientHandler)
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById("recipe-details-partial").innerHTML)
  Handlebars.registerPartial("recipeFormPartial", "")
}

function displayEditForm(){
  clearForm('#show-page')
  addToPage(recipe_db[recipe_db.length - 1].form)
}
function createRecipe(){
    
}

function displayIngredientHandler(ingredient){
  return new Handlebars.SafeString(`<li name="ingredients">${ingredient}</li>`)
}

function addToPage(html){
  let complete_html = {"data": undefined, "fn":undefined, "html": undefined}
  complete_html.data = html 
  document.querySelector("main").innerHTML = complete_html.html
  
}
function clearForm(query){
  let ele = document.querySelector(query)
  if(ele){
  ele.parentNode.removeChild(ele)
  }
}

function handleSubmit(){
  let recipe_form = document.getElementById("recipe-form")
  if(recipe_form){
  let recipe_form_name =  recipe_form.querySelector("#name")
  let recipe_form_description = recipe_form.querySelector("#description")
//  let form_details = recipe_form.elements 
  recipe_form_name.setAttribute("value", recipe_form_name.value)
  recipe_form_description.setAttribute("value", recipe_form_description.value)
  
  for(let ingredient of recipe_form.querySelectorAll("input[name='ingredients']")){
    ingredient.setAttribute("value", ingredient.value)
  }
  let ingredients_list = document.getElementsByName("ingredients")
  let new_recipe = new Recipe(recipe_form, recipe_form_name, recipe_form_description, ingredients_list)
  }
  showPage()
}
function showPage(){
    clearForm("form");
   let recipe_details_partial_data = document.getElementById("recipe-template").innerHTML 
   let recipe_details_partial_context = recipe_db[0].getDetails()
    let recipe_details_partial_fn = Handlebars.compile(recipe_details_partial_data)
   let recipe_details_html = recipe_details_partial_fn(recipe_details_partial_context)
  addToPage(recipe_details_html)
}
