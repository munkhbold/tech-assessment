import express from 'express';
import apiRouter from './api/apiRouter';
const port = 3010;

// Set up the server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register the API router
app.use('/api', apiRouter);

app.listen(port, () => console.log(`Server now listening on port ${port}`));

