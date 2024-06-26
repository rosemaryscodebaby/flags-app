# Flags App

The Flags App is a React application that allows users to explore and manage a list of countries and their flags. It provides functionalities such as searching, viewing detailed information, and managing a favorites list.

## Getting Started

### Prerequisites

# Ensure you have the following installed:
# Node.js: v22.3.0
# npm: v10.8.1

# You can manage different Node versions using [nvm](https://github.com/nvm-sh/nvm). 
# To install or switch to version 22.3.0, run:
`nvm install 22.3.0`
`nvm use 22.3.0`

# Downloading the code
`git clone https://github.com/rosemaryscodebaby/flags-app.git`

# Importing the dependencies
`npm install`

# Building th app
`npm run build`

# Running the Flags App in Dev-Mode (localhost:3030)
`npm run dev`

# Accessing the homepage via the browser when running locally
`http://localhost:3030/`

# Environment Configuration
# Replace .env file in the root directory to override prod configurations
`echo RESTCOUNTRIES_BASE_URL=https://restcountries.com/v3.1 > .env`

# Deployment - host statically such as on s3 (recommended)
`npm install -g serve`
`serve -s build -l 3030`

# Install cypress
`npm install cypress --save-dev`

# Running End-to-End Tests with Cypress, NB ensure the App is already running (npm run dev)
# Headless mode
`npx cypress run`
# Cypress GUI mode (good for debugging)
`npx cypress open`

# TODO Component tests, currently disabled but can be run with cypress
# TODO Unit tests, partially implemented in Jest with some failing tests and can be run with: 
`npm run test`