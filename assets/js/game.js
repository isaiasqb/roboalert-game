// color variables, for console output text
var clr = '\x1B[31m' 
var endclr = '\x1B[0m'

var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min; 
  return value;
};

var getPlayerName = function() {
  var name = ""

  while (name === "" || name === null){
    name = prompt(`📋 What is your CHAMPION's name?📋 `)
  }
  console.log(`Your champion's name is ${name}`);
  return name
 }

// declare player's stats
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 20,
  money: 10,
  reset: function() {
    this.health = 100;
    this.attack = 20;
    this.money = 10;
  },
  refillHealth: function() {
    if(this.money >= 7) {
      this.health += 20;
      this.money -= 7;
      window.alert(`Your health has been refilled by 20 for 7 dollar points. Your health is now ${this.health}`);
    } else {
      window.alert(`Sorry, not enough money!`)
    }
  },
  upgradeAttack: function() {
    if (this.money >= 9) {
      this.attack += 8;
      this.money -= 9;
      window.alert(`You payed 9 dollar points to increase your attack by 8 megatons Your attack is now ${this.attack}`);
    } else {
      window.alert(`Sorry, not enough money!`)
    }
  }
};

// declare enemie's stats
var enemyInfo = [
  {name: "Robort0",       attack: randomNumber(10, 14)},
  {name: "Assassindr0id", attack: randomNumber(14, 18)},
  {name: "MegaMachine",   attack: randomNumber(18, 22)},
];



var fightOrSkip = function() {
  // ask player if they want to fight or skip battle
  var promptFight = window.prompt(`Would you FIGHT or SKIP this battle? Enter F or S to choose.`);
  var promptFight = promptFight.toLowerCase();
 
  //CONDITIONAL recursive
//  if(promptFight === "" || promptFight === null) {
//    window.alert(`Invalid Answer. Try Again`);
//    return fightOrSkip()
//  }
 
 // IF player chooses to skip the battle
 if (promptFight === "s") {
  // confirm to skip battle
  var confirmSkip = window.confirm(`Are you sure you want to SKIP the Battle?`);
    // if YES (true), leave fight
    if (confirmSkip) {
      playerInfo.money =  Math.max(0, playerInfo.money - 10);
      
      console.log(`----- ${playerInfo.name} wants to ${clr}SKIP${endclr} this battle! -----
      You haven been Penalized for skipping the battle. Your remaining Money is ${clr + playerInfo.money} coins`);
      
      //return true if player wants to leave
      return true;
    }
  } 
  else if (promptFight === "f") {
  console.log(`----- You chose to ${clr}FIGHT${endclr} this battle! -----`);
  }
  else {
    window.alert(`Invalid Answer. Try Again`);
    return fightOrSkip()
  }  
}


var fight = function(enemy){
  //keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  //Repeat and execute the fight function as long as the enemy is alive
  while (playerInfo.health > 0 &&  enemy.health > 0 ) {
    if (isPlayerTurn) {
              if (fightOrSkip()) {
                //if SKIP was true, break the loop and leave fight
                break;
              };
              
              // Player Attacks
              //generate a random attack power based on the player attack power
              var playerDamage = randomNumber(playerInfo.attack -5, playerInfo.attack);
              enemy.health = Math.max(0, enemy.health - playerDamage) //Math.max displays the largest number, preventing -0 values
              console.log(`${playerInfo.name} Attacked! ⚡ ${enemy.name}'s health is now ${enemy.health}`);
              
              // Check enemy's health
              if (enemy.health <= 0) {
                console.log(`Your Enemy, ${enemy.name} has been destroyed!`)
                //award player some money
                playerInfo.money = playerInfo.money + 20
                //leave while loop if player is dead
                break;
              }
    } //Player gets attacked first
    else {
              // Enemy Attacks
              //generate a random attack power based on the player attack power
              var enemyDamage = randomNumber(enemy.attack - 5, enemy.attack)
              playerInfo.health = Math.max(0, playerInfo.health - enemyDamage) //Math.max displays the largest number, preventing -0 values
              console.log(`${enemy.name} Attacked! 💥 ${playerInfo.name}'s health is now ${playerInfo.health}`);

              // check player's health
              if (playerInfo.health <= 0){
                console.log(`Your champion: ${playerInfo.name} has been destroyed!`)
                break;
              }
    } //END else if isPlayerTurn
    //shitch turn order for next round 
    isPlayerTurn = !isPlayerTurn;
  } //END while loop    
} //END fight() function
    
    

// START the game function
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    //individualize the name of every enemy
    var pickedEnemyObj = enemyInfo[i];
    //player still alive? keep fighting
    if (playerInfo.health > 0) {
      //reset the health of each enemy after each battle(loop)
      pickedEnemyObj.health = randomNumber(40,60)

      console.log(
        `///// WELCOME to ROBOALERT Battle! ⚔️ ROUND #${i + 1} ⚔️
        👾 ${clr + pickedEnemyObj.name + endclr} - (Health:${clr + pickedEnemyObj.health + endclr} Attack Power:${clr + pickedEnemyObj.attack + endclr}) Will Fight you!
        🦾 ${clr + playerInfo.name + endclr}, your champion (Health:${clr + playerInfo.health + endclr} Attack Power:${clr + playerInfo.attack + endclr} ) is ready!`);

        fight(pickedEnemyObj);

        //SHOP option if we are not at the last enemy at the array
        if (playerInfo.health > 0 && i < enemyInfo.length -1) {
          var storeConfirm = window.confirm(`This fight is over 🚨 Visit the store? ➡️💵`)
          if (storeConfirm) {
            shop();
          }
        }
      } else {
        console.log(`xxxxx Your Champion is Dead! ☠️ GAME OVER FOR YOU xxxxx`);
        break;
      }
    } //END for loop

    //if we have fought all enemies or our champion is dead run endGame()
    endGame()
  };



  //END function for ending the entire game
  var endGame = function(){
    //check localStorage for the highScore
    var highScore = localStorage.getItem("highscore");
    
    if (highScore === null) {
      highScore = 0;
    }

    //check if player beat the current highschore and can set a new highscore
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
      console.log(`${clr + playerInfo.name + endclr} now has the 👑 highest score 👑 with ${clr + playerInfo.money + endclr} RoboDollars!`);
    }
    else {
      console.log(`You did not beat the highscore of ${clr + highScore +endclr}`)
    }

    if(playerInfo.health > 0) {
      console.log(`That is the END of the GAME. GREAT, ${clr}you've survived!${endclr}`);
    }
    else {
        console.log(`xxxxx Your Champion is Dead! ☠️ GAME OVER FOR YOU xxxxx`);
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm(`Wanna play again?`);

    if (playAgainConfirm){
      startGame();
    }
    else {
      console.log(`Ok then. Thank you for playing! See you later? I guess`)
    }

  }

  var shop = function() {
// ask player what they'd like to do
    var shopOptionPrompt = window.prompt( `🏪 WELCOME to the STORE! 🏪
      Please enter the number of your purchase:
      1- REFILL-Health
      2- UPGRADE-Attack
      3- LEAVE the store`);

    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
      case 1:
        playerInfo.refillHealth()
        break;
      
      case 2:
        playerInfo.upgradeAttack()
        break;

      case 3:
        window.alert("You left the Store");
        break;
      
      default:
        window.alert(`You did not pick a valid option. try again`);
        shop();
        break;
      }
  }// END shop()

  startGame()
