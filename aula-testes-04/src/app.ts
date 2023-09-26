import express, { Request, Response } from 'express';

export const app = express();

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK!');
});
