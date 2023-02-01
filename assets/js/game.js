

var playerName = window.prompt("What is your name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(
  `${playerName} is ready to fight!
  he has ${playerHealth} health points 
  and packs a punch of ${playerAttack} megatons!`);

var enemyName = "Robort0";
var enemyHealth = 50;
var enemyAttack = 120;


var fight = function(){
  window.alert("WELCOME to ROBOALERT Battle!");
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
  // check our robot's health
  if (playerHealth <= 0){
    window.alert(`${playerName} has died`)
  } else {
    window.alert(`${playerName}'s health is now ${playerHealth}`)
  }
}

fight();