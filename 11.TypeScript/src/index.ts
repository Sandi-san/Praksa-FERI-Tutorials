import { v4 as uuidV4 } from 'uuid'

//definiraj tip (type) Task (ker TypeScript noce imeti 'any' tipov)
type Task = {
    id: string,
    title: string,
    completed: boolean,
    cretedAt: Date
}

//dobi HTML element z id-jem - podaj tip elementa v <>
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
//primer: uporaba z findElementById
// const form = document.getElementById("#new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

//array Task-ov (za local storage)
const tasks: Task[] = loadTasks()
//za vsak task, ustvari HTML
tasks.forEach(addListItem)

//dodaj listener na submit button
form?.addEventListener("submit", e=> {
    //izogni nepotrebni page refresh
    e.preventDefault();

    //empty textbox (?-optional chaning)
    if(input?.value == "" || input?.value == null) return
    
    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        cretedAt: new Date()
    }
    tasks.push(newTask);

    //klici funkcijo za add item
    addListItem(newTask);
    saveTasks()
    //clear label
    input.value = "";
});

function addListItem(task: Task){
    //ustvari HTML elemente za novi task
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.checked = task.completed

    //ustvari event listener ko spreminjas checkbox
    checkbox.addEventListener("change",()=>{
        task.completed = checkbox.checked
        saveTasks()
    })

    //postavi elemente na stran
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
}

//shrani v local storage
function saveTasks(){
    localStorage.setItem("TASKS",JSON.stringify(tasks))
}

//dobi Taske iz local storage
function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS")
    //null safety
    if(taskJSON == null) return []
    return JSON.parse(taskJSON)
}