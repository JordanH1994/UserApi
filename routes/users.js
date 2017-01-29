'use strict';
const express = require('express');
const router = new express.Router();
const User = require('./users/index.js');
/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       forname:
 *         type: string
 *       surname:
 *         type: string
 *       email:
 *         type: string
 *       createdON:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   UserPutAndPost:
 *     properties:
 *       forname:
 *         type: string
 *       surname:
 *         type: string
 *       email:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/', User.getAll);

/**
 * @swagger
 * /users/read/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single User
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/read/:id', User.getOne);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Users's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id', User.destroy);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: Users
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *     - name: user
 *       in: body
 *       description: New data for the User
 *       schema:
 *         $ref: '#/definitions/UserPutAndPost'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:id', User.update);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserPutAndPost'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/', User.create);

module.exports = router;
