import { Router} from 'express';
import tasksController from '../controllers/tasks.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    properties:
 *     id: 
 *      type: string
 *      description: the auto-generated id of task
 *     name:
 *      type: string
 *      description: the name of the task
 *     description:
 *      type: string
 *      description: the description of the task
 *    required:
 *     - name
 *     - description
 *    example:
 *     id: RR7BOO3bPUpLFh0jv6wr_
 *     name: My firs task
 *     description: I need do something.
 *   CreateTask:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      description: the name of the task
 *     description:
 *      type: string
 *      description: the description of the task
 *    required:
 *     - name
 *     - description
 *    example:
 *     name: My firs task
 *     description: I need do something.
 *   TaskNotFound:
 *    type: object
 *    properties:
 *     msg:
 *      type: string
 *      description: A message for a not found task
 *    example:
 *     msg: The task not found
 *  parameters:
 *   taskId:
 *    in: path
 *    name: id
 *    required: true
 *    schema:
 *     type: string
 *     description: the task id
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks enpoints
 */

/**
 * @swagger
 * /tasks:
 *  get:
 *   summary: Return a Task list
 *   tags: [Tasks]
 *   responses:
 *    200:
 *     description: the list of tasks
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Task'
 *         
 *         
 */
router.get('/tasks', tasksController.getAll);

/**
 * @swagger
 * /tasks/count:
 *  get:
 *   summary: Return the number of tasks created
 *   tags: [Tasks]
 *   responses:
 *    200:
 *     description: the number of tasks
 *     content:
 *      text/plain:
 *       schema:
 *        type: integer
 *        description: quantity number of tasks
 *        example: 2
 */
router.get('/tasks/count', tasksController.getCounter);

/**
 * @swagger
 * /tasks:
 *  post:
 *   summary: Create a Task
 *   tags: [Tasks]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/CreateTask'
 *   responses:
 *    201:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#components/schemas/Task'
 *    400:
 *     description: Bad request
 *    500:
 *     description: Server Error
 */
router.post('/tasks', tasksController.create);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *   summary: Return a specific Task
 *   tags: [Tasks]
 *   parameters:
 *    - $ref: '#/components/parameters/taskId'
 *   responses:
 *    200:
 *     description: the task was found
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/components/schemas/Task'
 *    404:
 *     description: Not Found
 *     schema:
 *      $ref: '#/components/schemas/TaskNotFound'
 *         
 *         
 */
router.get('/tasks/:id', tasksController.getOne);

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *   summary: Delete a specific Task
 *   tags: [Tasks]
 *   parameters:
 *    - $ref: '#/components/parameters/taskId'
 *   responses:
 *    200:
 *     description: the task was deleted
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/components/schemas/Task'
 *    404:
 *     description: Not Found
 *     schema:
 *      $ref: '#/components/schemas/TaskNotFound'
 *         
 *         
 */
router.delete('/tasks/:id', tasksController.deleteOne);

/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *   summary: Update a specific Task
 *   tags: [Tasks]
 *   parameters:
 *    - $ref: '#/components/parameters/taskId'
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/CreateTask'
 *   responses:
 *    200:
 *     description: the task was updated
 *     content:
 *      application/json:
 *       schema:
 *         $ref: '#/components/schemas/Task'
 *    404:
 *     description: Not Found
 *     schema:
 *      $ref: '#/components/schemas/TaskNotFound'
 *         
 *         
 */
router.put('/tasks/:id', tasksController.update);


export default router;