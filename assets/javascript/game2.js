/*
The player will keep hitting the attack button in an effort to defeat their opponent.

When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.

The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

Game design notes:

Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.

Each time the player attacks, their character's Attack Power increases by its base Attack Power.

For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
The enemy character only has Counter Attack Power.
Unlike the player's Attack Points, Counter Attack Power never changes.

The Health Points, Attack Power and Counter Attack Power of each character must differ.

No characters in the game can heal or recover Health Points.
A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.

Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
*/

$(document).ready(function() {

var fighterSelectd = false;
var enemySelected = false;
var defenderDefeated = false;

var characterStats = [
  new Character("Gimli", 150, 10, 45),
  new Character("Arwen", 140, 12, 50),
  new Character("Gothmog", 180, 5, 30),
  new Character("Lurtz", 160, 10, 40)
];

// var fighterDiv = $("<div>");
// var defenderDiv = $("<div>");

var characters = {};

function Character(name, health, attack, counter) {
  this.name = name;
  this.healthPoints = health;
  this.attackPower = attack;
  this.counterAttackPower = counter;
}

for (var i = 0; i < characterStats.length; i++) {
  characters[i] = new Character(characterStats[i][0],characterStats[i][1],characterStats[i][2],characterStats[i][3]);
}

console.log(characters[0]);

$(".character").on("click", function(){
  console.log(this);
  $("#fighterarea").append(this);
  for (var j = 0; j < characters.length; j++) {
    if (this.name == characters[i].name) {
      console.log(this);
      fighterDiv = this.contents();
      $("#fighterarea").append(figherDiv);
    }
  }
});






});
