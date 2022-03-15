// ========================================================= //
//                 SCRIPT POUR PROJET JS                     //
//         GERBER KEVIN - BERNARD NGUYEN AS 2021-2022        //
// ========================================================= //


//  Fonction principale qui affiche toute les tâches

const listTasks = 'http://localhost:9090/api/taches/';

function displayTaskingsFromJson() {
    document.getElementById('task').value = "";
    fetch(listTasks)
    .then(function(response){
        return response.json();
    })
    .then(function(html){
        console.log("voici mon HTML ",html);
        console.log("taille de mon HTML ",html.length);
        document.getElementById("pending").innerHTML = "";
        document.getElementById("completed").innerHTML = "";
        
        let nbOfPendingTasks= 0;
        let nbOfFinishedTasks= 0;
    
        for(task of html){

            
            if (task.terminee == false) 
            {
                const areaTask = document.getElementById('pending');
                areaTask.innerHTML += 
                `<div class="task" id="zoneTache">
                    <span class="classTask" id="taskname">► ${task.description}</span> 
            
                    <div class="areabuttons">
                        <button onclick="taskFinished(${task.id})" id="cpt-button-done">Done</button>
                        <button onclick="deleteTask(${task.id})" id="cpt-button-del">Delete</button>
                        <button onclick="editTask('${task.description}', '${task.id}')" id="cpt-button-edit">Edit</button>
                    </div>
                </div>`;
                nbOfPendingTasks += 1;
            } 
            else
            {
            
                const areaTask = document.getElementById('completed');
                areaTask.innerHTML += `<div class="task" id="zoneTache">
                <span class="classTaskCompt" id="taskname">${task.description}</span> 
            
                <div class="areabuttons">
                    <button onclick="deleteTask(${task.id})"id="cpt-button-del">Delete</button>
                </div>
                </div>`;
                nbOfFinishedTasks += 1;
            }
        }

        if (nbOfPendingTasks>0)
        {
            document.getElementById("messageDansTacheEnCours").style.display = 'none';
        } else
        {
            document.getElementById("messageDansTacheEnCours").style.display = 'block';
        }

        if(nbOfFinishedTasks>0)
        {
            document.getElementById("messageDansTacheTerminee").style.display = 'none';
        } else 
        {
            document.getElementById("messageDansTacheTerminee").style.display = 'block';
        }
        })
        .catch(function(err){
            console.log(err);
        });
   
}


displayTaskingsFromJson();


// Fonction pour ajouter une tâche à la section 'En cours'
// saisi d'une nouvelle tâche

function addTask() 
{
    let myTask = document.getElementById('task').value;
    if (myTask === "") 
    {
        alert("vous na'avez pas saisi de tâche !")
    }
    else
    {

        let newTask = {
            description: myTask,
        };
  
        fetch(listTasks,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newTask)

        })
        .then(function(html)
        {
            return html.json();
        })    
        .then(function(html)
        {
            console.log(html);
            displayTaskingsFromJson();
        })    
        .catch(function(err)
        {
            console.log(err);
        });    
   
    }    
    
}    


// Fonction pour supprimer une tâche 
// avec un message de confirmation
function deleteTask(id) {

    if (confirm("Are you sure you want to delete this task ?"))
    {
        fetch(listTasks+id, 
        {
            method: 'DELETE',
            headers: 
            {
                'Content-Type': 'application/json',
            },
        }).then(function(response) 
        {
            console.log(response);
            displayTaskingsFromJson();
        });
    }

}


// fonction qui modifie la tâche à l'aide un prompt
function editTask(tacheDescr, tacheID) 
{
    let tacheEdit = prompt(`Modify the task : ${tacheDescr}`);

    let textetache = 
    {
        description: tacheEdit
    }
    fetch(listTasks+tacheID, 
        {
        method: 'PUT',
        headers: 
        {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(textetache)
    }).then(function(response) 
    {
        console.log(response);
        displayTaskingsFromJson();
    });
}


// Fonction pour ajouter une tâche à la section 'Terminé'
// tâche terminée...

function taskFinished(id)
{
    let newTask = 
    {
        id: `${id}`    
    }
    fetch(listTasks+id+"/terminer",
    {
        method: 'PUT',      
        headers: {
            'Content-Type': 'application/json',    
          },
        body: JSON.stringify(newTask)
    }).then(function(response)
    {   
        console.log(response);
        displayTaskingsFromJson();

    })
}
