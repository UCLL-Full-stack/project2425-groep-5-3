/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         title:
 *           type: string
 *           description: event title.
 *         description:
 *           type: string
 *           description: event description.
 *         eventInfos:
 *           $ref: '#/components/schemas/EventInfo'
 * 
 *     EventInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         category:
 *           type: string
 *           description: The category of the event
 *         location:
 *           type: string
 *           description: The location of the event
 *
 *     EventInput:
 *       type: object
 *       properties:
 *         title: 
 *           type: string
 *           description: event title.
 *         description: 
 *           type: string
 *           description: event description.
 *         eventInfos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EventInfoInput'
 *           description: Array of event information objects. 
 *     
 *     EventInfoInput:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: The category of the event info.
 *         location:
 *           type: string
 *           description: The location of the event info.
 */
import express, { NextFunction, Request, Response } from 'express';
import eventService from '../service/event.service';
import { EventInput } from '../types';

const eventRouter = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a list of all events.
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Event'
 */
eventRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /events/{id}:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get a event by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The event id.
 *      responses:
 *          200:
 *              description: An event object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */
eventRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await eventService.getEventById(Number(req.params.id));
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /create:
 *  post:
 *      security:
 *       - bearerAuth: []
 *      summary: Create a new event.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventInput'
 *      responses:
 *          200:
 *              description: the created event.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */
eventRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = <EventInput>req.body;
        const result = await eventService.createEvent(event);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});



/**
 * @swagger
 * /events/{id}:
 *  delete:
 *      security:
 *       - bearerAuth: []
 *      summary: Delete an event by ID.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The ID of the event to be deleted.
 *      responses:
 *          200:
 *              description: Event deleted successfully.
 *          400:
 *              description: Event not found or failed to delete.
 *          500:
 *              description: Internal server error.
 */
eventRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const event = await eventService.deleteEvent({ id: Number(id) });
        res.status(200).json(event);
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /events/{id}:
 *  put:
 *      security:
 *       - bearerAuth: []
 *      summary: Update an event by ID.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The ID of the event to be updated.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EventInput'
 *      responses:
 *          200:
 *              description: The updated event.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          400:
 *              description: Event not found or invalid data.
 *          500:
 *              description: Internal server error.
 */
eventRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const event = <EventInput>req.body;

    try {
        const updatedEvent = await eventService.updateEvent({ id: Number(id)}, event);
        res.status(200).json(updatedEvent);
    } catch (error) {
        next(error);
    }
});

export { eventRouter };
