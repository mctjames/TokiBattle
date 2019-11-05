# TokiBattle

Document Header
TokiBattle
Requirements and Specification Document
11/04/2019, version 1
Project Abstract
TokiBattle is an online web application allowing two users to battle with Tokimon online. Each
competitor has a team of Tokimon with unique moves and abilities. The objective of a Tokimon
battle is to knock out each Tokimon on the opponent’s team. In each simultaneously executed
turn, players can use their currently active Tokimon to attack the opponent or switch their active
Tokimon to another Tokimon on their team. Tokimon moves do different amounts of damage
based on the stats of the attacker and defender. Users can create an account and log in, then
challenge another user to a battle or accept a challenge. TokiBattle will include sprites for each
Tokimon, as well as animations for the moves. Information about each individual Tokimon’s
stats and moves, as well as information about the moves themselves, will be stored in a database.
TokiBattle will allow players to experience an alternative to Pokémon battles, with a different set
of creatures and different type rules (in Pokémon, each creature has one or two types, whereas
Tokimon have an integer value between 0 and 100 for every type). This fresh take on the popular
game format will appeal to Pokémon fans who want to experience a different metagame.
Customer
TokiBattle has two types of customers. The first type is the hardcore Pokémon fan who enjoys
battling with other trainers on their Nintendo device or on online services such as Pokémon
Showdown. This customer already clearly enjoys creature-battling games with simultaneously
executed turns, and will likely be curious to see which strategies will succeed with TokiBattle’s
unique stat system. This customer needs an interesting and strategic battling system.
Our second kind of customer is a more casual player, who likely grew up playing Pokémon but
has not played any of the newer games in years. This kind of customer exists in droves, and often
feels a great sense of nostalgia for the original 151 Pokémon but dislikes the design of the newer
creatures. The key for attracting this kind of customer will be to create simple yet loveable
sprites for our Tokimon. Unlike our other customer, this one does not care very much about the
game’s mechanical intricacies, and is unlikely to notice the difference between TokiBattle and
Pokémon’s stat and type systems. The game’s “juice” (sprites, animations, sounds) will be more
important for winning this customer over.
Competitive Analysis
TokiBattle’s biggest competitor is also its greatest benefactor. We obviously do not expect
TokiBattle to overtake Pokémon as the number one creature battling video game. In fact, the
majority of Pokémon’s playerbase is unlikely to see a reason to play Tokimon over its big
brother. But we are not trying to target that whole playerbase – just the two kinds of customers
listed above. Because of this, TokiBattle actually relies on the association with Pokémon so that
customers will immediately know what kind of game it is, and then can discover the differences
between the two games.As noted in the “Customers” section, TokiBattle will benefit from its unique type and stat
system. This sets the game apart from Pokémon and will inspire a certain kind of player to try
the game. TokiBattle also is in the position to capture nostalgic fans who are jaded by the design
choices and complexity of the newer Pokémon games.
TokiBattle’s similarities to Pokémon will be its “foot-in-the-door,” while the differences between
the two games will keep our users wanting to keep coming back for more.
User Stories
Actors:
• Regular user (person who battles Tokimon on the site)
• Administrator (person who can battle Tokimon and see information from other users)
Login - 3 points – Iteration 1
Story: As a regular user, I want to create my account and log in with my username and password
so that I soon will be able to choose some Tokimon and start battling!
Triggers/Preconditions: I am interested in playing TokiBattle, but I know that I need an
account to do so. Currently there is no option to log into TokiBattle, so no one can make teams
or battle.
Actions/Postconditions: The TokiBattle development team will add a login functionality using a
database of usernames and passwords. Usernames must be unique as they are the database’s
primary key. Once this feature has functionality, users will be able to create an account and log
in, and soon they will be able to create teams of Tokimon that are associated with their unique
username.
Acceptance Tests:
• Users can create an account and access the landing page.
• Returning users can re-log into their account with the username and password they chose.
• Passwords should be hidden from view while they are being typed.
• An invalid username with an invalid password should return a failure message.
• An invalid username with a valid password should return a failure message.
• A valid username with an invalid password should return a failure message.
• A blank username with a valid password should return an error message.
• A valid username with a blank password should return an error message.
• A blank username with a blank password should return an error message.
Administrator Login - 3 points – Iteration 1
Story: As an administrator, I want to be able to see all of the users and (when the feature is
available) their teams of Tokimon so that I can better balance each Tokimon’s stats and moveset.Triggers/Preconditions: Without administrator permission, it is not easy for anyone to see
information such as users and teams, because that data is stored in databases, which are less
accessible and user-friendly than displays on a web page. Currently, there is no administrator
login.
Actions/Postconditions: The TokiBattle development team will hard-code several usernames as
administrators in the database of users. The development team will then create a button with a
link to a page that shows all TokiBattle usernames. This page will only be available to
administrators. The data on this page is pulled from the database of users.
Acceptance Tests:
• Administrator can create an account and access the landing page.
• Returning administrators can re-log into their account with the username and password
they chose.
• Passwords should be hidden from view while they are being typed.
• An invalid username with an invalid password should return a failure message.
• An invalid username with a valid password should return a failure message.
• A valid username with an invalid password should return a failure message.
• A blank username with a valid password should return an error message.
• A valid username with a blank password should return an error message.
• A blank username with a blank password should return an error message.
• Administrators can access the page with the table of users.
• When new users are added, administrators can see the updated table.
• When regular users try to access the administrator-only page, they see a page that says
“This page only available for administrators”.
Future Stories:
• Teambuilder – 4 points – Iteration 2: As a user who enjoys teambuilding, I want to be
able to create and save a team of Tokimon so that I know which Tokimon I will be able
to battle with.
• Banhammer – 1 point – Iteration 2: As an administrator, I want to be able to remove
users from the user database so that I can ban toxic players and “lay off” inactive users.
• View Move Data – 3 points – Iteration 2: As a user who is particularly interested in the
mechanics of the game, I want to be able to view the base power, accuracy, and type of
each move.
• Online Trainers – 3 points – Iteration 2: As a user wanting to battle another user, I
want to be able to see which users are online.
• Trainer Wants to Fight! – 2 points – Iteration 2: As a user wanting to battle another
user, I want to send a challenge to another user who is online.
• Accept Challenge? – 3 points – Iteration 2: As a trainer who has received a challenge,
I want to have the option accept it, which triggers the battle beginning, or decline it, and
return to my business.
• Battle Scene – 2 points – Iteration 2: As a trainer starting a battle, I want to see an intro
animation to get me pumped up for the battle and then see the battlefield.•
•
•
•
•
•
I Choose You! – 3 points – Iteration 4: As a trainer who has just started a battle, I want
to be able to choose a Tokimon from my team to start the battle with, and then once my
opponent has done the same, I want to see both Tokimon on the screen.
Make a Move – 3 points – Iteration 3: As a trainer in a battle, I want to be able to select
a move on my currently active Tokimon, and once the opponent has done the same, I
want each Tokimon to lose the right amount of health.
Return! – 3 points – Iteration 3: As a trainer in a battle, I want to be able to select a
Tokimon to switch to instead of using a move. Once the opponent has selected their
move, I want my currently active Tokimon to switch.
Unable to Battle – 3 points – Iteration 3: As a trainer who has just knocked out my
opponent’s Tokimon by bringing its HP to 0, I want the opponent’s Tokimon to be unable
to battle, and the opponent to have to select a new Tokimon and be unable to switch to
the knocked out Tokimon.
Animations – 4 points – Iteration 3: As a trainer in a battle, I want to see animations
when Tokimon use moves.
We Have a Winner! – 2 Points – Iteration 3: As a trainer who knocked out all of my
opponent’s Tokimon, I want the screen to say that I won the battle.
User Interface Requirements
Teambuilder page concept. Similar to Pokémon Showdown. Users can select one of their
existing teams or create a new one.After selecting or creating a team, users will be directed to a page where they can add and
remove Tokimon from their team. The sprites used in the Pic category are just Pokémon sprites
in this mockup, but we’ll have our own original sprites. Names, stat numbers and moves are not
final.
Your Tokimon on TestTeam
Name
Pic
Fire Water Elec Fly Fight Ice HP Att Def Speed Move
1 Move
2 Move
3 Move
4 Erichu 23 48 88 50 65 76 55 70 30 85 Soar Zap Freeze Wave Del
from
team
Del
Steamo 79 71 55 39 30 51 80 33 90 37 Heat Burn Freeze Wave Del
Enorgy 78 67 78 12 19 68 45 91 31 88 Taste Zap Freeze Burn Del
Fire Water Elec Fly Fight Ice HP Att Def Speed Move
1 Move
2 Move
3 Move
4 Liono 80 12 33 20 55 34 80 70 30 71 Heat Zap Freeze Wave Add
to
team
Add
Seabie 10 71 30 90 31 55 80 42 80 60 Soar Kick Freeze Wave Add
Chana 85 44 78 34 5 10 66 90 31 22 Code Zap Teach Burn Add
Nodie 32 44 81 68 12 41 36 36 36 89 Soar Zap Freeze Burn Add
Thom 100 52 60 20 17 46 1 100 1 100 Soar Zap Code Burn Add
Leady 78 66 32 11 16 17 88 66 78 55 Heat Kick Freeze Wave Add
Penny 89 34 22 76 11 55 45 45 33 91 Roll Spin Kick Jump Add
Maptu 55 89 45 33 55 56 56 55 85 71 Soar Spin Freeze Wave Add
Skyte 88 10 77 77 10 12 78 66 45 78 Taste Kick Kick Burn Add
Available Tokimon
Name
Pic
Battle screen concept. Each player only sees their own screen, where they can choose to either
use a move or switch Tokimon. Similar to Pokémon games.
