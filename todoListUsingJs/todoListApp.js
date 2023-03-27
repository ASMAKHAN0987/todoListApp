// selectors
let form = document.getElementById("form");
let btn = document.getElementById("btn");
let iTag = document.querySelector(".fa-check");
let iTag2 = document.querySelector("fa-trash-can");
let ul = document.querySelector("ul");
let par = ul.childNodes;
console.log(btn);
let selectElement = document.querySelector("#dropDown");
selectElement.addEventListener("change", () => {
  par.forEach((todo)=>{
    console.log(todo);
     switch(selectElement.value){
      case "All":
         todo.style.display = "flex";
         break;
      case "completed":
          if(todo.classList.contains("completed")){
              todo.style.display = "flex";
          }  
          else{
            todo.style.display = "none";
          }
         break;
      case "uncompleted":
         if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
         }     
         else
         {
          todo.style.display = "none";
          break;
         }
     }
  })
});
// event listener of form
btn.addEventListener("click", function saveList(event) {
  event.preventDefault();
  console.log("hello");
  let list = document.querySelector("#text");
  console.log(list.value);
  if (localStorage.getItem("lotsOfList") === null) {
    let lotsOfList = [];
    localStorage.setItem("lotsOfList", JSON.stringify(lotsOfList));
  }
  let lotsOfList = JSON.parse(localStorage.getItem("lotsOfList"));
  lotsOfList.push(list.value);
  localStorage.setItem("lotsOfList", JSON.stringify(lotsOfList));
  createList(list.value);
   list.value = "";
});
window.addEventListener("load", () => {
  let lotsOfList2 = JSON.parse(localStorage.getItem("lotsOfList"));
    lotsOfList2.forEach((element) => {
      createList(element);
    });
});
// create List function
function createList(element) {
  let liTag = document.createElement("li");
  let divForI = document.createElement("div");
  let iTag = document.createElement("i");
  let iTag2 = document.createElement("i");
  let pTag = document.createElement("p");
  pTag.innerHTML = element;
  // setting attributes in li tag
  iTag.classList.add("fa-solid");
  iTag.classList.add("fa-check");
  iTag2.classList.add("fa-solid");
  iTag2.classList.add("fa-trash-can");
  iTag.setAttribute("onclick", "remove(event)");
  iTag2.setAttribute("onclick", "remove(event)");
  divForI.appendChild(iTag);
  divForI.appendChild(iTag2);
  liTag.appendChild(pTag);
  liTag.appendChild(divForI);
  ul.appendChild(liTag);
}
function remove(e) {
  console.log("hello");
  let lotsOfList2 = JSON.parse(localStorage.getItem("lotsOfList"));
  let deleteNode = e.target.parentElement.parentElement;
  let targetedNode = e.target;
  if(targetedNode.classList.contains("fa-trash-can")){
  deleteNode.classList.add("fall");
  deleteNode.addEventListener('transitionend',function(){
    deleteNode.remove();
  })
  // todo with develpedbyed
  // remove element from local storage
  let todo = deleteNode.firstElementChild.innerHTML;
    let indexOfTodo = lotsOfList2.indexOf(todo);
    lotsOfList2.splice(indexOfTodo,1);
    localStorage.setItem("lotsOfList", JSON.stringify(lotsOfList2));
}
    // now I am adding a new function here about line through to a li 
    if(targetedNode.classList.contains("fa-check")){
      deleteNode.classList.toggle("completed");
    }
}
