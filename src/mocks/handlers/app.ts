import { rest } from 'msw';

import {
  getAppConfig,
} from '~/mocks/fixtures/app';

const URL_PATH = '*/api/app/';

const getAppConfigHandler = rest.get(URL_PATH, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(getTodos())),
);

const handlers = [
  getAppConfigHandler,
];

export default handlers;
