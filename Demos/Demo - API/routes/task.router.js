const taskRouter = require("express").Router();

const taskController = require("../controllers/task.controller");

//get    /api/task/       -> getAll
//post   /api/task/       -> create
taskRouter.route("/")
    .get(taskController.getAll)
    .post(taskController.create)

taskRouter.route("/status/:status")
    .get(taskController.getTasksByCompletionStatus)

taskRouter.route("/creator/:creator")
    .get(taskController.getTasksByCreatorName)
//get    /api/task/12     -> getById
//put    /api/task/12     -> update
//delete /api/task/12     -> delete

taskRouter.route('/sort')
    .get(taskController.sortBy)

taskRouter.route("/:id")
    .get(taskController.getById)
    .put(taskController.update)
    .delete(taskController.delete)

module.exports = taskRouter;