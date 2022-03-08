const listTasks = 'http://localhost:9090/api/taches';


let pendingTask = document.getElementById('pending');
let messageNoTask = document.createElement('span');
messageNoTask.innerHTML = "Aucunes tâches en cours";
pendingTask.appendChild(messageNoTask);

let completedTask = document.getElementById('completed');
let messageNoTaskComp = document.createElement('span');
messageNoTaskComp.innerHTML = "Aucunes tâches terminées";
completedTask.appendChild(messageNoTaskComp);


// par défaut, la méthode utilisé si on ne le mentionne pas, est 'GET' pour le fetch
// on appelle la fonction à chaque fois qu'on refresh la page
// ce qui nous permet d'afficher les tâches au fur et à mesure
// cela nous évite de répeter la création du bloc
function displayTaskingsFromJson() {

    fetch(listTasks)
        .then(function(html){
            return html.json();
        })
        .then(function(html){
            // alert(html);
            console.log(html);
            
            // for(task of html){
    
            //     messageNoTask.innerHTML = "";
    
            //     // console.log(html[key].description);
            //     const areaTask = document.getElementById('pending');
            //     areaTask.innerHTML += `<div class="task">
            //     <span class="classTask" id="taskname">${task.description}</span> 
            
            //     <div class="areabuttons">
            //         <button onclick="taskDone(${task.id})" id="cpt-button-done">Done</button>
            //         <button onclick="delTask(${task.id})"id="cpt-button-del">Delete</button>
            //         <button id="cpt-button-edit">Edit</button>
            //     </div>
            //     </div>`;
            // }
    
        })
        .catch(function(err){
            console.log(err);
        });
   
}

displayTaskingsFromJson();





function pushTask() {

    let myTask = document.getElementById('task').value;
    if (myTask === "") {
        console.log("vous na'avez pas saisi de tâche !")
    }
    else {

        // on créé une variable qui récupère la nouvelle tâche 
        // ici, seulement la description
        // les autres clefs sont générés automatiquements
        const newTask = {
            description: `${myTask}`,
        };
    
        console.log(newTask);
        fetch(listTasks,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            // cette partir body, permet d'ajouter dans le Json la nouvelle tâche
            // sous forme d'une chaine de caractère à la clef 'description'
            body: JSON.stringify(newTask)

        })
        .then(function(html){
            return html.json();
        })
        .then(function(html){
            // alert(html);
            console.log(html);
            
         

            messageNoTask.innerHTML = "";

            // console.log(html[key].description);
            const areaTask = document.getElementById('pending');
            areaTask.innerHTML += `<div class="task">
            <span class="classTask" id="taskname">${myTask}</span> 
        
            <div class="areabuttons">
                <button onclick="taskDone(${task.id})" id="cpt-button-done">Done</button>
                <button onclick="delTask(${task.id})"id="cpt-button-del">Delete</button>
                <button id="cpt-button-edit">Edit</button>
            </div>
            </div>`;
            myTask = "";
        
    
        })
        .catch(function(err){
            console.log(err);
        });
   
    }
    // myTask = "";
    // window.location.reload();
    
}
    
function delTask(id) {

    console.log(id);
    fetch(`http://localhost:9090/api/taches/${id}`, {
        method: 'DELETE',  
    });
    window.location.reload();

}



// function taskDone(myTask) {

//     console.log(myTask);
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

// function taskDone(id) {
//     let areaTaskCompleted = document.getElementById("completed");
//     // let taskName = document.getElementById('taskname').innerText;
//     // console.log(taskName);
//     // console.log(task.parentElement.parentElement.children[0].innerText);
//     console.log(id);
//     // console.log(taskcomp);

//     fetch(listTasks)
//         .then(function(html){
//             return html.json();
//         })
//         .then(function(html){
//             // alert(html);
//             // console.log(html);
            
//             for(task of html){
//                 messageNoTask.innerHTML = "";
//                 if (id == task.id){
//                     console.log("description:",task.description);

//                     areaTaskCompleted.innerHTML += `<div class="task">
//                     <span id="taskname">${task.description}</span> 
                
//                     <div class="areabuttons">
                       
//                     <button onclick="delTask(${task.id})"id="cpt-button-del">Delete</button>
                        
//                     </div>
//                     </div>`;
//                 }
//                 // console.log(task.description);
//             }

//         })
//         .catch(function(err){
//             console.log(err);
//         });
// }


// function pushTask() {

//     // on récupère la valeur de l'input, donc la chaine de caractères que l'on saisi: la tâche à ajouter
//     const myTask = document.getElementById('task').value;
//     // console.log(myTask);
//     if (myTask === "") {
//         console.log("vous n'avez rien saisi");
//     } 
//     else {
//         // on retire le message 
//         messageNoTask.innerHTML = "";

//         // on récupère la zone des tâches en cours
//         const areaTask = document.getElementById('pending');
    
//         // on y ajoute la tâche qu'on a saisi avec ces éléments
//         areaTask.innerHTML += `<div class="task">
//         <span id="taskname">${myTask}</span> 
    
//         <div class="areabuttons">
//             <button onclick="taskDone(this)" id="cpt-button-done">Done</button>
//             <button id="cpt-button-del">Delete</button>
//             <button id="cpt-button-edit">Edit</button>
//         </div>
//         </div>`;

//         // let madiv = document.createElement('div');
//         // madiv.setAttribute('id', this.id);
//         // madiv.setAttribute('class', 'task');
     
//         // et on clear le champs de saisi 
//         document.getElementById('task').value = "";
//     }
    
// }


