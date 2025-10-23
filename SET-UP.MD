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


