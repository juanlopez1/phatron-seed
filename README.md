# Phatron Seed

A seed project with [Phaser](https://github.com/photonstorm/phaser) and [Electron](https://github.com/electron/electron).
This project uses [Babel](https://babeljs.io) for transpile and [Webpack](https://webpack.js.org) for bundling.

## Setting Environment

After clone this project you should install the npm packages.

### `npm install`

## Available Scripts

Runs the game in dev mode.

### `npm run start-dev`

Runs the game with compiled assets (`dist` folder).

### `npm run start-prod`

Build the game.

### `npm run build`

Runs ESLint in all project and fix errors.

### `npm run lint`

## Configuration

This project includes [dotenv](https://github.com/motdotla/dotenv), to manage some configurations.

### Example `.env` file (for dev mode)

```
NODE_ENV=development
DEV_SERVER_PORT=3000

ELECTRON_DEV_TOOLS=true
ELECTRON_FULL_SCREEN=false
ELECTRON_REMOVE_MENU=false
ELECTRON_WINDOW_WIDTH=1280
ELECTRON_WINDOW_HEIGHT=960
```

### Example of `.env.prod` file

```
NODE_ENV=production

ELECTRON_DEV_TOOLS=false
ELECTRON_FULL_SCREEN=true
ELECTRON_REMOVE_MENU=true
ELECTRON_WINDOW_WIDTH=1280
ELECTRON_WINDOW_HEIGHT=960
```
