# Setup

## Requirements

Please make sure you have the following minimum requirements on your machine. The project should function on Mac or PC.

 - Node v12.16.1 or later
 - Yarn 1.22.4 or later

> **Mac OS Requirements installation**
>
> To get up and running on Mac OS, you can copy and paste following commands into a terminal in order.
>
> - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
> - `brew install node@12`
> - `curl -o- -L https://yarnpkg.com/install.sh | bash`

## Project Quick Start

After installing the requirements above, in the project directory run `yarn start`. This will:

 - Install node dependancies for the server
 - Run PM2 in watch mode to start and live-refresh an express server (accessable at `http://localhost:3000/`)
 - `http://localhost:3000/users` for users in London and within 50 miles radius 
