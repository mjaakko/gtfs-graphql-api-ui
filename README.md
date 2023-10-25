# gtfs-graphql-api-ui

This application provides a web UI for [gtfs-graphql-api](https://github.com/mjaakko/gtfs-graphql-api). The application is written in TypeScript using React.

## Development 

* `yarn run compile` - Generates TypeScript types for GraphQL schema
* `yarn start` - Runs the application in development mode
* `yarn build` - Builds a production version of the application

## Running

Docker image for the application is available from [DockerHub](https://hub.docker.com/r/mjaakko/gtfs-graphql-api-ui) with name `mjaakko/gtfs-graphql-api-ui`.

### Environment variables

These variables should be set when running the application

* `REACT_APP_HTTP_GRAPHQL_URL` - HTTP endpoint of the GraphQL API
* `REACT_APP_WS_GRAPHQL_URL` - WebSocket endpoint of the GraphQL API
* `REACT_APP_APPLICATION_TITLE` - title of the application shown in the UI
