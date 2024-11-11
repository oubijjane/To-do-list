import "./style.css";
import { createTask, project, projects } from "./taskManager";
import { compareAsc, format } from "date-fns";

let task = createTask();
task.setTitle("sleep");
task.setDueDate(format(new Date(2024, 10, 11), "yyyy-MM-dd"));

let task1 = createTask();
task1.setTitle("sleep1");
task1.setDueDate(format(new Date(2024, 10, 11), "yyyy-MM-dd"));

let task2 = createTask();
task2.setTitle("sleep2");
task2.setDueDate(format(new Date(2024, 10, 8), "yyyy-MM-dd"));

let task3 = createTask();
task3.setTitle("sleep more");
task3.setDueDate(format(new Date(2024, 10, 23), "yyyy-MM-dd"));

let task4 = createTask();
task4.setTitle("sleep4");
task4.setDueDate(format(new Date(2024, 10, 15), "yyyy-MM-dd"));

let newProject = project();
newProject.setProjectName("lazyness");
newProject.addTask(task);
newProject.addTask(task1);
newProject.addTask(task2);
newProject.addTask(task3);
newProject.addTask(task4);

let secondProject = project();
newProject.setProjectName("fitness");

newProject.getTasks().forEach(task => console.log(task.info()));
console.log(Date());



/* console.log("hello");
let task = createTask();
task.setTitle("sleep");
let newProject = project();
newProject.setProjectName("lazyness");
newProject.addTask(task);
let allProjects = projects()
allProjects.addProject(newProject);
console.log(allProjects.getProjects()[0].getTasks()[0].info());
let date = new Date(2024, 6, 2);
console.log(format(date,"MM/dd/yy")); */

function dispalyController() {
    const menu = document.querySelector(".sideBarMenu");
    const content = document.querySelector(".content");
    const dialog = document.querySelector("dialog");
    let allProjects = projects();
    allProjects.addProjects(newProject);
    menu.addEventListener("click", (e) => {
        if (e.target.className === "today") {
            displayTodayTasks(content, allProjects);
            return;
        }
        if (e.target.className === "upcomming") {
            displayUpcommingTasks(content, allProjects);
            //console.log(allProjects.getProjects()[0].getTasks()[0].info());
            return;
        } if (e.target.className === "logbook") {
            getDueTasks(allProjects.getProjects()).forEach(task => console.log(task.info()));
            displayDueTasks(content, allProjects);
            //console.log(allProjects.getProjects()[0].getTasks()[0].info());
            return;
        }
    });
    content.addEventListener("click", (e) => {
        console.log(e.target.className);
        e.target.preve
        if (e.target.className === "open") {
            let d = "hello";
            dialog.showModal();
        } else if (e.target.className.includes("close")) {
            dialog.close();
        } else if (e.target.className.includes("add")) {
            e.preventDefault();
            addToPreject(allProjects, "lazyness", addNewTask());
        }
    })

}
function getTodaytasks(projects) {
    let taskList = [];
    let todayDate = format(Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() === todayDate);
        console.log(tasksForToday);
        taskList.push(...tasksForToday);
    });
    return Array.from(taskList)
}

function getUpcomingTasks(projects) {
    let taskList = [];
    let todayDate = format(Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() > todayDate);
        console.log(tasksForToday);
        taskList.push(...tasksForToday);
    });
    return Array.from(taskList)
}

function getDueTasks(projects) {
    let taskList = [];
    let todayDate = format(Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() < todayDate);
        console.log(tasksForToday);
        taskList.push(...tasksForToday);
    });
    return Array.from(taskList)
}
function eventController(inputDom, outputDom) {
    inputDom.addEvent
}

function displayTodayTasks(content, projects) {
    getTodaytasks(projects.getProjects()).forEach(task => {
        const div = document.createElement("div");
        const taskTitle = document.createElement("p");
        const taskDate = document.createElement("p");
        const taskDescription = document.createElement("p");
        const taskPriority = document.createElement("p");

        taskTitle.textContent = task.getTitle();
        taskDate.textContent = task.getDueDate();
        taskDescription.textContent = task.getDescription();
        taskPriority.textContent = task.getPriority();

        div.className = "card";
        div.appendChild(taskTitle);
        div.appendChild(taskDate);
        div.appendChild(taskDescription);
        div.appendChild(taskPriority);
        content.appendChild(div);
    }
    );
}

function displayUpcommingTasks(content, projects) {
    getUpcomingTasks(projects.getProjects()).forEach(task => {
        const div = document.createElement("div");
        const taskTitle = document.createElement("p");
        const taskDate = document.createElement("p");
        const taskDescription = document.createElement("p");
        const taskPriority = document.createElement("p");

        taskTitle.textContent = task.getTitle();
        taskDate.textContent = task.getDueDate();
        taskDescription.textContent = task.getDescription();
        taskPriority.textContent = task.getPriority();

        div.className = "card";
        div.appendChild(taskTitle);
        div.appendChild(taskDate);
        div.appendChild(taskDescription);
        div.appendChild(taskPriority);
        content.appendChild(div);
    }
    );
}

function displayDueTasks(content, projects) {
    getDueTasks(projects.getProjects()).forEach(task => {
        const div = document.createElement("div");
        const taskTitle = document.createElement("p");
        const taskDate = document.createElement("p");
        const taskDescription = document.createElement("p");
        const taskPriority = document.createElement("p");

        taskTitle.textContent = task.getTitle();
        taskDate.textContent = task.getDueDate();
        taskDescription.textContent = task.getDescription();
        taskPriority.textContent = task.getPriority();

        div.className = "card";
        div.appendChild(taskTitle);
        div.appendChild(taskDate);
        div.appendChild(taskDescription);
        div.appendChild(taskPriority);
        content.appendChild(div);
    }
    );
}
function addNewTask() {
    const title = document.querySelector("#title");
    const dueDate = document.querySelector("#dueDate");
    const description = document.querySelector("#description");
    const priority = document.querySelector("#priority");
    let task = createTask();
    task.setTitle(title.value);
    task.setDueDate(dueDate.value);
    task.setDescription(description.value);
    task.setPriority(priority.value);

    return task;
}

function addToPreject(projects, projectName, task) {
    projects.getProjects().forEach(project => {
        if (project.getProjectName() === projectName) {
            project.addTask(task)
        }
    })
}
dispalyController();
