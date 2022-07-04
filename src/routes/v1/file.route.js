const express = require('express');
const fileController = require('../../controllers/file.controller');
const router = express.Router();

router.post('/upload', fileController.upload);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: File
 *   description: File upload
 */

/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: upload a file
 *     tags: [File]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "200":
 *         description: Uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       "400":
 *         description: Failed to upload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
