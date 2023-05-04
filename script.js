// read from localStorage
const readFromStorage = (key , dataType = "")=> {
    let data;
    const myData = JSON.parse(localStorage.getItem(key));
    if(dataType == "string") return myData;
    try{
        data = JSON.parse(localStorage.getItem(key));
        if(!Array.isArray(data)) throw new Error("this is not array"); // for not array return
    }
    catch{ // for any thing else
        data = [];
    }
    return data;
}


// write to Storage

const writeToStorage = (key , data)=> {
    let returnData;
    try{
        returnData = localStorage.setItem(key , JSON.stringify(data));
    }
    catch{
        returnData = localStorage.setItem(key , []);
    }
    return returnData;
}



//Add (create)
const addForm = document.querySelector("#addForm");
if(addForm){
    addForm.addEventListener('submit' , (e)=>{
        e.preventDefault();
        const tasks = readFromStorage("tasks");
        let task = {
            id: Date.now(),
            status: false,
            taskTitle : addForm.elements["taskTitle"].value,
            taskContent : addForm.elements["taskContent"].value,
        }
        tasks.push(task);
        writeToStorage("tasks" , tasks);
        console.log(readFromStorage("tasks"))
        addForm.reset();
        window.location.href="index.html"
    })
}
const contentWrap = document.querySelector("#contentWrap");
const createMyOwnElement = (parent , tag , text , classes)=>{
    let element = document.createElement(tag);
    parent.appendChild(element);
    if(text) element.textContent = text;
    if(classes) element.classList = classes;
    return element;
}

    
const showAll = (allData)=>{
    contentWrap.innerHTML = ""
    allData.forEach((task , i)=>{
        let tr = createMyOwnElement(contentWrap , "tr" , null , null);
        let td = createMyOwnElement(tr , "td" , task.id , null);
        td = createMyOwnElement(tr , "td" , task.taskTitle , null);
        td = createMyOwnElement(tr , "td" , null , null);
        let showBtn = createMyOwnElement(td , "button" , "show"  , "btn btn-primary mx-2");
        showBtn.addEventListener('click' , (e)=>ShowSingle(i))

        let editBtn = createMyOwnElement(td , "button" , "edit"  , "btn btn-warning mx-2");
        editBtn.addEventListener('click' , (e)=>editFun(i))

        let DelBtn = createMyOwnElement(td , "button" , "delete"  , "btn btn-danger mx-2");
        DelBtn.addEventListener('click' ,  (e)=> DelFun(i));

    })
   }
let editForm = document.querySelector("#editForm");
let SingleData = document.querySelector("#SingleData")
if(contentWrap){
    const allData = readFromStorage("tasks");
    showAll(allData);
}
// delete
function DelFun(i){
    const allData = readFromStorage("tasks");
    allData.splice(i , 1);
    writeToStorage("tasks" , allData);
    console.log(allData);
    showAll(allData)
}

function ShowSingle(i){
    localStorage.setItem('single' , i);
    window.location.href = "Single.html";
}
if(SingleData){
        const index = readFromStorage('single' , 'string');
        const tasks = readFromStorage("tasks");
        try{
            const user = tasks[index];
            createMyOwnElement(SingleData , "h4" , user.id , null);
            createMyOwnElement(SingleData , "h4" , user.taskTitle , null);
            createMyOwnElement(SingleData , "h4" , user.taskContent , null);
        }
        catch(e){
            createMyOwnElement(SingleData , "h4" , "no data" , null);
    }
}
function editFun(i){
    localStorage.setItem("edit" , i);
    window.location.href = "edit.html"
}
if(editForm){
    const index = readFromStorage('edit' , 'string');
    const tasks = readFromStorage("tasks");
        const user = tasks[index];

        editForm.elements.taskTitle.value = user.taskTitle;
        editForm.elements.taskContent.value = user.taskContent;

        editForm.addEventListener('submit' , function(e){
            e.preventDefault();
            user.taskTitle = editForm.elements.taskTitle.value;
            user.taskContent = editForm.elements.taskContent.value;

            writeToStorage("tasks" , tasks);
            
            window.location.href = "index.html";
        })
    
    }


