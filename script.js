const listTasks = 'http://localhost:9090/api/taches';


let pendingTask = document.getElementById('pending');
let messageNoTask = document.createElement('span');
messageNoTask.innerHTML = "Aucunes tâches en cours";
pendingTask.appendChild(messageNoTask);

let completedTask = document.getElementById('completed');
let messageNoTaskComp = document.createElement('span');
messageNoTaskComp.innerHTML = "Aucunes tâches terminées";
completedTask.appendChild(messageNoTaskComp);



fetch(listTasks)
    .then(function(html){
        return html.json();
    })
    .then(function(html){
        // alert(html);
        console.log(html);
        
        for(task of html){

            messageNoTask.innerHTML = "";

            // console.log(html[key].description);
            const areaTask = document.getElementById('pending');
            areaTask.innerHTML += `<div class="task">
            <span class="classTask" id="taskname">${task.description}</span> 
        
            <div class="areabuttons">
                <button onclick="taskDone(this)" id="cpt-button-done">Done</button>
                <button id="cpt-button-del">Delete</button>
                <button id="cpt-button-edit">Edit</button>
            </div>
            </div>`;
        }

    })
    .catch(function(err){
        console.log(err);
    });


// fetch(listTasks)
//     .then(function(html){
//         return html.json();
//     })
//     .then(function(html){
//         // alert(html);
        
//         for(var key in html){

//             // console.log(html[key].description);
//             const areaTask = document.getElementById('pending');
//             areaTask.innerHTML += `<div class="task">
//             <span id="taskname">${html[key].description}</span> 
//             <img src="img/trash.png" alt="trash empty">
//             <img src="img/check.png" alt="check empty">
//             
//             </div>
//             `;
//         }

//     })
//     .catch(function(err){
//         console.log(err);
//     });




// function pushTask() {


//     const myTask = document.getElementById('task').value;
//     if (myTask === "") {
//         console.log("vous na'avez pas saisi de tâche !")
//     }
//     else {

//         const areaTask = document.getElementById('pending');
//         areaTask.innerHTML += `<div class="task">
//         <span id="taskname">${myTask}</span>  
    
//         <div class="areabuttons">
//             <button id="cpt-button-done">Done</button>
//             <button id="cpt-button-del">Delete</button>
//             <button id="cpt-button-edit">Edit</button>
//         </div>
//         </div>`;
    
//         const newTask = {
//             description: `${myTask}`,
//             date: " ",
//             terminee: false,
//         };
    
//         console.log(newTask);
    
//         const promise01 = fetch(listTasks, {
//             method: "POST",
//             body: JSON.stringify(newTask),
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         });
    
//         promise01.then(async (response) => {
//             try {
//                 console.log(response);
//                 const contenu = await response.json();
//                 console.log(contenu);
//                 document.getElementById('task').value = "";
//             } catch (e){
//                 console.log(e);
//             }
//         });
//     }
    

// }

// function taskDone() {

//     // console.log(myTask);
//     let taskName = document.getElementById('taskname').innerText;
//     console.log(taskName);

//     // let areaComptTask = document.getElementById('completed');
//     // let areaPendingTask = document.getElementById('pending');

    

//     // areaComptTask.innerHTML += `<div class="task">
//     // <span id="taskname">${taskName}</span> 

//     // <div class="areabuttons">

//     //     <button id="cpt-button-del">Delete</button>

//     // </div>
//     // </div>`;

// }

function taskDone(task) {
    let areaTaskCompleted = document.getElementById("completed");
    let taskName = document.getElementsByClassName('classTask');
    // console.log(taskName);
    console.log(task.parentElement.parentElement.children[0].innerText);

    // console.log(taskcomp);

    fetch(listTasks)
        .then(function(html){
            return html.json();
        })
        .then(function(html){
            // alert(html);
            // console.log(html);
            
            for(task of html){
                // messageNoTask.innerHTML = "";
                // if (taskName == task.description){
                //     console.log(task.description);

                //     // areaTaskCompleted.innerHTML += `<div class="task">
                //     // <span id="taskname">${task.description}</span> 
                
                //     // <div class="areabuttons">
                //     //     <button id="cpt-button-done">Done</button>
                //     //     <button id="cpt-button-del">Delete</button>
                //     //     <button id="cpt-button-edit">Edit</button>
                //     // </div>
                //     // </div>`;
                // }
                // console.log(task.description);
            }

        })
        .catch(function(err){
            console.log(err);
        });
}


function pushTask() {

    // on récupère la valeur de l'input, donc la chaine de caractères que l'on saisi: la tâche à ajouter
    const myTask = document.getElementById('task').value;
    // console.log(myTask);
    if (myTask === "") {
        console.log("vous n'avez rien saisi");
    } 
    else {
        // on retire le message 
        messageNoTask.innerHTML = "";

        // on récupère la zone des tâches en cours
        const areaTask = document.getElementById('pending');
    
        // on y ajoute la tâche qu'on a saisi avec ces éléments
        areaTask.innerHTML += `<div class="task">
        <span id="taskname">${myTask}</span> 
    
        <div class="areabuttons">
            <button onclick="taskDone(this)" id="cpt-button-done">Done</button>
            <button id="cpt-button-del">Delete</button>
            <button id="cpt-button-edit">Edit</button>
        </div>
        </div>`;

        // let madiv = document.createElement('div');
        // madiv.setAttribute('id', this.id);
        // madiv.setAttribute('class', 'task');
     
        // et on clear le champs de saisi 
        document.getElementById('task').value = "";
    }
    
}



