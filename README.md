CMPT 276 Project Proposal

Iteration 0 Overview

Abstract

TokiBattle is an online web application allowing two users to battle with Tokimon online. Each
competitor has a team of Tokimon with unique moves and abilities. The objective of a Tokimon battle
is to knock out each Tokimon on the opponent’s team. In each simultaneously executed turn, players
can use their currently active Tokimon to attack the opponent or switch their active Tokimon to another
Tokimon on their team. Tokimon moves do different amounts of damage based on the types of the
attacker and defender. Users can create an account and log in, then challenge another user to a battle or
accept a challenge. TokiBattle will include sprites for each Tokimon, as well as animations for the
moves. Information about each individual Tokimon’s stats and moves, as well as information about the
moves themselves, will be stored in a database. TokiBattle will allow players to experience an
alternative to Pokémon battles, with a different set of creatures and different type rules (in Pokémon,
each creature has one or two types, whereas Tokimon have an integer value between 0 and 100 for
every type). This fresh take on the popular game format will appeal to Pokémon fans who want to
experience a different metagame.

Do we have a clear understanding of the problem?

Our objective is to essentially create a battle system similar to the Pokémon franchise and have it
accessible from a website. A place where you can simulate Pokemon battles online with different
creatures and slightly different rules could be a convenient tool for enthusiasts of the game who want to
experience a different metagame. Mostly though, this project will be purely for players’ entertainment.
We hope to target an audience of hardcore Pokemon fans. Those individuals who are really into the
game at a competitive level will likely enjoy the similar experience.

What is the scope of your project?

At the outset out goal is to include the three required features the login, the API, and the real-time use
of Socket.io. In addition to these three epics we want to have a Tokimon/Pokemon database with an
number of combatants to choose from, a move database with information about every move, sprites for
the Tokimon and animations for the moves. These Tokimon should have a fleshed out stat system
which will be utilized later in our battle calculations. Next, since we are envisioning a battle system, we
will need to construct a process to calculate damage and health points for the individual Tokimon as
they battle. Finally, we hope to have a web page that is able to demonstrate the visual changes
occurring to the Tokimon. Namely the loss of health and potentially even visual representations of their
battle moves.When a regular users visits the site, they will be able to challenge another user or accept a challenge,
select a team of Tokimon from a pool of possible candidates, and then face off in battle against the
opponent who has also selected Tokimon of their own. Users should be able to submit moves at the
same time and then the stats of the Tokimon will be used to determine who acts first.

