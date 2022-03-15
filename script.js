// ========================================================= //
//                 SCRIPT DU PROJET JavaScript               //
//         GERBER KEVIN - BERNARD NGUYEN AS 2021-2022        //
// ========================================================= //


//  Fonction principale qui affiche toute les tâches

const listTasks = 'http://localhost:9090/api/taches/';

function displayTaskingsFromJson() {
    document.getElementById('task').value = "";
    fetch(listTasks)
    .then(function(response)
    {
        return response.json();
    })
    .then(function(html)
    {
        console.log("there is my HTML page",html);
        console.log("HTML size",html.length);
        document.getElementById("pending").innerHTML = "";
        document.getElementById("completed").innerHTML = "";
        
        let nbOfPendingTasks = 0;
        let nbOfFinishedTasks = 0;
    
        for(task of html)
        {
            if (task.terminee == false) 
            {
                const areaTask = document.getElementById('pending');
                areaTask.innerHTML += 
                `<div class="task" id="zoneTache" (onmouseover() && onkeypress) = "if(event.keyCode == 13) delete()">
                    <span class="classTask" id="taskname"> ► ${task.description}</span> 
            
                    <div class="areabuttons">
                        <button onclick="taskCompleted(${task.id})" id="cpt-button-done">Done</button>
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
            document.getElementById("messageInPendingTask").style.display = 'none';
            document.getElementById("pending").style.display = 'block';
        } else
        {
            document.getElementById("messageInPendingTask").style.display = 'block';
            document.getElementById("pending").style.display = 'none';
        }
        
        if (nbOfFinishedTasks>0)
        {
            document.getElementById("messageInDoneTask").style.display = 'none';
            document.getElementById("completed").style.display = 'block';
        } else 
        {
            document.getElementById("messageInDoneTask").style.display = 'block';
            document.getElementById("completed").style.display = 'none';
        }
        })
        .catch(function(err)
        {
            console.log(err);
        });
   
}

displayTaskingsFromJson();

// Fonction pour ajouter une tâche à la section 'Pending'
// Saisie d'une nouvelle tâche

function addTask() 
{
    let myTask = document.getElementById('task').value;
    if (myTask === "") 
    {
        alert("Task is empty !")
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
};

// Fonction pour supprimer une tâche (avec un message de confirmation)

function deleteTask(id)
{
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
};

// fonction qui modifie la tâche à l'aide de la méthode prompt

function editTask(tacheDescr, tacheID) 
{
    let tacheEdit = prompt(`Modify the task : ${tacheDescr}`);

    let textetache = 
    {
        description: tacheEdit
    };

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
};

// Fonction pour ajouter une tâche à la section 'Completed'
// tâche terminée

function taskCompleted(id)
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
};
