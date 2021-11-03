import devConfig from './config.dev';
import prodConfig from './config.prod';

const config = {
  dev: {
    ...devConfig
  },

  prod: {
    ...prodConfig
  }
};

export default process.env.NODE_ENV === 'production'
  ? config.prod
  : config.dev;
