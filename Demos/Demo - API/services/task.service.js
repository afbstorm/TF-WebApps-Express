// TODO : Remplacer ça par des vraies données en DB
const tasks = [
    { id : 1, name : "Faire la vaisselle", description : "Y'a beaucoup là", creator : "Aude", slave : "Aurélien", done : false},
    { id : 2, name : "Me remplacer jeudi 14", description : "J'ai une feature à rajouter à mon projet", creator : "Aurélien", slave : "Aude", done : true},
]

const taskService = {
    getAll : () => {
        return tasks;
    },

    getById : (id) => {
        // for(const task of tasks) {
        //     if(task.id === id){
        //         return task
        //     }
        // }
        // return undefined;
        return tasks.find(task => task.id === id);
    },

    create : ( taskToAdd ) => {
        //création de l'id
        //tasks.map(task => task.id) // Transforme notre tableau de task en tableau avec juste les id // [1, 2]
        //...tasks.map(task => task.id) // 1,2 //les id //destructuring
        taskToAdd.id = Math.max( ...tasks.map(task => task.id) ) + 1;

        tasks.push(taskToAdd);
        return taskToAdd;

    },

    // id = task to update
    // key = key de l'object
    // value = value de la key
    update : (id, data) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        // Modification directe de l'object existant
        Object.assign(taskToUpdate, data);

        return taskToUpdate
    },

    delete : (id) => {
        return tasks.filter(task => task.id !== id);
    },

    getTasksByCompletionStatus: (status) => {
        // Pour transformer un string en booléen on compare le string à 'true'.
        // Si le string === 'false' alors status === 'true' vaudra false. Si le string === 'true' alors ça vaudra 'true'
        const statusBool = status === 'true'
        return tasks.filter(task => task.done === statusBool);
    },

    getTasksByCreatorName: (creator) => {
        return tasks.filter(task => task.creator === creator)
    },

    sortBy: (order, data) => {

        //  Trie les tâches par data (type => creator, completion, etc...)
        tasks.sort((a, b) => {
            if (order === 'asc') {
                // Il retourne 1 ou -1 pour déterminer l'ordre de tri.
                return a.data > b.data ? 1 : -1;
            } else {
                return a.data < b.data ? 1 : -1;
            }
        });
        return tasks;
    },



}

module.exports = taskService;
