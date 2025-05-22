//Differnet Sections
//Every title is in title case (first letter of every word is capital)
let sections = [
    {
        title:"To Do",
        id:"to-do"
    },
    {
        title:"In Progress",
        id:"in-progress"
    },
    {
        title:"Under Review",
        id:"under-review"
    }, 
    {
        title:"Finished",
        id:"finished"
    }
];

//Todos
/*
[
    {
        "title": " ",
        "description": "",
        "section": ""
    },
    {
        "title": " ",
        "description": "",
        "section": ""
    }
    ]
*/
let todos = [];


//Hidden Div
const hiddenDiv = document.getElementById("add-task");

//determine focused area
let focusedSection = "To Do";

//function creation of basic structure
const createArea = (section, index) => {
    //area
    const area = document.createElement("div");
    area.classList.add("tasks-area");
    area.id = `${section["id"]}-area`;
    area.addEventListener("dragover",(e) => {
        e.preventDefault();
        const draggable = document.querySelector(".dragging");
        taskDiv.appendChild(draggable);
        let taskTitle = draggable.querySelector(".task-title").innerText;
        let todo = todos.find(todoObj => {return todoObj.title === taskTitle});
        todo["section"] = section["title"];
    })

    //heading
    const heading = document.createElement("h3");
    heading.classList.add("heading");
    heading.innerText = section["title"];
    area.appendChild(heading);

    //task div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.id = `${section["id"]}-div`;
    area.appendChild(taskDiv);

    //add new button
    const button = document.createElement("button");
    button.classList.add("add-new-button");
    button.addEventListener("click",()=>{
        focusedSection = section["title"];
        hiddenDiv.style.visibility = "visible";
        hiddenDiv.focus();
    })

    const addNewSpan = document.createElement("span");
    addNewSpan.innerText = "Add new"
    button.appendChild(addNewSpan);

    const plusSpan = document.createElement("span");
    plusSpan.innerText = "+"
    button.appendChild(plusSpan);

    area.appendChild(button);

    //return the final area
    return area;
}

//Creation of basic structure
const container = document.getElementById("container");
sections.forEach((section, index) => {
    container.append(createArea(section, index));
});

//hidden div close button
const closeAddArea = ()=> {
    hiddenDiv.style.visibility = "hidden";
}


//hidden div eventlistener
hiddenDiv.addEventListener("focusout",(event)=>{
    const newFocus = event.relatedTarget;

    if(!hiddenDiv.contains(newFocus)){
        hiddenDiv.style.visibility = "hidden";
        const inputBoxArray = hiddenDiv.querySelectorAll(".task-input");

        inputBoxArray.forEach(inputBox => {
            inputBox.value = "";
        });
    }
})

//Component for each task
const createTask = (taskTitle, taskDescription) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.draggable = true;
    div.addEventListener("dragstart", () => {
        div.classList.add("dragging");
        div.style.opacity = 0.5;
    })
    div.addEventListener("dragend", () => {
        div.classList.remove("dragging");
        div.style.opacity = 1;
    })

    const title = document.createElement("h3");
    title.classList.add("task-title");
    title.innerText = taskTitle;
    div.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("task-description");
    description.innerText = taskDescription;
    div.appendChild(description);

    return div;
}

//Check Presence of a task
const isPresent = (taskTitle) => {
    todos.forEach(taksObj => {
        if(taksObj["title"] === taskTitle) return true;
    });
    return false;
}

//Create task Object
const createTaskObj = (taskTitle, taskDescription, taskSection) => {
    const Obj = {}
    Obj["title"] = taskTitle;
    Obj["description"] = taskDescription;
    Obj["section"] = taskSection;

    return Obj;
}

//Add task button
const addTask = () => {
    const taskTitleInput = document.getElementById("task-title-input");
    const taskDescriptionInput = document.getElementById("task-description-input");

    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();

    if(title == "" || description == ""){
        alert("Please Enter both Title and Description of Task");
        return;
    }
    else if(isPresent(title)){
        alert("Task already exists");
        return;
    }

    todos.push(createTaskObj(title, description, focusedSection))
    hiddenDiv.style.visibility = "hidden";
    render();
}

//This function returns the id for a given section title
const getId = (sectionTitle) => {
    let section = sections.find(sec => {return sec.title === sectionTitle});
    return section ? section.id : null;
}

//render function for task container
const render = () => {
    //clear the existing to-do's from all areas
    let taskDivs = [...document.getElementsByClassName("task-div")]; 
    taskDivs.forEach((taskDiv) => {
        taskDiv.innerHTML = "";
    })


    //creating and appending divs for all todos
    todos.forEach(todoObj => {
        const focusedTaskDiv = document.getElementById(`${getId(todoObj["section"])}-div`);
        const task = createTask(todoObj["title"], todoObj["description"]);
        focusedTaskDiv.appendChild(task);
    });
}

render();

