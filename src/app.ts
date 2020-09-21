import * as express from 'express';
import apiRouter from './api/routes';

const PORT = process.env.PORT || 3010
// Set up the server
export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log(`Server now listening on port ${PORT}`));
