const Router = require('express');
const itemsController = require('../controllers/itemsController');
const itemsRouter = new Router();

itemsRouter.get('/all', itemsController.getAllItems);
itemsRouter.get('/user/:id', itemsController.getItemsByUserId);
itemsRouter.get('/:id', itemsController.getItemById);
itemsRouter.delete('/delete/:id', itemsController.deleteFromCollection, itemsController.delete);
itemsRouter.put('/update/:id', itemsController.update);
itemsRouter.put('/addtag/:id',itemsController.addTag, itemsController.addTagToItem);
itemsRouter.post('/addcomment/:id', itemsController.addNewComment, itemsController.addCommentToItem);
itemsRouter.put('/addlike/:id/:username', itemsController.commentLikeHandle);
itemsRouter.delete('/delcomment/:id', itemsController.deleteCommentFromItem);


module.exports = itemsRouter;