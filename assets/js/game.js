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
var enemyAttack = 20;

var fight = function(enemyName){
  //Repeat and execute the fight function as long as the enemy is alive
  while (playerHealth > 0 &&  enemyHealth > 0 ) {  
    // ask player if they want to fight or skip battle
    var promptFight = window.prompt(`Would you FIGHT or SKIP this battle? Enter F or S to choose.`);
    
    // IF player chooses to skip the battle
    if (promptFight === "S" || promptFight === "s") {
      // confirm to skip battle
      var confirmSkip = window.confirm(`Are you sure you want to SKIP the Battle?`);
      // if YES (true), leave fight
      if (confirmSkip) {
        playerMoney = playerMoney - 10;
        console.log(`***----- ${playerName} has chosen to SKIP this battle! -----***
        You haven been Penalized for skipping the battle. Your remaining Money is ${clr}${playerMoney} coins `)
        break
      } 
    } //IF player chooses to fight
     else if (promptFight === "F" || promptFight === "f") {
      //log the answer of the skip or fight
      console.log(`***----- You chose to ${clr}FIGHT${endclr} this battle! -----***`);
      } 
    
    // Player Attacks
    enemyHealth = enemyHealth - playerAttack
    console.log(`${playerName} Attacked! ${enemyName}'s health is now ${enemyHealth}`)
    // Check enemy's health
    if (enemyHealth <= 0) {
      console.log(`Your Enemy, ${enemyName} has been destroyed!`)
      //award player some money
      playerMoney = playerMoney + 20
      break;
    }

    // Substract enemyAttack from Player's health
    playerHealth = playerHealth - enemyAttack
    console.log(`${enemyName} Attacked! ${playerName}'s health is now ${playerHealth}`)
    // check player's health
    if (playerHealth <= 0){
      console.log(`Your champion: ${playerName} has been destroyed!`)
      break
    }
  } //END wuile loop
} //END fight() function
    
    

// START the game function
var startGame = function() {
  // reset player stats
  var playerHealth = 100;
  var playerAttack = 20;
  var playerMoney = 10;

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyNames.length; i++) {
    //individualize the name of every enemy
    var pickedEnemyName = enemyNames[i];
    //player still alive? keep fighting
    if (playerHealth > 0) {
      console.log(
        `WELCOME to ROBOALERT Battle!
        ROUND #${i + 1} /////  ${pickedEnemyName} has ENTERED THE BATTLEGROUND
        ${clr}${playerName}${endclr} is ready to fight!
        he has ${clr}${playerHealth}${endclr} health points 
        and packs a punch of ${clr}${playerAttack} megatons!${endclr}`);
        
        //reset the health of each enemy after each battle(loop)
        enemyHealth = 60
        fight(pickedEnemyName);

        //SHOP option if we are not at the last enemy at the array
        if (playerHealth > 0 && i < enemyNames.length -1) {
          var storeConfirm = window.confirm(`The fight is over, visit the store?`)
          if (storeConfirm) {
            shop();
          }
        }
      } else {
        console.log(`xxxxx Your Champion is Dead! GAME OVER FOR YOU xxxxx`);
        break;
      }
    } //END for loop

    //if we have fought all enemies or our champion is dead run endGame()
    endGame()
  };



  //END function for ending the entire game
  var endGame = function(){
    if(playerHealth > 0) {
      console.log(`GREAT, ${clr}you've survived!${endclr}. ${playerName} has ${playerMoney} bucks in the bank`)
    }
    else {
      console.log(`Your champion was DESTROYED!`)
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm(`Wanna play again?`);

    if (playAgainConfirm){
      startGame();
    }
    else {
      window.alert(`Ok then. Thank you for playing! See yu later? I guess`)
    }

  }

  var shop = function() {
// ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
      "Would you like to buy any of these kits? REFILL-Health, UPGRADE-Attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
      case "REFILL":
      case "refill":
        if (playerMoney >= 7) {
          window.alert(`Your health has been refilled by 20 for 7 dollar points. Your health is now ${playerHealth}`);
          playerHealth = playerHealth + 20;
          playerMoney = playerMoney - 7;
        } else {
          window.alert(`Sorry, not enough money!`)
        }
        break;
      
      case "UPGRADE":
      case "upgrade":
        if (playerMoney >= 7) {
          window.alert(`You payed 7 dollar points to increase your attack by 6 megatons Your attack is now ${playerAttack}`);
          playerAttack = playerAttack + 6;
          playerMoney = playerMoney - 7;
        } else {
          window.alert(`Sorry, not enough money!`)
        }
        break;

      case "LEAVE":
      case "leave":
        window.alert("You left the Store");
        break;
      
      default:
        window.alert(`You did not pick a valid option. try again`);
        shop();
        break;
      }
  }// END shop()

  startGame()
