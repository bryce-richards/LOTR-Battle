/*
The player will keep hitting the attack button in an effort to defeat their opponent.

When the defender"s HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.

The player wins the game by defeating all enemy characters. The player loses the game the game if their character"s HP falls to zero or below.

Game design notes:

Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.

Each time the player attacks, their character"s Attack Power increases by its base Attack Power.

For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
The enemy character only has Counter Attack Power.
Unlike the player"s Attack Points, Counter Attack Power never changes.

The Health Points, Attack Power and Counter Attack Power of each character must differ.

No characters in the game can heal or recover Health Points.
A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.

Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
*/

// $(document).ready(function() {
// $( "span" ).each(function(i, item){
//
// 	switch (i) {
// 		case 0:
// 			$(this).text("150");
// 			break;
// 		case 1:
// 		 $(this).text("140");
// 			break;
// 		default:
//
// 	}

function attack(fighter) {

}

function Character(name, health, attack, counter) {
	this.name = name;
  this.healthPoints = health;
	this.currentHealth = health;
	this.healthPercentage = ((this.currentHealth / this.healthPoints) * 100);
  this.attackPower = attack;
	this.currentAttack = attack;
  this.counterAttackPower = counter;
	this.image = "assets/images/" + name + ".gif";
}

var characterDiv = $(".character");
var stagingDiv = $(".staging");
var fighterDiv = $(".fighter");
var defenderDiv = $(".defender");
var enemyDiv = $(".enemy");

var fighterSelected = false;
var enemySelected = false;
var defenderDefeated = false;


var characters = [
	new Character("Gimli", 150, 10, 45),
	new Character("Arwen", 140, 12, 50),
	new Character("Gothmog", 180, 8, 30),
	new Character("Lurtz", 160, 10, 40)
];

// iterate over each of the first for character divs and add an id of their name
stagingDiv.each(function(i) {
	$(this).attr("id", characters[i].name);
});

// this function will populate the DOM elements for each the selected character object's name, image, and health
function displayCharacter(character) {
	var htmlElement = $("#" + character.name);
	htmlElement.find($(".name")).text(character.name);
	htmlElement.find($(".gif")).attr("src", character.image);
	htmlElement.find($(".health")).text(character.currentHealth);
}

jQuery.each(characters, function(i, item){
	displayCharacter(item);
});
console.log(fighterDiv);
// function fighterAttack () {
// 	fighterDiv.addClass("hvr-wobble");
// 	fighterDiv.trigger("click");
// 	fighterDiv.removeAttr("id", "hvr-wobble");
// }

function fighterHit() {

	fighterDiv.toggleClass("hvr-wobble-fighter-hover");
	setTimeout(function() {
		fighterDiv.toggleClass("hvr-wobble-fighter-hover");
	}, 800);
}

function defenderCounter() {
	defenderDiv.toggleClass("hvr-wobble-defender-hover");
	setTimeout(function() {
		defenderDiv.toggleClass("hvr-wobble-defender-hover");
	}, 800);
}

$("#attack-button").on("click", function() {
	fighterHit();

	defenderCounter();
});

// for (var j = 0; j < characters.length; j++) {
// 		displayCharacter(characters[j]);
// 		console.log(characters[j]);
// }

	// characters[i].htmlElement.find($(".name")).text(characters[i].name);
	// characters[i].htmlElement.find($(".photo")).html(characters[i].image);
	// characters[i].htmlElement.find($(".health")).text(characters[i].health);

// var fighterDiv = $("<div>");
// var defenderDiv = $("<div>");


//
// $(".character").on("click", function() {
// 	if (!fighterSelected) {
// 		var $currentCharacter = $(this);
// 	  var data = $currentCharacter.data();
// 	  console.log(data);
// 		fighterSelected = true;
// 	}
//
// 	if (fighterSelected)




  //$currentCharacter.find(".health").text(data.health);
  // $("#output").html(
  // 		"<h1>Name: " + characterData.name +"</h1>" +
  //     	"<h2>Attack: " + characterData.attack +"</h2>"
  // );

  // var healthOriginal = data.health;
  // var healthCurrent = data.health - 100;
  // var healthPercent = ((1-(healthCurrent / healthOriginal)) * 100);
  // $currentCharacter.find("img").css({filter:"grayscale("+ healthPercent + "%"});

console.log(healthPercent);

var healthPercent = 100;
var healthBar = find(".progress-bar");

$(".fighter .progress-bar").css("width", + healthPercent + "%");

$(".fighter").on("click", function() {
	healthPercent = 15;
	if (healthPercent < 20) {
		$(this).find(".progress-bar").removeClass("progress-bar-success").addClass("progress-bar-danger");
		$(this).find(".progress-bar").css("width", + healthPercent + "%");
		console.log(healthPercent);
	}
});
// $(".character").on("click", function(){
//   console.log(this);
//   $("#fighterarea").append(this);
//   for (var j = 0; j < characters.length; j++) {
//     if (this.name == characters[i].name) {
//       console.log(this);
//       fighterDiv = this.contents();
//       $("#fighterarea").append(figherDiv);
//     }
//   }
