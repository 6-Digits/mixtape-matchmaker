# Mixtape Matchmaker

![MM Logo](/client/src/assets/logo.png)

## Requirements

* NodeJS, npm
* Ports 4000, 5000, 8080, and 42069 allowed on firewall
* A web browser

## Installation

Clone the repository
```bash
$ git clone https://github.com/6-Digits/mixtape-matchmaker.git
```
Change directories into the folder
```bash
$ cd mixtape-matchmaker
```
You will need two terminals, one for the server and one for the client.

### Starting the server
Using of the terminals change directories to the `server` folder
```bash
$ cd server
```
Install the dependencies using npm
```bash
$ npm install
```
Start the server
```bash
$ npm start
```
The server will be started on port `http://localhost:42049`

### Starting the client
Using the other terminal change directories to the `client` folder
```bash
$ cd client
```
Install the dependencies using npm
```bash
$ npm install
```
Start the client
```bash
$ npm start
```
The client will be started on port `http://localhost:8080`. This is what will be used to access the website. 

## Matching Algorithm

The matching algorithm runs every two minutes in the background and will try to find any other users that you can match with. You will only receive new matches when you have exhausted the current list of potential matches. To match with new people either:

1. Manually clear you match list by liking or disliking everyone until there are no more candidates
2. Edit your match preferences and save. This will automatically clear your match list 

The matching algorithm will only find new matches for users with an empty match list. Therefore, if you cannot find the user you wish to match with, try clearing your match list using one of the two methods above. 

When liking another user's profile while matching, the other user must like you back in order to create a chat with them. When both users have matched and liked each other, please allow up to one minute for the chat to be created. 