import "./style.css";
import { createTask, project, projects } from "./taskManager";
import { compareAsc, format } from "date-fns";
import iconDelete from "./icons8-delete.svg"

const elementId = (function () {
    let id = 0;

    const getId = () => id;
    const setId = (newId) => id = newId;

    return { getId, setId };
})();


function dispalyController() {
    sessionStorage.setItem("reloading", "true");
    const menu = document.querySelector(".sideBarMenu");
    const content = document.querySelector(".content");
    const dialog = document.querySelector("dialog");
    const dialog2 = document.querySelector(".dialog2");
    const dialog3 = document.querySelector(".editTask");

    let newProject = project();
    newProject.setProjectName("work");

    let secondProject = project();
    secondProject.setProjectName("fitness");

    let allProjects = projects();
    const emptyProject = project();
    allProjects.addProjects(emptyProject);
    emptyProject.addTask(task2);
    secondProject.setProjectName("fitness");

    secondProject.addTask(task1);



    allProjects.addProjects(secondProject);
    allProjects.addProjects(newProject);

    if (localStorage.getItem("products")) {
        allProjects = dataToProjects(JSON.parse(localStorage.getItem("products")));
        console.log("getting data from storage");
    }
    displayProjects(allProjects);
    menu.addEventListener("click", (e) => {
        if (e.target.className === "today") {
            displayTasks(content, getTodaytasks(allProjects.getProjects()));
            return;
        }
        if (e.target.className === "upcomming") {
            displayTasks(content, getUpcomingTasks(allProjects.getProjects()));
            return;
        } if (e.target.className === "logbook") {
            displayTasks(content, getAllTasks(allProjects.getProjects()));
            return;
        } if (e.target.className === "project") {
            displayTasks(content, getprojectTasks(e.target.textContent, allProjects));
            console.log("hello");
        } if (e.target.closest('.deleteProject')) {
            console.log("hello");
            let id = e.target.parentElement.parentElement.id;
            deleteProject(allProjects, id);
            localStorage.setItem("products", JSON.stringify(projectsToData(allProjects)));
            displayProjects(allProjects);
        }
        if (e.target.className === "open") {
            const dueDate = document.querySelector("#dueDate");
            dueDate.value = format(Date(), "yyyy-MM-dd");
            selectProject(allProjects);
            dialog.showModal();
        } else if (e.target.className.includes("close")) {
            cleanInputs();
            dialog.close();
        } else if (e.target.className.includes("addTask")) {
            e.preventDefault();
            if (!isValid()) {
                let project = document.querySelector("#project").value;
                addToPreject(allProjects, project, addNewTask());
                localStorage.setItem("products", JSON.stringify(projectsToData(allProjects)));
                cleanInputs();
            } else {
                alert('Please fill in the task and due date field.');
            }
        } else if (e.target.className.includes("editTask")) {
            e.preventDefault();
            let task = editTask(allProjects.getProjects(), elementId.getId());
            console.log("in the event " + task.info());
            updateTask(elementId.getId(), task);
            localStorage.setItem("products", JSON.stringify(projectsToData(allProjects)));

        } if (e.target.className === "openProject") {
            dialog2.showModal();
        } else if (e.target.className.includes("close")) {
            dialog2.close();
        } else if (e.target.className.includes("addProject")) {
            e.preventDefault();
            if (!isvalidForProject()) {
                let projectName = document.querySelector("#projectName").value;
                addNewProject(projectName, allProjects);
                localStorage.setItem("products", JSON.stringify(projectsToData(allProjects)));
                cleanInputs();
                displayProjects(allProjects);
            } else {
                alert('Please fill in the field.');
            }
        }
    });
    content.addEventListener("click", (e) => {
        if (e.target.className.includes("remove")) {
            let id = e.target.parentElement.parentElement.id;
            removeTaskFromList(allProjects.getProjects(), id);
            removeTaskFromDisplay(e.target.parentElement.parentElement);
            localStorage.setItem("products", JSON.stringify(projectsToData(allProjects)));
        } else if (e.target.className.includes("edit")) {
            elementId.setId(e.target.parentElement.parentElement.id);
            selectProject(allProjects);
            viewTask(allProjects.getProjects(), elementId.getId(), dialog);
        } else if (e.target.className.includes("edit")) {
            let id = e.target.parentElement.parentElement.id;
            viewTask(allProjects.getProjects(), id, dialog3);
        }
    })

}
function getTodaytasks(projects) {
    let taskList = [];
    let todayDate = format(Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() === todayDate);
        taskList.push(...tasksForToday);
    });
    return Array.from(taskList)
}

function getUpcomingTasks(projects) {
    let taskList = [];
    let todayDate = format(Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() > todayDate);
        taskList.push(...tasksForToday);
    });
    return Array.from(taskList)
}

function getDueTasks(projects) {
    let taskList = [];
    let todayDate = format(Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        const tasksForToday = project.getTasks().filter(task => task.getDueDate() < todayDate);
        taskList.push(...tasksForToday);
    });
    return Array.from(taskList);
}
function getAllTasks(projects) {
    let taskList = [];
    projects.forEach(project => {
        const tasksForToday = project.getTasks();
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
        //const taskDescription = document.createElement("p");
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
        // taskDescription.textContent ="description:\n" + task.getDescription();
        taskPriority.textContent = "priority: " + task.getPriority();

        div.className = "card";
        div.id = task.getId();
        div.appendChild(taskTitle);
        div.appendChild(taskDate);
        // div.appendChild(taskDescription);
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
function cleanInputs() {
    const taskForm = document.querySelector(".taskForm");
    taskForm.reset();
    const projectForm = document.querySelector(".projectForm");
    projectForm.reset();
}

function removeTaskFromList(projects, id) {

    projects.forEach(project => {
        let i = 0;
        project.getTasks().forEach(task => {
            if (task.getId() == id) {
                project.removeTask(i);
            }
            i++;
        })
    });
}

function removeTaskFromDisplay(elemnt) {
    elemnt.remove();
}
function viewTask(projects, id, dialog) {
    const title = document.querySelector("#title");
    const dueDate = document.querySelector("#dueDate");
    const description = document.querySelector("#description");
    const priority = document.querySelector("#priority");
    const btn = document.querySelector(".addTask");
    if (!(btn === null)) {
        btn.className = "editTask";
    }
    projects.forEach(project => {
        let i = 0;
        project.getTasks().forEach(task => {
            if (task.getId() == id) {
                title.value = task.getTitle();
                dueDate.value = task.getDueDate();
                priority.value = task.getPriority();
                description.value = project.getProjectName();
                dialog.showModal();
            }
            i++;
        })
    });

}
function isValid() {
    const title = document.querySelector("#title");
    const dueDate = document.querySelector("#dueDate");
    let result = !title.value.trim() || !dueDate.value.trim();
    return result;
}
function editTask(projects, id) {
    const title = document.querySelector("#title");
    const dueDate = document.querySelector("#dueDate");
    const description = document.querySelector("#description");
    const priority = document.querySelector("#priority");
    const projectName = document.querySelector("#project");
    let editedTask = "";
    projects.forEach(project => {
        let i = 0;
        project.getTasks().forEach(task => {
            if (task.getId() == id) {
                task.setTitle(title.value);
                task.setDueDate(dueDate.value);
                task.setDescription(description.value);
                task.setPriority(priority.value);
                editedTask = task;
                console.log(i);
                project.removeTask(i);
                console.log(editedTask.info());
            }
            i++;
        })
    });
    projects.forEach(project => {
        if (project.getProjectName() === projectName.value) {
            project.addTask(editedTask);
        }
    })

    return editedTask;
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
    const btn = document.querySelector(".editTask");
    if (!(btn === null)) {
        btn.className = "addTask";
    }
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
    let i = 0;
    projects.getProjects().forEach((project) => {
        if (i > 0) {
            const div2 = document.createElement("div");
            const icon = document.createElement("img");
            icon.className = "icon";

            icon.setAttribute("src", iconDelete);
            div2.id = i;
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "deleteProject";
            const btn = document.createElement("button");
            btn.textContent = project.getProjectName();
            btn.className = "project";

            deleteBtn.appendChild(icon);
            div2.appendChild(btn);
            div2.appendChild(deleteBtn);
            div.appendChild(div2);
        }
        i++;
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
function updateTask(id, task) {
    const div = document.querySelector("#" + id);
    div.replaceChildren();
    const taskTitle = document.createElement("p");
    const taskDate = document.createElement("p");
    //const taskDescription = document.createElement("p");
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
    // taskDescription.textContent ="description:\n" + task.getDescription();
    taskPriority.textContent = "priority: " + task.getPriority();

    div.className = "card";
    div.id = task.getId();
    div.appendChild(taskTitle);
    div.appendChild(taskDate);
    // div.appendChild(taskDescription);
    div.appendChild(taskPriority);
    div2.append(remove, edit);
    div.appendChild(div2);
}

function deleteProject(projects, id) {
    let deletedProject = projects.getProjects()[id];
    console.log(deletedProject)
    projects.removeProjects(id);
    deletedProject.getTasks().forEach(task => projects.getProjects()[0].addTask(task));

}
function isvalidForProject() {
    let input = document.querySelector("#projectName");
    let result = !input.value.trim();

    return result;
}

function taskObjetToData(task) {
    let title = task.getTitle();
    let description = task.getDescription();
    let dueDate = task.getDueDate();
    let priority = task.getPriority();
    let id = task.getId();
    return { title, description, dueDate, priority, id }
}
function getTask(task) {
    let finalTask = createTask();
    finalTask.setTitle(task.title);
    finalTask.setDueDate(task.dueDate);
    finalTask.setDescription(task.description);
    finalTask.setPriority(task.priority);

    return finalTask;
}
function projectObjetToData(project) {
    let name = project.getProjectName();
    let tasks = project.getTasks().map(task => taskObjetToData(task));
    return { name, tasks };
}
function getProject(fromProject) {
    let finalProject = project();
    finalProject.setProjectName(fromProject.name);
    console.log("test  " + typeof fromProject.tasks);
    fromProject.tasks.forEach(task => finalProject.addTask(getTask(task)));

    return finalProject;
}

function projectsToData(projects) {
    let projectsList = projects.getProjects().map(project => projectObjetToData(project));

    return projectsList;
}

function dataToProjects(getProjects) {
    let projectsList = projects();
    getProjects.forEach(project => {
        console.log(project);
        projectsList.addProjects(getProject(project));
    });

    return projectsList;
}

dispalyController();


