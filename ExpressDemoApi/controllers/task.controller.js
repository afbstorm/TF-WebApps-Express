const { Request, Response } = require("express");

const taskService = require("../services/task.service");

const taskController = {
        /**
         * GetAll
         * @param {Request} req
         * @param {Response} res
         */
        getAll : (req, res) => {

            const taskList = taskService.getAll();
            return res.status(200).json(taskList);

            return res.sendStatus(501); //En envoie juste un statusCode sans donnée
            //ou
            return res.status().json(); //En envoie un status, puis ensuite, un json
        },

        /**
         * GetById
         * @param {Request} req
         * @param {Response} res
         */
        getById : (req, res) => {
            const id = parseInt(req.params.id);
            //const id = +req.params.id;

            const task = taskService.getById(id);
            if(task){
                return res.status(200).json(task);
            }
            return res.status(404).json({ code : 404, message : `La tâche avec l'id ${id} n'existe pas`});

            return res.sendStatus(501);
        },

        /**
         * Create
         * @param {Request} req
         * @param {Response} res
         */
        create : (req, res) => {
            const taskToAdd = req.body;

            // Fausse verif
            // TODO : Remplacer par un middleware (yup)
            if(!taskToAdd.name || !taskToAdd.description) {
                return res.status(400).json({ code : 400, message : "Le champs name et le champs description sont requis"});
            }

            const task = taskService.create(taskToAdd);
            //pour respecter le principe rest
            //on envoie la requête à faire pour accéder à la ressources, permettant ainsi de la stocker pour la faire plus tard
            res.location('/api/task/'+task.id);
            //On renvoie l'objte créé
            return res.status(201).json(task);

            return res.sendStatus(501);
        },

        /**
         * Update
         * @param {Request} req
         * @param {Response} res
         */
        update : (req, res) => {
            const id = parseInt(req.params.id);
            const { name, description, creator, slave, done } = req.body;

            const updatedTask = taskService.update(id, { name, description, creator, slave, done });
            if (updatedTask) {
                res.location('/api/task/'+updatedTask.id);
                return res.status(200).json(updatedTask);
            }
            return res.status(404).json({ code: 404, message: `La tâche avec l'id ${id} n'existe pas` });
        },
        /**
         * Delete
         * @param {Request} req
         * @param {Response} res
         */
        delete : (req, res) => {
            const id = parseInt(req.params.id);
            const deletedTask = taskService.delete(id);
            if (deletedTask) {
                return res.status(200).json({ code: 200, message: `La tâche avec l'id ${id} a été supprimée` });
            }
            return res.status(404).json({ code: 404, message: `La tâche avec l'id ${id} n'existe pas` });
        },

        // Plus avancé : Si on veut filtrer les résultats
        // Par status de complétion
        getTasksByCompletionStatus: (req, res) => {
            const status = req.params.status;
            const filteredTasks = taskService.getTasksByCompletionStatus(status);
            if (filteredTasks) {
                res.location('/api/task')
                return res.status(200).json(filteredTasks)
            }
            return res.status(404).json({code: 404, message: `Il n'y a pas de tâches avec cet état`})
        },

    getTasksByCreatorName: (req, res) => {
            const creator = req.params.creator;
            const filteredTasks = taskService.getTasksByCreatorName(creator)
        if (creator) {
            res.location('/api/task')
            return res.status(200).json(filteredTasks)
        }
        return res.status(404).json({code: 404, message: `Il n'y a pas de tâches de cet auteur`})
    },

    sortBy: (req, res) => {
        const { order, data } = req.body;
        const sortedTasks = taskService.sortBy(order, data);
        if (sortedTasks) {
            res.location('/api/task')
            return res.status(200).json(sortedTasks)
        }
        return res.status(404).json({code: 404, message: `Il n'y a pas de tâches à trier.`})
    },
}

module.exports = taskController;