

var playerName = window.prompt("What is your CHAMPION's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(
  `${playerName} is ready to fight!
  he has ${playerHealth} health points 
  and packs a punch of ${playerAttack} megatons!`);

var enemyName = "Robort0";
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function(){
  window.alert("WELCOME to ROBOALERT Battle!");

  // ask player if they want to fight or skip battle
  var promptFight = window.prompt(`Would you FIGHT or SKIP this battle?
  enter FIGHT or SKIP to choose.`);

  //IF player chooses to fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
    //log the answer of the skip or fight
    console.log(`You have chosen to FIGHT this battle`);
    // Substract playerAttack form Enemy's health
    enemyHealth = enemyHealth - playerAttack
    // Log resulting Enemy's health
    console.log(`FIRST STRIKE:  ${playerName} Attacked!`)
    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(`${enemyName} has died`)
    } else {
      window.alert(`${enemyName}'s health is now ${enemyHealth}`)
    }
    
    // Substract enemyAttack from Player's health
    playerHealth = playerHealth - enemyAttack
    // Log resulting player's health
    console.log(`SECOND STRIKE: ${enemyName} Attacked!`)
    // check player's health
    if (playerHealth <= 0){
      window.alert(`${playerName} has died`)
    } else {
      window.alert(`${playerName}'s health is now ${playerHealth}`)
    }
  } // IF player chooses to skip the battle
  else if (promptFight === "skip" || promptFight === "SKIP") {
    window.alert(`${playerName} has chosen to SKIP this battle!`)
  } // IF player enters work answer 
  else {
    window.alert("Please choose a valid option");
  }
}

fight();