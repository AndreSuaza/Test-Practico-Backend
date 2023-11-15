import express, {Request, Response} from 'express';
import { getItemByIdMeli, getItemsMeli } from '../services/itemsServices';
import 'dotenv/config';

const router = express.Router();


router.get('/', (req: Request, res: Response) => {
    
    const nameProduct: string = req.query.q as string;
    
    if(!nameProduct)
    throw new Error('Verifique los Parametros').message;

    const offset = req.params.offset ? parseInt(req.params.offset) : 0;
    const limit = req.params.limit ? parseInt(req.params.limit) : parseInt(process.env.LIMIT as string) ;

    getItemsMeli(nameProduct, offset, limit)
    .then(response => res.send(response));
    
});

router.get('/item/:id', (req: Request, res: Response) => {

    const id: string = req.params.id;

    getItemByIdMeli(id)
    .then(response => res.send(response));

});

export default router;