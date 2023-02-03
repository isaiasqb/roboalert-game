// color variables, for console output text
var clr = '\x1B[31m' 
var endclr = '\x1B[0m'

var playerName = window.prompt("What is your CHAMPION's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Robort0", "MegaMachine", "RoboAssassin"];
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function(enemyName){
  window.alert("WELCOME to ROBOALERT Battle!");
  // ask player if they want to fight or skip battle
  var promptFight = window.prompt(`Would you FIGHT or SKIP this battle?
  enter FIGHT or SKIP to choose.`);
  
  console.log(
  `${clr}${playerName}${endclr} is ready to fight!
  he has ${clr}${playerHealth}${endclr} health points 
  and packs a punch of ${clr}${playerAttack} megatons!${endclr}`);
  
  //print the names of the enemies
  for (i = 0; i < enemyNames.length; i++){
  console.log(`Enemy #${i+1} is ${enemyNames[i]}`)
  }

  //IF player chooses to fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
    //log the answer of the skip or fight
    console.log(`You chose to ${clr}FIGHT${endclr} this battle!`);
    // Substract playerAttack form Enemy's health
    enemyHealth = enemyHealth - playerAttack
    // Log resulting Enemy's health
    console.log(`YOU STRIKE: ${playerName} Attacked!`)
    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(`${enemyName} has died`)
    } else {
      window.alert(`${enemyName}'s health is now ${enemyHealth}`)
    }
    
    // Substract enemyAttack from Player's health
    playerHealth = playerHealth - enemyAttack
    // Log resulting player's health
    console.log(`ENEMY STRIKES: ${enemyName} Attacked!`)
    // check player's health
    if (playerHealth <= 0){
      window.alert(`${playerName} has died`)
    } else {
      window.alert(`${playerName}'s health is now ${playerHealth}`)
    }

  } // IF player chooses to skip the battle
  else if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm to skip battle
    var confirmSkip = window.confirm(`Are you sure you want to SKIP the Battle?`);
      // if YES (true), leave fight
      if (confirmSkip) {
        playerMoney = playerMoney - 2
        window.alert(`${playerName} has chosen to SKIP this battle!`)
        console.log(`You haven been Penalized for skipping the battle. Your remaining Money is ${clr}${playerMoney} coins `)
      } // if NO (false), ask question again. Run fight()
      else {
        fight()
      }
      
  } // IF player enters work answer 
  else {
    window.alert("Please choose a valid option");
  }
}

for(var i = 0; i < enemyNames.length; i++) {
  fight(enemyNames[i]);
}

