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




