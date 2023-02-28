# DEPENDENCIES
- Node: download, or use homebrew to install(will need to install that as well!)
- Install Docker desktop
- <code> npm install --global yarn </code>


# RUNNING THE APP
- Create and start the database container <code>docker run --name database -p 27017:27017 -v {{absolute path to /Certification/data}}:/data/db -d mongo:latest</code>
<code> yarn run-backend </code>


# WHAT IS NOT IMPLEMENTED
- Authorization/authentication
- extensive error handling
- 100% test coverage
- Running the entire app in a container/utilize docker-compose