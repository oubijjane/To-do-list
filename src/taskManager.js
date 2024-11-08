export  {createTask,project,projects};
function createTask() {
    let title = "";
    let description = "";
    let dueDate = "";
    let priority = "";

    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    const getDueDate = () => dueDate;
    const setDueDate = (newDueDate) => dueDate = newDueDate;

    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;

    const info = () => `Title: ${title}, Description: ${description}, Due Date: ${dueDate}, Priority: ${priority}`;

    return { getTitle, setTitle, getDescription, setDescription, getDueDate, setDueDate, getPriority, setPriority,info};
}

let task = createTask();
task.setTitle("workout");
task.setDescription("working out my chest today");
task.setDueDate("today");
task.setPriority("high");

function project() {
    let projectName = "";
    let tasks = [];

    const getProjectName = () => projectName;
    const setProjectName = (newProjectName) => projectName = newProjectName;

    const addTask = (task) => tasks.push(task);
    const getTasks = () => Array.from(tasks);
    const removeTask = (taskIndex) => tasks.splice(taskIndex, 1);

    return {getProjectName, setProjectName, getTasks, addTask, removeTask};
}

function projects() {
    let projects = [];

    const addProjects = (project) => projects.push(project);
    const getProjects = () => Array.from(projects);
    const removeProjects = (projectIndex) => projects.splice(projectIndex, 1);

    return {addProjects, getProjects, removeProjects};
}





