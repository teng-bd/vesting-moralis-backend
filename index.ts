import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import Moralis from "moralis";
import config from './config';
import { EvmChain, MoralisEvmUtils } from '@moralisweb3/evm-utils';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

const chain = EvmChain.RINKEBY;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello world!</h1>');
});

app.get('/balance/:address', async (req: Request, res: Response) => {
  const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
    address: req.params.address,
    chain,
  });

  res.send({
    nativeBalance,
  });
});

const startServer = async () => {
  await Moralis.start({
    apiKey: config.MORALIS_API_KEY
  });

  app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
};

startServer();