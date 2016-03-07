#Coins Tracker

This is a sample game with a betting system made in 48 hours.

##Screenshots

![Menu](/screenshots/menu.png?raw=true "Menu")
![Ingame](/screenshots/ingame.png?raw=true "Ingame")
##Launch

The game is just an html page, it should run on any local server.

##Introduction

The game is a simple board game. The player launches a dice and moves on the board, collecting (or losing) coins in the process. When the player stops on a case, something happens (which amounts to losing or winning coins).

The player can launch the dice five times, and then the game is finished and the player gets money depending on how much coins they collected, multiplied by their bet.

##Coins Collecting

The player gets coin in two ways:

* On each case, a spinning coin is present and will be picked when the player pass that case, even if they don't stop on it
* After each dice roll, the case where the player stops can make them earn/lose money.

##Tile Effects

* Blue tiles are basic bonus: The player earns 3 coins when stopping on them
* Red coins are the malus: The player loses 5 coins on them. (A little more than blue one to compensate for the other bonuses)
* Yellow tiles are stars. They earn 10 coins
* The green tile is an event. It will spin a wheel that will decide how much coins you win/lose (random between -10 and 10). [Not yet implemented]
* The purple tile is a great reward of 100 coins. You can only reach it in cases that are far away, and this region of the board tend to contain more malus, so that trying to get there is more risky.
* The orange tile is the best reward and earns 777 coins alone. To reach it, you need to play a perfect game (it is 30 moves away from the start), so you need to roll a 6 for the 5 turns. This means the chances of getting this reward are basically 1/6^5, which amounts to ~0.01%. Almost unreachable, but a good bet for the greedy player.

##Betting

Betting can be done in increments of 10£, with a minimum of 10£ and maximum of 100£. Each 10£ increase by 1 the money multiplier
(1 coin = 1£ for 10£ bet. 1 coin = 2£ for 20£ bet)

##Game Engine

The game runs on a simple Entity/Component game engine developped from scratch. All objects in the game are entities, which is a base class that can have components attached to it. All entities have the Transform component, which is the position/rotation/scale of the object, and can be parent/child of another transform (inspired by Unity).

The various components contain reusable logic that defines some behaviours (for example, a GameButton component makes an object react to mouse over and presses).

##Libraries

Libraries used:

* Greensock: Pretty powerful Javascript animation library
* Howler: To play sounds
* require.js: Script loader/dependencies manager
* underscore.js: For some helper functions
* jquery: Just for easier dom manipulation