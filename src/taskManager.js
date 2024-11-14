export  {createTask,project,projects};

const IDGenerator = (function () {
    let taskIdCounter = 0;
    const setIdCount = (startingId) => taskIdCounter = startingId ;

    return {
        generateTaskId: () => ++taskIdCounter,setIdCount
    };
})();
function createTask() {
    let title = "";
    let description = "";
    let dueDate = "";
    let priority = "";
    let id = "task" + IDGenerator.generateTaskId();

    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    const getDueDate = () => dueDate;
    const setDueDate = (newDueDate) => dueDate = newDueDate;

    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;

    const getId =() => id;
    const setId = (newId) => id = newId;

    const info = () => `Title: ${title}, Description: ${description}, Due Date: ${dueDate}, Priority: ${priority}, id ${id}`;

    return { getTitle, setTitle, getDescription, setDescription, getDueDate, setDueDate, getPriority, setPriority,getId,setId, info};
}


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






