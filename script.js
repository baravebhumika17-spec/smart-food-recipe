const recipes=[
{name:"Creamy Tomato Pasta",category:"Dinner",time:"25 min",servings:"2",rating:"4.9",image:"images/pasta.svg",desc:"Silky tomato sauce, herbs and pasta for a cozy weeknight dinner.",ingredients:["200g pasta","1 cup tomato sauce","2 tbsp cream","1 garlic clove","Basil & parmesan"],steps:["Boil pasta until al dente and reserve a little pasta water.","Sauté garlic, add tomato sauce and simmer for 8 minutes.","Stir in cream and a splash of pasta water.","Toss in pasta, finish with basil and parmesan."]},
{name:"Berry Breakfast Pancakes",category:"Breakfast",time:"15 min",servings:"2",rating:"4.8",image:"images/pancakes.svg",desc:"Fluffy pancakes topped with berries and a little sweetness.",ingredients:["1 cup flour","1 egg","¾ cup milk","1 tsp baking powder","Berries & honey"],steps:["Mix flour and baking powder.","Whisk egg and milk, then combine with dry ingredients.","Cook small pancakes on a lightly greased pan.","Stack and top with berries and honey."]},
{name:"Garden Fresh Salad",category:"Healthy",time:"10 min",servings:"2",rating:"4.7",image:"images/salad.svg",desc:"Crunchy vegetables, greens and a bright homemade dressing.",ingredients:["Mixed greens","1 tomato","½ cucumber","Sweet corn","Lemon dressing"],steps:["Wash and chop all vegetables.","Add greens and vegetables to a large bowl.","Whisk lemon, olive oil and seasoning.","Toss just before serving."]},
{name:"Golden Veggie Pizza",category:"Lunch",time:"30 min",servings:"3",rating:"4.8",image:"images/pizza.svg",desc:"A colorful homemade pizza loaded with vegetables and cheese.",ingredients:["Pizza base","Tomato sauce","Mozzarella","Bell pepper","Corn & herbs"],steps:["Spread tomato sauce over the base.","Add cheese and chopped vegetables.","Bake until the crust is crisp and cheese melts.","Finish with herbs and slice."]},
{name:"Berry Cream Delight",category:"Dessert",time:"20 min",servings:"4",rating:"4.9",image:"images/dessert.svg",desc:"A pretty layered dessert with berries and soft cream.",ingredients:["Cream","Berries","Biscuits","Honey","Vanilla"],steps:["Whip cream with vanilla and honey.","Crush biscuits and layer in glasses.","Add cream and berries.","Chill before serving."]},
{name:"Quick Tomato Pasta",category:"Quick",time:"20 min",servings:"2",rating:"4.6",image:"images/pasta.svg",desc:"A speedy pantry-friendly pasta for busy evenings.",ingredients:["Pasta","Tomatoes","Garlic","Olive oil","Chili flakes"],steps:["Cook pasta.","Sauté garlic and tomatoes with olive oil.","Season and combine with pasta.","Serve hot with herbs."]}
];
let current="All", saved=new Set();
const grid=document.getElementById("recipeGrid");
function render(list=recipes){
 grid.innerHTML="";
 if(!list.length){grid.innerHTML='<div class="empty">No recipes found. Try another search.</div>';return}
 list.forEach((r,i)=>{
  const card=document.createElement("article");card.className="recipe-card";
  card.innerHTML=`<div class="recipe-img"><img src="${r.image}" alt="${r.name}"><button class="heart ${saved.has(i)?"saved":""}" onclick="toggleSave(event,${i})">${saved.has(i)?"♥":"♡"}</button></div><div class="recipe-body"><span class="tag">${r.category.toUpperCase()}</span><h3>${r.name}</h3><p>${r.desc}</p><div class="recipe-foot"><span>⏱ ${r.time} &nbsp; ★ ${r.rating}</span><button class="view" onclick="openRecipe(${i})">View recipe →</button></div></div>`;
  grid.appendChild(card);
 });
}
function filterRecipes(cat){
 current=cat;
 document.querySelectorAll(".filters button").forEach(b=>b.classList.toggle("active",b.textContent===cat));
 let list=cat==="All"?recipes:recipes.filter(r=>r.category===cat || (cat==="Quick"&&r.time.includes("20")));
 render(list);
 document.getElementById("recipes").scrollIntoView({behavior:"smooth",block:"start"});
}
function searchRecipes(){
 const q=document.getElementById("search").value.toLowerCase();
 render(recipes.filter(r=>(current==="All"||r.category===current)&&(`${r.name} ${r.category} ${r.desc}`).toLowerCase().includes(q)));
}
function toggleSave(e,i){e.stopPropagation();saved.has(i)?saved.delete(i):saved.add(i);searchRecipes()}
function openRecipe(i){
 const r=recipes[i];document.getElementById("modalImg").src=r.image;document.getElementById("modalImg").alt=r.name;
 document.getElementById("modalCategory").textContent=r.category.toUpperCase();
 document.getElementById("modalTitle").textContent=r.name;document.getElementById("modalDescription").textContent=r.desc;
 document.getElementById("modalTime").textContent=r.time;document.getElementById("modalServings").textContent=r.servings+" servings";document.getElementById("modalRating").textContent=r.rating;
 document.getElementById("modalIngredients").innerHTML=r.ingredients.map(x=>`<li>${x}</li>`).join("");
 document.getElementById("modalSteps").innerHTML=r.steps.map(x=>`<li>${x}</li>`).join("");
 document.getElementById("modal").classList.add("show");
}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function outsideClose(e){if(e.target.id==="modal")closeModal()}
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsMsg").textContent="Thanks! Your weekly recipe inspiration is on its way.";e.target.reset()});
render();
