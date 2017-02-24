'use strict'
const express = require('express')
const router = new express.Router()
const User = require('../controllers/usersController')
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
 * /users/read/:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *          description: Error no users found
 */
router.get('/read/', User.getAll)

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
 *       500:
 *          description: Error no users found matching that id
 */
router.get('/read/:id', User.get)

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
router.delete('/:id', User.delete)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Users's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserPutAndPost'
 *     responses:
 *       200:
 *         description: Successfully Updated
 */
router.put('/:id', User.update)

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

router.post('/', User.create)

module.exports = router
