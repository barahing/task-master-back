const connection = require ('../db');

// Endpoints para la tabla Tasks

const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT task_id, description, task_deadline, status, category_name, priority_name, username FROM tb_task INNER JOIN task_priority ON (tb_task.task_priority = task_priority.priority_id) INNER JOIN task_status ON (tb_task.status_id = task_status.status_id) INNER JOIN task_category ON (tb_task.category_id = task_category.category_id) INNER JOIN tb_user ON (tb_task.user_id = tb_user.user_id) ORDER BY task_id', (err, rows) => {
            if (err) reject (err)
            resolve (rows);
        });
    });
};

const getTaskByUserId = (user_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT task_id, description, task_deadline, status, category_name, priority_name, username FROM tb_task INNER JOIN task_priority ON (tb_task.task_priority = task_priority.priority_id) INNER JOIN task_status ON (tb_task.status_id = task_status.status_id) INNER JOIN task_category ON (tb_task.category_id = task_category.category_id) INNER JOIN tb_user ON (tb_task.user_id = tb_user.user_id) WHERE tb_user.user_id=? ORDER BY task_id ', [user_id], (err, rows) => {
            if (err) reject (err)
            resolve (rows);
        });
    });
    
}

const getTaskById = (task_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM tb_task WHERE task_id=?', [task_id], (err, rows) => {
            if (err) reject (err)
            resolve (rows);
        });
    });
    
}

const createTask = (description, task_deadline, task_priority, status_id, category_id, user_id) => {
    return new Promise ((resolve, reject) => {
        connection.query('INSERT INTO tb_task (description, task_deadline, task_priority, status_id, category_id, user_id) VALUES (?,?,?,?,?,?)', [description, task_deadline, task_priority, status_id, category_id, user_id], (err, result) => {
            if (err) reject (err)
            if (result) resolve (result)
        } )
    })
}

const updateTask = (task_id, description, task_deadline, task_priority, status_id, category_id, user_id) => {
    return new Promise ((resolve, reject) => {
        connection.query('UPDATE tb_task SET description=?, task_deadline=?, task_priority=?, status_id=?, category_id=?, user_id=? WHERE task_id=?', [description, task_deadline, task_priority, status_id, category_id, user_id, task_id], (err, result) => {
            if (err) reject (err)
            if (result) resolve (result)
        } )
    })
}

const setKanbanId = (task_id, kanban_id) => {
    return new Promise ((resolve, reject) => {
        connection.query('UPDATE tb_task SET kanban_id=? WHERE task_id=?', [kanban_id, task_id], (err, result) => {
            if (err) reject (err)
            if (result) resolve (result)
        } )
    })
}

const setStatusId = (kanban_id, status_id) => {
    return new Promise ((resolve, reject) => {
        connection.query('UPDATE tb_task SET status_id=? WHERE kanban_id=?', [status_id, kanban_id], (err, result) => {
            if (err) reject (err)
            if (result) resolve (result)
        } )
    })
}

const deleteTask = (task_id) => {
    return new Promise ((resolve, reject) => {
        connection.query('DELETE FROM tb_task WHERE task_id=?', [task_id], (err, result) => {
            if (err) reject (err)
            if (result) resolve (result)
        } )
    })
}


module.exports = {getAllTasks, createTask, getTaskById, updateTask, deleteTask, setKanbanId,
                    setStatusId, getTaskByUserId                   
}
