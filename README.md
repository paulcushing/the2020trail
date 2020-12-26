# The 2020 Trail

#### The 2020 Trail Game

## Description

A re-imagining of the original Oregon Trail game as a trip through 2020. Users will travel encountering rests and riots along the way. Shop and rest to replenish supplies. Party members may perish on the journey, but as long as at least one survives to 2021, the user will win.

## Setup/Installation Instructions

- Clone portfolio respository from:
- Navigate to the2020trail directory
- Open index.html in a browser
- Enter party member names and click Start Game
- Enjoy!

## Specifications

|                                                       Behavior                                                        |            Input             |                                      Output                                      |
| :-------------------------------------------------------------------------------------------------------------------: | :--------------------------: | :------------------------------------------------------------------------------: |
|                                            Application returns player name                                            |           "Megan"            |                                   Name: Megan                                    |
|                                       Application returns multiple player names                                       | "Gloria, Ryan, Chris, Riley" |                        Name: [Gloria, Ryan, Chris, Riley]                        |
|                     Application assigns vaccines, toilet paper, and players to the caravan object                     |          "Caravan"           | Caravan = {Vaccines: 3, Toilet Paper: 100, Players: [Megan, Chris, .., .., .. ]} |
|                             Application assigns personal health to each individual player                             |           "Megan"            |                                   Health: 100                                    |
|                                               Application counts weeks                                                |           "Day 3"            |                           Caravan = {daysTraveled: 3}                            |
|                                         Toilet Paper decreases with each day                                          |           "Day 2"            |                                     Food: 98                                     |
|                         Application recognizes if caravan is at a checkpoint or on the trail                          |           "Trail"            |                                  Trail === true                                  |
|                               Application will run a random event roll (1-100) each day                               |           "Day 2"            |                                Random number: 32                                 |
|                   Application will modify players or supplies based on outcome of random event roll                   |             "32"             |                                   Broke a leg                                    |
| Application will run another random event roll (1-number of players) to determine which player to assign the event to |             "32"             |                                Riley broke a leg                                 |
|                                   Application will prompt the user with day options                                   |           "Day 2"            |                         shop, rest, or continue on trail                         |
|                           Application will prompt the user with options based on checkpoint                           |           "Day 5"            |                          rest, trade, continue on trail                          |
|                                   Application will recognize when players are sick                                    |           "Chris"            |                              Chris.isSick === true                               |
|                          Application will give user option to use vaccine to reverse illness                          |        "Use Vaccine"         |                              Chris.isSick === false                              |
|                      Application will decrease player health at a greater rate if player is sick                      |           "Chris"            |                    Chris.isSick === true, Health - 4 per day                     |
|                                    Application will increase health while resting                                     |            "Rest"            |                                Health + 5 per day                                |
|                              Application will not increase weeks travelled when resting                               |            "Rest"            |                                 Day 2 === Day 2                                  |
|                                      Application will decrease TP while resting                                       |            "Rest"            |                                 Food - 5 per day                                 |
|                             Application will increase TP by random number while shopping                              |            "Shop"            |                                    Food + 23                                     |
|                                    Application will decrease health while shopping                                    |            "Shop"            |                                Health - 3 per day                                |
|                           Application will decrease TP and health while continuing on trail                           |     "Continue on trail"      |                        TP - 5 per day, Health - 3 per day                        |
|                     Application will check health of each player to see if player is still alive                      |            "Ryan"            |                    Ryan.health === 0, Ryan.isAlive === false                     |
|                                   Application ends game when all players have died                                    |          "Players"           |                       All players health = 0 === Game Over                       |
|                                  Application recognizes last day as winning the game                                  |            "100"             |                                    You've won                                    |

## Known Bugs

No known issues.

## Support and contact details

Questions? Concerns? Suggestions?

Reach out to us via github: http://github.com/paulcushing

## License

This software is licensed under the MIT license.
