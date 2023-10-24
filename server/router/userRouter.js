const Router = require('express');
const userController = require('../controllers/userController');
const userRouter = new Router();

userRouter.get('/', userController.getUsers);
userRouter.delete('/delete/:id', userController.deleteUsers);
userRouter.put('/block/:id', userController.blockUsers);
userRouter.put('/unblock/:id', userController.unblockUsers);

module.exports = userRouter;