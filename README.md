# Tree

## Description

MEAN stack + socket.io + JWT application with real time data visualization, also including input validation(UI&Server) and Authentication/Autherization.

Deployed to Heruko: [Tree](https://tree-tina.herokuapp.com/)

## User Journey

1. User can either Sign Up or Log In to the application, and token will be assigned and stored in the local storage;(username and email should be unique)
2. After successful log in, user can either create new node or view list of nodes and modify them;
3. Create a node required name, count, lower and higher bound with constrains;
4. User can toggle the icon next to the node name to view node children;
5. User can click on the node name to regenerate children by providing required information or delete the node;
6. User can rename the node by click on the edit icon;
7. All data modification actions will real time reflect on the other logged in user's screen without refresh or polling;
8. User can then log out and return back to the log in screen, and token will be removed after the log out.