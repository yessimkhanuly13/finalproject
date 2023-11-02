const Router = require('express');
const collectionController = require('../controllers/collectionController');
const collectionRouter = new Router();


collectionRouter.get('/all', collectionController.getAllCollections);
collectionRouter.get('/:id', collectionController.getCollectionsByUserId);
collectionRouter.post('/add', collectionController.add);
collectionRouter.put('/update/:id', collectionController.update);
collectionRouter.delete('/delete/:id', collectionController.delete );
collectionRouter.put('/additem/:id', collectionController.addItemToCollection);


module.exports = collectionRouter;