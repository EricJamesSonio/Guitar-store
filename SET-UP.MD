Flexible DATABASE!

If run by HOST. use the xampp
If run by DOCKER. use the docker

[Steps]
--> Build the .env file and set the database creation into using that .env
--> Dockercompose.yml have its own .env so when run via docker, it will use it overrides the .env of the root
just make sure u don't copy the .env of the root via docker compose and docker file! so it overrides it!

[Changing the port of XAMPP , 3306 --> 3307]
Update the ports of xampp/mysql/bin/my.ini from 3306 to 3307
Update the config of xampp control! main port to 3307
Update the c:\xampp\phpMyAdmin\config.inc.php,, add this line $cfg['Servers'][$i]['port'] = '3307'; // match your new MySQL port

< --------------------------- DOCKER START --------------------------------->

Steps:
Open Docker Desktop and start!
then in vscode terminal:

docker compose up --build

If has error and not succesful, after fix.. run this so no cached!
docker compose build --no-cache
docker compose up

If any fails related to database! just be careful
# Remove old containers & volumes (important for MySQL)
docker compose down -v

# Build fresh images
docker compose build --no-cache

# Start everything
docker compose up



< ----------------------------------------- SUMMARY -------------------------------------------->
In order to do this flexible project, meaning it can use localhost and docker,
If docker is open, it will use it, if docker is not avaialble and the localhost is running, it will use it!

[Confirmation]
-> use the CRUD of the project, and switch to other database like from localhost, switch to docker database 
and you will see that when u switch the items are also depends on teh databse confirming that it was correctly adapting
to either localhost or docker database.

[Set up]
-> use .env file, store the localhost database config in here like :

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=guitar_store
DB_PORT=3307

JWT_SECRET=supersecretkey
NODE_ENV=development

: This will use by the project while its not being put in docker!
: used while testing if the website is running correctly

-> Add .env.docker, use this for docker database configurations! like :

DB_HOST=db
DB_USER=root
DB_PASSWORD=      
DB_NAME=guitar_store
DB_PORT=3306
PORT=5000

: This is the database that will be use when it was put in the docker container!
: Notice that it has different port. it's required to make it work!

-> set-up the docker file, This is the server adockerfile since i put the database inside server so this is the dfockerfile,

# Use Node 18 LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all server code
COPY . .

# Expose server port
EXPOSE 5000

# Start server
CMD ["node", "index.js"]

: Notice that i didn't let the dockerfile copy the .env so that it won't override the database and let
the docker use the docker database created! 

-> Set up the db.js to make it flexible! like this 

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get absolute path to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Decide which .env to load
// Priority: DOCKER_ENV_FILE > process.env.NODE_ENV=docker > local .env
let envPath = path.resolve(__dirname, '../../.env'); // default local
if (process.env.DOCKER_ENV_FILE) {
  envPath = path.resolve(__dirname, `../../${process.env.DOCKER_ENV_FILE}`);
} else if (process.env.NODE_ENV === 'docker') {
  envPath = path.resolve(__dirname, '../../.env.docker');
}

dotenv.config({ path: envPath });

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'guitar_store',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log(
  `✅ Connected to database: ${process.env.DB_NAME} (${process.env.DB_HOST}) using env: ${envPath}`
);

: Now this will decide which database will be used! it prioritize the docker database! if not open then it will 
check if localhost is running and that will be used! 

-> Set up the docker-compose.yml to build all containers liek this :
services:
  db:
    image: mysql:8.1
    container_name: guitar-db
    restart: always
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"  # for dev only
      MYSQL_DATABASE: ${DB_NAME}         # optional: auto-create DB
    ports:
      - "3307:3306"
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 5s
      retries: 20
      start_period: 5s

  initdb:
    build:
      context: ./server
    container_name: guitar-initdb
    command: ["npm", "run", "init-db"]
    working_dir: /app
    volumes:
      - ./server:/app
    env_file:
      - .env.docker
    depends_on:
      db:
        condition: service_healthy
    restart: "no"
    networks:
      - app-network

  server:
    build:
      context: ./server
    container_name: guitar-server
    restart: always
    env_file:
      - .env.docker
    environment:
      NODE_ENV: docker
      DOCKER_ENV_FILE: .env.docker
      DB_HOST: db
      DB_PORT: 3306
    ports:
      - "5000:5000"
    depends_on:
      initdb:
        condition: service_completed_successfully
    networks:
      - app-network
    command: npm start
    volumes:
      - ./server:/app
      - /app/node_modules

  client:
    build:
      context: ./client
    container_name: guitar-client
    restart: always
    ports:
      - "3001:80"
    networks:
      - app-network
    depends_on:
      - server

volumes:
  db_data:

networks:
  app-network:
    driver: bridge

: The purpose of that is to set up all the containers! using docker files! 

< --------------------------------- THE END ----------------------------------->

[Requirements]
.env        - databawse config localhost
.env.docker - database confiog docker 
dockerfile  - ignore .env 
docker-compose.yml  - build using the .env.docker in database to build
database/db.js  - flexible switch between docker and localhost







