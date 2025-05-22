//varibles of each task
let sections = [["To Do","to-do",{}], ["In Progress","in-progress",{}], ["Under Review","under-review",{}], ["Finished","finished",{}]];

//Hidden Div
const hiddenDiv = document.getElementById("add-task");

//determine focused area
let focusedTasksIndex = 0;

//function creation of basic structure
const createArea = (section, index) => {
    //area
    const area = document.createElement("div");
    area.classList.add("tasks-area");
    area.id = `${section[1]}-area`;
    area.addEventListener("dragover",(e) => {
        e.preventDefault();
        const draggable = document.querySelector(".dragging");
        taskDiv.appendChild(draggable);
        console.log("over");
    })

    //heading
    const heading = document.createElement("h3");
    heading.classList.add("heading");
    heading.innerText = section[0];
    area.appendChild(heading);

    //task div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.id = `${section[1]}-div`;
    area.appendChild(taskDiv);

    //add new button
    const button = document.createElement("button");
    button.classList.add("add-new-button");
    button.addEventListener("click",()=>{
        focusedTasksIndex = index;
        console.log(focusedTasksIndex);
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
        console.log("dragging");
    })
    div.addEventListener("dragend", () => {
        div.classList.remove("dragging");
        div.style.opacity = 1;
        console.log("dragging Stopped");
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

//Add task button
const addTask = () => {
    const taskTitleInput = document.getElementById("task-title-input");
    const taskDescriptionInput = document.getElementById("task-description-input");

    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;

    if(title == "" || description == ""){
        alert("Please Enter both Title and Description of Task");
        return;
    }

    for(let i=0; i<4; i++){
        if(title in sections[i][2]){
            alert("Task already exists");
            return;
        }
    }

    sections[focusedTasksIndex][2][title] = description;
    hiddenDiv.style.visibility = "hidden";
    render();
}

//render function for task container
const render = () => {
    const focusedTaskDiv = document.getElementById(`${sections[focusedTasksIndex][1]}-div`);
    focusedTaskDiv.innerHTML = "";
    focusedTasksObj = sections[focusedTasksIndex][2];

    Object.keys(focusedTasksObj).forEach((taskTitle)=> {
        const task = createTask(taskTitle, focusedTasksObj[taskTitle]);
        focusedTaskDiv.appendChild(task);
    })
}

render();

