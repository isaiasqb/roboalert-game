// color variables, for console output text
var clr = '\x1B[31m' 
var endclr = '\x1B[0m'

var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min; 
  return value;
};


// declare player's stats
var playerInfo = {
  name: window.prompt("What is your CHAMPION's name?"),
  health: 100,
  attack: 20,
  money: 10,
};

// declare enemie's stats
var enemyInfo = [
  {name: "Robort0",       attack: randomNumber(10, 14)},
  {name: "Assassindr0id", attack: randomNumber(14, 18)},
  {name: "MegaMachine",   attack: randomNumber(18, 22)},
];



var fight = function(enemy){
  //Repeat and execute the fight function as long as the enemy is alive
  while (playerInfo.health > 0 &&  enemy.health > 0 ) {  
    // ask player if they want to fight or skip battle
    var promptFight = window.prompt(`Would you FIGHT or SKIP this battle? Enter F or S to choose.`);
    
    // IF player chooses to skip the battle
    if (promptFight === "S" || promptFight === "s") {
      // confirm to skip battle
      var confirmSkip = window.confirm(`Are you sure you want to SKIP the Battle?`);
      // if YES (true), leave fight
      if (confirmSkip) {
        playerInfo.money =  Math.max(0, playerInfo.money - 10);
        console.log(`***----- ${playerInfo.name} has chosen to SKIP this battle! -----***
        You haven been Penalized for skipping the battle. Your remaining Money is ${clr}${playerInfo.money} coins `)
        break
      } 
    } //IF player chooses to fight
     else if (promptFight === "F" || promptFight === "f") {
      //log the answer of the skip or fight
      console.log(`***----- You chose to ${clr}FIGHT${endclr} this battle! -----***`);
      } 
    
    // Player Attacks
    //generate a random attack power based on the player attack power
    var playerDamage = randomNumber(playerInfo.attack -5, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - playerDamage) //Math.max displays the largest number, preventing -0 values
    console.log(`${playerInfo.name} Attacked! ${enemy.name}'s health is now ${enemy.health}`)
    
    // Check enemy's health
    if (enemy.health <= 0) {
      console.log(`Your Enemy, ${enemy.name} has been destroyed!`)
      //award player some money
      playerInfo.money = playerInfo.money + 20
      break;
    }

    // Enemy Attacks
    //generate a random attack power based on the player attack power
    var enemyDamage = randomNumber(enemy.attack - 5, enemy.attack)
    playerInfo.health = Math.max(0, playerInfo.health - enemyDamage) //Math.max displays the largest number, preventing -0 values
    console.log(`${enemy.name} Attacked! ${playerInfo.name}'s health is now ${playerInfo.health}`)

    // check player's health
    if (playerInfo.health <= 0){
      console.log(`Your champion: ${playerInfo.name} has been destroyed!`)
      break
    }
  } //END wuile loop
} //END fight() function
    
    

// START the game function
var startGame = function() {
  // reset player stats
  playerInfo.health = 100;
  playerInfo.attack = 20;
  playerInfo.money = 10;

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    //individualize the name of every enemy
    var pickedEnemyObj = enemyInfo[i];
    //player still alive? keep fighting
    if (playerInfo.health > 0) {
      //reset the health of each enemy after each battle(loop)
      pickedEnemyObj.health = randomNumber(40,60)

      console.log(
        `WELCOME to ROBOALERT Battle!
        ROUND #${i + 1} /////  ${pickedEnemyObj.name} has ENTERED THE BATTLEGROUND with ${clr}${pickedEnemyObj.health}${endclr} health points and ${clr}${pickedEnemyObj.attack}${endclr} attack power!  
        ${clr}${playerInfo.name}${endclr} is ready to fight!
        packing a punch of ${clr}${playerInfo.attack} megatons!${endclr}`);
        

        fight(pickedEnemyObj);

        //SHOP option if we are not at the last enemy at the array
        if (playerInfo.health > 0 && i < enemyInfo.length -1) {
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
    if(playerInfo.health > 0) {
      console.log(`GREAT, ${clr}you've survived!${endclr}. ${playerInfo.name} has ${playerInfo.money} bucks in the bank`)
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
      window.alert(`Ok then. Thank you for playing! See you later? I guess`)
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
        if (playerInfo.money >= 7) {
          playerInfo.health = playerInfo.health + 20;
          playerInfo.money = playerInfo.money - 7;
          window.alert(`Your health has been refilled by 20 for 7 dollar points. Your health is now ${playerInfo.health}`);
        } else {
          window.alert(`Sorry, not enough money!`)
        }
        break;
      
      case "UPGRADE":
      case "upgrade":
        if (playerInfo.money >= 7) {
          playerInfo.attack = playerInfo.attack + 6;
          playerInfo.money = playerInfo.money - 7;
          window.alert(`You payed 7 dollar points to increase your attack by 6 megatons Your attack is now ${playerInfo.attack}`);
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
