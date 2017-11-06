To create the graphcool server, go to project directory in termainal and run
```cmd
graphcool init server
```
[Can see data, click through the schema, and test out queries in the Graphcool console playground](https://console.graph.cool)

To edit schema, just change the types.graphql file, go to project directory in terminal and run
```cmd
cd server
graphcool deploy
```
Any major changes will require you to force deploy
```cmd
graphcool deploy -f
```