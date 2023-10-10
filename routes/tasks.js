const { Router } = require ('express');
const querys = require ('../controllers/tasks');

const router = Router();

router.get('/', async (req, res) => {
    const query = await querys.getAllTasks();
    return res.status(200).json(query);
});

router.get('/user/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const query = await querys.getTaskByUserId(user_id);
    return res.status(200).json(query);
});

router.get('/:task_id', async (req, res) => {
    const {task_id} = req.params;
    const query = await querys.getTaskById(task_id);
    return res.status(200).json(query);
});

router.post('/', async(req, res) => {
    const {description, task_deadline, task_priority, status_id, category_id, user_id} = req.body;
    const query = await querys.createTask(description, task_deadline, task_priority, status_id, category_id, user_id);
    return res.status(201).json(query);
});

router.put('/', async(req, res)=> {
    const {task_id, description, task_deadline, task_priority, status_id, category_id, user_id} = req.body;
    const query = await querys.updateTask(task_id, description, task_deadline, task_priority, status_id, category_id, user_id);
    return res.status(201).json(query);
})

router.put('/setKanbanId', async(req, res)=> {
    const {task_id, kanban_id} = req.body;
    const query = await querys.setKanbanId(task_id, kanban_id);
    return res.status(201).json(query);
})

router.put('/setStatusId', async(req, res)=> {
    const {kanban_id, status_id} = req.body;
    const query = await querys.setStatusId(kanban_id, status_id);
    return res.status(201).json(query);
})

router.delete('/:task_id', async(req, res)=> {
    const {task_id} = req.params;
    const query = await querys.deleteTask(task_id);
    return res.status(201).json(query);
})

module.exports = router;