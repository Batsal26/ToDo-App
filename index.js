
const input = document.querySelector(".input input");
const plus = document.querySelector(".plus");
const date = document.querySelector(".date")

const lists = document.querySelector(".list_holder")
const clear = document.querySelector(".clear")
const line_through = "lineThrough"
const rows = document.querySelector(".list_holder li")

const CHECK = "fa-circle-check";
const UNCHECK = "fa-circle-notch";

const help2 = document.querySelector(".help2");

let LIST, id;


//add todos to localstorage (this code must be added where the LIST array is updated)
//localStorage.setItem("ToDo", JSON.stringify(LIST))

//Get todos from the localstorage
const data = localStorage.getItem("ToDo");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}


input.onkeyup = () =>{
    const userData = input.value;
    if(userData.trim()!=0){
        plus.classList.add("active");
    } else {
        plus.classList.remove("active");
    }
}

//Date
const options = {weekday:"long", month:"short", day:"numeric"}
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);







//addToDo Function
function addToDo(toDo, id, done, trash){

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? line_through : "";
    
    const row = `
    <li>
    <i class="fa-solid ${DONE}" job="complete" id="${id}"></i>
    <span class="text ${LINE}">${toDo}</span>
    <i class="fa-solid fa-trash-can" class="bin" job="delete" id="${id}"></i>
    </li>
                `;

    const position = "beforeend";

    lists.insertAdjacentHTML(position, row);
}


//Enter Key
document.addEventListener("keyup", function(even){
    if(event.keyCode==13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false,
            });
            localStorage.setItem("ToDo", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//Plus Key
plus.addEventListener("click", function(event){
    const toDo = input.value;
    if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
            name:toDo,
            id:id,
            done:false,
            trash:false,
        });
        localStorage.setItem("ToDo", JSON.stringify(LIST));

        id++;
    }
    input.value = "";
})


function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
    
}

lists.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("ToDo", JSON.stringify(LIST));
})

help2.addEventListener('click', function(){
    alert("ToDo List App is a kind of app that generally used to maintain our day-to-day tasks or list everything that we have to do, with the most important tasks at the top of the list, and the least important tasks at the bottom. It is helpful in planning our daily schedules.")
})

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})
