import { Router } from 'express';

import { getDeployment, addDeployment, deleteDeployment} from '../services';

const router: Router = Router();

router.get('/get', getDeployment); // handler functions
router.post('/add', addDeployment); // handler functions
router.post('/delete', deleteDeployment); // handler functions

export const EventController: Router = router;