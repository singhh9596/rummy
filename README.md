# Rummy
 
 Built a Playing cards shuffuling module that takes the configuration of number of Sets(1 set = 52cards + Joker) to include in the deck and the shuffling type.

Lets get Ready for the game

# Prerequisites
- To launch the server 
  - Nodejs is the only dependency (verified with node 4.x)
- To build and execute the source
  - node (version 4.x)
  - bower
  - grunt
  - typescript

# Folder Structure
    ├── dist
    │   ├── css
    │   ├── img
    │   ├── js
    │   └── partials
    ├── server
    ├── src
    ├── webapp
    ├── index.html
    └── server.js

The crux of the this repo is to create a shuffling module for a going to be built rummy game.
Thus the core logic just related to the Shuffling mechanism lies in the `src` folder

The webapp consist of the client side code of the application 

The server consist of the server-side business logic

The dist folder is used as the distribuition folder for the code and content

server.js is the concatenate server code which consist serve routes + the rummy module 

# Launch the rocket
- To Launch the server cd to the repo and execute `node server.js`. server would running at port `5698`

To know what is happening behind closed doors start your treasure hunt from `main.ts` in `src` folder

If you feel the code is vilify,do raise issue would be happy to learn. :)
