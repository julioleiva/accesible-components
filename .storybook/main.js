import { mergeConfig } from 'vite';

export default {
  stories: ['../src/**/*.stories.js'],
  framework: '@storybook/web-components-vite',
  addons: ['@storybook/addon-a11y'],
  core: {
    builder: '@storybook/builder-vite'
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': '/src'
        }
      }
    });
  }
};