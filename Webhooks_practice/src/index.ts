import app from './app';
import * as dotenv from 'dotenv';
import logger from "./utils/logger";
import config from 'config';
import connect from './utils/connect';

dotenv.config();

const PORT = config.get<number>("port");

app.listen(PORT, async() => {
    logger.info(`Backend started at ${PORT}`);

    await connect();
});
