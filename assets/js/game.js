// color variables, for console output text
var clr = '\x1B[31m' 
var endclr = '\x1B[0m'

// declare player's stats
var playerName = window.prompt("What is your CHAMPION's name?");
var playerHealth = 100;
var playerAttack = 20;
var playerMoney = 10;

// declare enemie's stats
var enemyNames = ["Robort0", "Assassindr0id", "MegaMachine"];
var enemyHealth = 60;
var enemyAttack = 10;

console.log(
  `"WELCOME to ROBOALERT Battle!"
  
  ${clr}${playerName}${endclr} is ready to fight!
  he has ${clr}${playerHealth}${endclr} health points 
  and packs a punch of ${clr}${playerAttack} megatons!${endclr}`);

var fight = function(enemyName){
  
  //Repeat and execute the fight function as long as the enemy is alive
  while (playerHealth > 0 &&  enemyHealth > 0 ) {  
    // ask player if they want to fight or skip battle
    var promptFight = window.prompt(`Would you FIGHT or SKIP this battle?
    enter F or S to choose.`);

    //IF player chooses to fight
    if (promptFight === "F" || promptFight === "f") {
      //log the answer of the skip or fight
      console.log(`***----- You chose to ${clr}FIGHT${endclr} this battle! -----***`);

      // Substract playerAttack form Enemy's health
      enemyHealth = enemyHealth - playerAttack
      // check enemy's health
      if (enemyHealth <= 0) {
        console.log(`Your Enemy, ${enemyName} has been destroyed!`)
        break
      } else {
        console.log(`${playerName} Attacked! ${enemyName}'s health is now ${enemyHealth}`)
      }
      
      // Substract enemyAttack from Player's health
      playerHealth = playerHealth - enemyAttack
      // check player's health
      if (playerHealth <= 0){
        console.log(`Your champion: ${playerName} has been destroyed! - health is down to ${playerHealth}`)
        break
      } else {
        console.log(`${enemyName} Attacked! ${playerName}'s health is now ${playerHealth}`)
      }

    } // IF player chooses to skip the battle
    else if (promptFight === "S" || promptFight === "s") {
      // confirm to skip battle
      var confirmSkip = window.confirm(`Are you sure you want to SKIP the Battle?`);
        // if YES (true), leave fight
        if (confirmSkip) {
          playerMoney = playerMoney - 10;
          console.log(`***----- ${playerName} has chosen to SKIP this battle! -----***
          You haven been Penalized for skipping the battle. Your remaining Money is ${clr}${playerMoney} coins `)
          break
        } // if NO (false), ask question again. Run fight()
        else {
          fight()
        }

    } // IF player enters work answer 
    else {
      window.alert("Please choose a valid option");
    }
  }
}

for(i = 0; i < enemyNames.length; i++) {
  //individualize the name of every enemy
  var pickedEnemyName = enemyNames[i];
  //reset the health of each enemy after each battle(loop)
  enemyHealth = 60
  console.log(`${pickedEnemyName} has ENTERED THE BATTLEGROUND`)
  fight(pickedEnemyName);
}