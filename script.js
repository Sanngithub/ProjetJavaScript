const listTasks = 'http://localhost:9090/api/taches/';
// SCRIPT POUR PROJET JS

// Fonction principale qui affiche toute les tâches
function displayTaskingsFromJson() {
    document.getElementById('task').value = "";
    fetch(listTasks)
    .then(function(response){
        return response.json();
    })
    .then(function(html){
        // alert(html);
        console.log("voici mon HTML ",html);
        console.log("taille de mon HTML ",html.length);
        document.getElementById("pending").innerHTML = "";
        document.getElementById("completed").innerHTML = "";
        
        let nbreTacheEnCours= 0;
        let nbreTacheTerminee= 0;
    
        for(task of html){

            
            if (task.terminee == false) 
            {
                const areaTask = document.getElementById('pending');
                areaTask.innerHTML += 
                `<div class="task" id="zoneTache">
                    <span class="classTask" id="taskname">► ${task.description}</span> 
            
                    <div class="areabuttons">
                        <button onclick="tacheTermine(${task.id})" id="cpt-button-done">Done</button>
                        <button onclick="supprimerTache(${task.id})" id="cpt-button-del">Delete</button>
                        <button onclick="modifierTache('${task.description}', '${task.id}')" id="cpt-button-edit">Edit</button>
                    </div>
                </div>`;
                nbreTacheEnCours += 1;
            } 
            else
            {
            
                const areaTask = document.getElementById('completed');
                areaTask.innerHTML += `<div class="task" id="zoneTache">
                <span class="classTaskCompt" id="taskname">${task.description}</span> 
            
                <div class="areabuttons">
                    <button onclick="supprimerTache(${task.id})"id="cpt-button-del">Delete</button>
                </div>
                </div>`;
                nbreTacheTerminee += 1;
            }
        }

        if (nbreTacheEnCours>0)
        {
            document.getElementById("messageDansTacheEnCours").style.display = 'none';
        } else
        {
            document.getElementById("messageDansTacheEnCours").style.display = 'block';
        }

        if(nbreTacheTerminee>0)
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
function ajouterTache() 
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
function supprimerTache(id) {

    if (confirm("Voulez-vous suppimer cette tâche ?"))
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
function modifierTache(tacheDescr, tacheID) 
{
    let tacheEdit = prompt(`Modifier votre tâche : ${tacheDescr}`);

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
function tacheTermine(id)
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
