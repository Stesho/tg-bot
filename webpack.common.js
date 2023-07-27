import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'index.cjs',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, './src/'),
      '@api': path.resolve(__dirname, './src/api/'),
      '@bot': path.resolve(__dirname, './src/bot/'),
      '@commands': path.resolve(__dirname, './src/commands/'),
      '@constants': path.resolve(__dirname, './src/constants/'),
      '@db': path.resolve(__dirname, './src/db/'),
      '@middlewares': path.resolve(__dirname, './src/middlewares/'),
      '@scenes': path.resolve(__dirname, './src/scenes/'),
      '@utils': path.resolve(__dirname, './src/utils/'),
    },
    extensions: ['.js', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: /AbortSignal/,
        },
      }),
    ],
  },
};
