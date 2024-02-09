let form = document.querySelector("#todoForm")   //storing form element
let tbody = document.querySelector("#tbody")    //storing table body element
let data=[];  //for storing the data of the To Do array 

//function to load the data from local storage on the UI
function loadData(){
    let storedArr = JSON.parse(localStorage.getItem("todos"))
    if(storedArr){  //To handle the user visiting for the first time
        data = storedArr
        showToDOData(data)
    }
}

//function to save the data in local storage
function saveData(){
    localStorage.setItem("todos", JSON.stringify(data))
}

//Adding event listener to collect the form data on the click of submit
form.addEventListener('submit', function(event){
    htmlData(event) 
    form.reset()   // Reseting form after collectiong data
})

// Function to read form data and store it in array
function htmlData(event){
    event.preventDefault()
    let todo = event.target[0].value  //For storing todo from form
    let prio = event.target[1].value    //for storing priority from the form
        let obj={
            id : generateRandon(),
            todoName : todo,
            priority : prio,
            status : false
        }
        data.push(obj)
        saveData()
        showToDOData(data)
}

//Function to  generate random number between 1 to 99 to store it in ID 
function generateRandon(){
    let flag=(Math.floor((Math.random())*100)).toString()
    console.log(`Generated ID is ${flag}`)
    return flag;
}

//Function to display the to do in table
function showToDOData(data){
    tbody.innerHTML= "";

    data.forEach(function (ele, i){
        let tr=document.createElement('tr')

        let td1=document.createElement('td')
        td1.innerHTML=i+1
        td1.style.width="40px"
        td1.style.textAlign="center"

        let td2=document.createElement('td')
        td2.innerHTML=ele.todoName

        let td3=document.createElement('td')
        td3.innerHTML=ele.priority
        td3.style.width="40px"
        td3.style.textAlign="center"
        prioColor(ele.priority, td3)
        

        let td4=document.createElement('td')
        td4.style.width="150px"
        td4.style.textAlign="center"
        let statusBtn = document.createElement("button")
        cssStatus(statusBtn,ele.status);
        statusBtn.addEventListener('click', function(){
            ele.status ? ele.status = false : ele.status = true
            cssStatus(statusBtn,ele.status);
        })
        td4.append(statusBtn)

        let td5=document.createElement('td')
        td5.style.width="100px"
        td5.style.textAlign="center"
        let delBtn = document.createElement("button")
        cssDelete(delBtn)

        delBtn.addEventListener('click', function() {
            //Anyone of the below function can be use to delete the data from the table
            handleDel(ele.id)
            //handleDelete(i,tr)
        })
        td5.append(delBtn)

        tr.append(td1 , td2 , td3, td4, td5 )
       tbody.append(tr)
    })
}

// Function to delete data using filter HOF
function handleDel(id){
    data = data.filter(function(ele){
        //We are filtering data which does not contain the data of specified ID and then replacing the array
        return ele.id !== id;
    })
    saveData()
    showToDOData(data)  //For updating the To Do table
}

//Function for deleting data using splice HOF
function handleDelete(i,tr){
    data.splice(i, 1);  //For deleting data from 'data' array
    tr.remove() //for removing row from HTML
    saveData()
}

//function for updating the CSS of status button
function cssStatus(statusBtn,status){
    statusBtn.style.padding= "10px 20px"
    statusBtn.style.border= "none"
    statusBtn.style.borderRadius="5px"
    statusBtn.style.cursor= "pointer"
    statusBtn.innerHTML = status ? "Task Completed" : "Task Incomplete"
    statusBtn.style.backgroundColor = status ? "#379124" : "#c43945";
}

//CSS of Delete Button
function cssDelete(delBtn){
    delBtn.innerHTML="Delete"
    delBtn.style.padding= "10px 20px"
    delBtn.style.backgroundColor= "#784491"
    delBtn.style.border= "none"
    delBtn.style.borderRadius="5px"
    delBtn.style.cursor= "pointer"
}

//Function to update text color of Priority based on color
function prioColor(prio, td3){
    if(prio == "High"){
        td3.style.color="red"
    }
    if(prio == "Medium"){
        td3.style.color="#c4bb3d"
    }
    if(prio == "Low"){
        td3.style.color="green"
    }
}
loadData()