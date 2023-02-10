# DEPENDENCIES
- Node: download, or use homebrew to install(will need to install that as well!)
- Install Docker desktop
- <code> npm install --global yarn </code>


# RUNNING THE APP
- Start the database container <code>docker run --name database -p 27017:27017 -v {{absolute path to /Certification/data}}:/data/db -d mongo:latest</code>
<code> yarn run-backend </code>


# WHAT IS NOT IMPLEMENTED
- Authorization/authentication
- Running the entire app in a container/utilize docker-compose