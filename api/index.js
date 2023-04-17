import Express from 'express';
import router from './router.js';
import controlers from './controlers/index.js';
import repository from './repository/index.js';
import model from './model/index.js';

const launch = (apiPort) => {
  const app = new Express();
  app.use(Express.json());

  router(
    controlers(
      repository(model)
    ),
    app
  );

  app.listen(apiPort);

  console.log(`API server listening on port ${apiPort}...`);

  // For testing purposes
  return app;
};

export default { launch };
