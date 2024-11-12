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
secondProject.setProjectName("fitness");

newProject.getTasks().forEach(task => console.log(task.info()));
console.log(Date());



function dispalyController() {
    const menu = document.querySelector(".sideBarMenu");
    const content = document.querySelector(".content");
    const dialog = document.querySelector("dialog");
    const dialog2 = document.querySelector(".dialog2");

    let allProjects = projects();
    allProjects.addProjects(newProject);
    allProjects.addProjects(secondProject);
    menu.addEventListener("click", (e) => {
        if (e.target.className === "today") {
            displayTasks(content, getTodaytasks(allProjects.getProjects()));
            return;
        }
        if (e.target.className === "upcomming") {
            displayTasks(content, getUpcomingTasks(allProjects.getProjects()));
            return;
        } if (e.target.className === "logbook") {
            displayTasks(content, getDueTasks(allProjects.getProjects()));
            return;
        } if (e.target.className === "project") {
            displayTasks(content, getprojectTasks(e.target.textContent, allProjects));
        }

        if (e.target.className === "open") {
            const dueDate = document.querySelector("#dueDate");
            dueDate.value = format(Date(), "yyyy-MM-dd");
            selectProject(allProjects);
            dialog.showModal();
        } else if (e.target.className.includes("close")) {
            dialog.close();
        } else if (e.target.className.includes("addTask")) {
            e.preventDefault();
            let project = document.querySelector("#project").value;
            console.log(project);
            addToPreject(allProjects, project, addNewTask());
        } if (e.target.className === "openProject") {
            console.log("hello");
            dialog2.showModal();
        } else if (e.target.className.includes("close")) {
            dialog2.close();
        } else if (e.target.className.includes("addProject")) {
            e.preventDefault();
            let projectName = document.querySelector("#projectName").value;
            console.log(projectName);
            addNewProject(projectName, allProjects);
            displayProjects(allProjects);
        }
    });

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
    return Array.from(taskList);
}
function eventController(inputDom, outputDom) {
    inputDom.addEvent
}

function displayTasks(content, tasks) {
    content.replaceChildren();
    tasks.forEach(task => {
        const div = document.createElement("div");
        const taskTitle = document.createElement("p");
        const taskDate = document.createElement("p");
        const taskDescription = document.createElement("p");
        const taskPriority = document.createElement("p");
        const div2 = document.createElement("div");
        const edit = document.createElement("button");
        const remove = document.createElement("button");

        div2.className = "buttons";

        edit.className = "edit";
        edit.textContent = "edit";

        remove.className = "remove";
        remove.textContent = "remove";

        taskTitle.textContent = "task: " + task.getTitle();
        taskDate.textContent = "due date:\n" + task.getDueDate();
        taskDescription.textContent ="description:\n" + task.getDescription();
        taskPriority.textContent = "priority: " + task.getPriority();

        div.className = "card";
        div.appendChild(taskTitle);
        div.appendChild(taskDate);
        div.appendChild(taskDescription);
        div.appendChild(taskPriority);
        div2.append(remove, edit);
        div.appendChild(div2);
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

function selectProject(projects) {
    const select = document.querySelector("#project");
    select.replaceChildren();
    projects.getProjects().forEach(project => {
        const opt = document.createElement("option");
        opt.textContent = project.getProjectName();
        opt.setAttribute("value", project.getProjectName());
        select.appendChild(opt);
    })
}

function addNewProject(projectName, projects) {
    let myProject = project();
    myProject.setProjectName(projectName);

    projects.addProjects(myProject);
}
function displayProjects(projects) {
    const div = document.querySelector(".projects");
    div.replaceChildren();
    projects.getProjects().forEach((project) => {
        const btn = document.createElement("button");
        btn.textContent = project.getProjectName();
        btn.className = "project";
        div.appendChild(btn);
    })
}
function getprojectTasks(projectName, projects) {
    let taskList = [];
    projects.getProjects().forEach(project => {
        if (project.getProjectName() === projectName) {
            project.getTasks().forEach(task => taskList.push(task));
        }
    });
    return Array.from(taskList);
}
dispalyController();
