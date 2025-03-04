import { Router } from 'express';
const router = Router();
import clientController from '../controllers/client.controller.js';
const {registerClient, getClients, deleteClient, getClientProfile, editProfile } = clientController;
// const { authCheck } = require('./auth.router');
// const { cookieAuth } = require('../middleware/cookieAuth');

const userRouter = Router();

router.post('/register', registerClient); //register client
router.get('/', getClients);
router.get('/:clientId', getClientProfile);
router.put('/update/:clientId', editProfile);
router.delete('/delete/:clientId', deleteClient);
// router.put('/settings/account/password', changePassword);
// router.delete('/delete-all-clients', deleteAllClients);


export default router;