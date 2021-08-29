# Blog-Frontend 

### Blog Keeper! 
Application frontend is written in React + Javascript. The [backend](https://github.com/devanbenz/Blog-Backend) of this application is written in Javascript + Express + Mongoose. 
CI/CD pipeline in progress, currently github actions will push docker image [blog-frontend](https://hub.docker.com/repository/docker/weblwabl/blog-frontend) to dockerhub. Github actions will also build and tag local image then push to Amazon Web Services Elastic Container Registry. 

- Bookmarks blogs and stores information in mongo db (mongoose ORM)
- User login and authentication system that utilizes JWT bearer token to view/store data
- *todo* Implement user signup (already implemented in backend)
- *todo* currently user data is stored in *localStorage* -- need to add redis database to store session data
- *todo* Finish Github actions pipeline to push frontend and backend containers to AWS ECS and deploy application to public cloud
- *todo* CSS styling

