import "./style.css";
import { createTask, project, projects } from "./taskManager";
import { compareAsc, format } from "date-fns";

let task = createTask();
task.setTitle("sleep");
task.setDueDate(format(new Date(2024, 10, 9), "MM/dd/yy"));

let task1 = createTask();
task1.setTitle("sleep1");
task1.setDueDate(format(new Date(2024, 10, 8), "MM/dd/yy"));

let task2 = createTask();
task2.setTitle("sleep2");
task2.setDueDate(format(new Date(2024, 10, 8), "MM/dd/yy"));

let task3 = createTask();
task3.setTitle(format(new Date(2024, 10, 8), "MM/dd/yy"));
task3.setDueDate("11/05/24");

let task4 = createTask();
task4.setTitle("sleep4");
task4.setDueDate(format(new Date(2024, 10, 8), "MM/dd/yy"));

let newProject = project();
newProject.setProjectName("lazyness");
newProject.addTask(task);
newProject.addTask(task1);
newProject.addTask(task2);
newProject.addTask(task3);
newProject.addTask(task4);

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
    let allProjects = projects()
    allProjects.addProjects(newProject);
    menu.addEventListener("click", (e) => {
        if (e.target.className === "today") {
            todaytasks(allProjects.getProjects()).forEach(task => console.log(task.info()));
            //console.log(allProjects.getProjects()[0].getTasks()[0].info());
            return;
        } if (e.target.className === "upcomming") {
            upcommingTasks(allProjects.getProjects()).forEach(task => console.log(task.info()));
            //console.log(allProjects.getProjects()[0].getTasks()[0].info());
            return;
        }
        if (e.target.className === "upcomming") {
            upcommingTasks(allProjects.getProjects()).forEach(task => console.log(task.info()));
            //console.log(allProjects.getProjects()[0].getTasks()[0].info());
            return;
        }  if (e.target.className === "logbook") {
            logbook(allProjects.getProjects()).forEach(task => console.log(task.info()));
            //console.log(allProjects.getProjects()[0].getTasks()[0].info());
            return;
        } 
    })

}
function todaytasks(projects) {
    let todayTasksList = [];
    let todayDate = format(Date(), "MM/dd/yy");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() === todayDate);
        console.log(tasksForToday);
        todayTasksList.push(...tasksForToday);
    });
    return Array.from(todayTasksList)
}

function upcommingTasks(projects) {
    let todayTasksList = [];
    let todayDate = format(Date(), "MM/dd/yy");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() > todayDate);
        console.log(tasksForToday);
        todayTasksList.push(...tasksForToday);
    });
    return Array.from(todayTasksList)
}

function logbook(projects) {
    let todayTasksList = [];
    let todayDate = format(Date(), "MM/dd/yy");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() < todayDate);
        console.log(tasksForToday);
        todayTasksList.push(...tasksForToday);function upcommingTasks(projects) {
            let todayTasksList = [];
            let todayDate = format(Date(), "MM/dd/yy");
            projects.forEach(project => {
                const tasksForToday = project.getTasks().filter(task => task.getDueDate() > todayDate);
                console.log(tasksForToday);
                todayTasksList.push(...tasksForToday);
            });
            return Array.from(todayTasksList)
        }
    });
    return Array.from(todayTasksList)
}
function eventController(inputDom, outputDom) {
    inputDom.addEvent
}

dispalyController();
