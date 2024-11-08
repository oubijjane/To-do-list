import "./style.css";
import {createTask,project, projects} from "./taskManager";

console.log("hello");
let task = createTask();
task.setTitle("sleep");
let newProject = project();
newProject.setProjectName("lazyness");
newProject.addTask(task);
let allProjects = projects()
allProjects.addProject(newProject);
console.log(allProjects.getProjects()[0].getTasks()[0].info());
