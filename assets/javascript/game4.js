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
$( document ).ready(function() {

var characterDiv = $(".character");
var stagingDiv = $(".staging");
var fighterDiv = $(".fighter");
var defenderDiv = $(".defender");
var enemyDiv = $(".enemy");
var alertDiv = $(".alert");

alertDiv.css("visibility", "hidden");


var stagingareaDiv = $("#stagingarea");
var fighterareaDiv = $("#fighterarea");
var statsareaDiv = $("#statsarea");
var defenderareaDiv = $("#defenderarea");
var enemyareaDiv = $("#enemyarea");
var attackBtnDiv = $("#attack-button");

var main = $("main");

var fighterSelected = false;
var enemySelected = false;
var defenderDefeated = false;

var currentFighter;
var currentDefender;
var $currentDiv;
var wins = 0;

$(".staging-text h2").text("Choose Your Fighter");

function Character(name, health, attack, counter) {
	this.name = name;
  this.healthPoints = health;
	this.currentHealth = health;
	this.healthPercent = 100;
  this.attackPower = attack;
	this.currentAttack = attack;
  this.counterAttackPower = counter;
	this.image = "assets/images/" + name + ".gif";
}

function displayCharacter(character) {
	var htmlElement = $("#" + character.name);
	htmlElement.find($(".name")).text(character.name);
	htmlElement.find($(".health")).text(character.currentHealth);
	htmlElement.find($(".gif")).attr("src", character.image);
}

function displayEnemy(character) {
	var htmlElement = $("#" + character.name);
	htmlElement.find($(".name")).text(character.name);
	htmlElement.find($(".health")).text(character.currentHealth);
	htmlElement.find($(".gif")).attr("src", character.image);
}

function displayFighter(fighter) {
	fighterDiv.find($(".name")).text(fighter.name);
	fighterDiv.find($(".health")).text(fighter.currentHealth);
	fighterDiv.find($(".gif")).attr("src", fighter.image);
}

function displayDefender(defender) {
	defenderDiv.find($(".name")).text(defender.name);
	defenderDiv.find($(".health")).text(defender.currentHealth);
	defenderDiv.find($(".gif")).attr("src", defender.image);
}

var characters = [
	new Character("Gimli", 150, 10, 25),
	new Character("Arwen", 140, 12, 30),
	new Character("Gothmog", 180, 8, 20),
	new Character("Lurtz", 160, 10, 30)
];

statsareaDiv.parent().hide();
fighterareaDiv.hide();
defenderareaDiv.hide();
enemyareaDiv.hide();

function newGame() {
	statsareaDiv.parent().hide();
	fighterareaDiv.hide();
	defenderareaDiv.hide();
	enemyareaDiv.hide();
}

// iterate over each of the first for character divs and add an id of their name
stagingDiv.each(function(i) {
	$(this).attr("id", characters[i].name);
});

// this function will populate the DOM elements for each the selected character object's name, image, and health
jQuery.each(characters, function(i, item){
	displayCharacter(item);
});

enemyDiv.each(function(i) {
	$(this).attr("id", characters[i].name + "Enemy");
});

function hideDiv() {

}

// Select Fighter
stagingDiv.on("click", function() {
	$currentDiv = $(this);
	if (!fighterSelected) {
		$.each(characters, function(i) {
			if (this.name === $currentDiv.attr("id")) {
				currentFighter = characters[i];
			}
		});
		$(".staging-text h2").empty();
		main.animate({"margin-top": "50px"},800);
		stagingareaDiv.hide();
		stagingDiv.each(function(i) {
			$(this).removeAttr("id");
		});
		displayFighter(currentFighter);
		fighterareaDiv.fadeIn();
		enemyDiv.each(function(i) {
			$(this).attr("id", characters[i].name);
		});
		$("#" + currentFighter.name).css("display", "none");
		jQuery.each(characters, function(i, item){
			displayEnemy(item);
		});
		enemyareaDiv.fadeIn(800);
		setTimeout(function() {
			$(".enemy-text h2").text("Choose Your Enemy");
		}, 500);

		fighterSelected = true;
	}
});

// Select Defender
enemyDiv.on("click", function() {
	$currentDiv = $(this);
	if (fighterSelected && !enemySelected) {
		if (wins === 0) {
			$.each(characters, function(i) {
				if (this.name === $currentDiv.attr("id")) {
					currentDefender = characters[i];
				}
			});
			$(".enemy-text h2").empty();
			statsareaDiv.parent().fadeIn();
			displayDefender(currentDefender);
			defenderareaDiv.fadeIn(800);
			$("#" + currentDefender.name).hide();
		}
	}
	else {
		$.each(characters, function(i) {
			if (this.name === $currentDiv.attr("id")) {
				currentDefender = characters[i];
			}
			displayDefender(currentDefender);
			$("#" + currentDefender.name).hide();
	});
}
});

function healthBar(character, div) {
	character.healthPercent = ((character.currentHealth / character.healthPoints) * 100);
	div.find(".progress-bar").css("width", character.healthPercent + "%");
	if (character.healthPercent < 20) {
		div.find(".progress-bar").removeClass("progress-bar-success").addClass("progress-bar-danger");
	}
}

function fighterAttack() {
	fighterDiv.toggleClass("hvr-wobble-fighter-hover");
	setTimeout(function() {
		fighterDiv.toggleClass("hvr-wobble-fighter-hover");
	}, 1000);
	currentDefender.currentHealth -= currentFighter.currentAttack;
	healthBar(currentDefender, defenderDiv);
	alertDiv.css("visibility","visible").find("h4").text("You hit " + currentDefender.name + " for " + currentFighter.currentAttack + " damage!");
	currentFighter.currentAttack += currentFighter.attackPower;
	attackBtnDiv.attr("disabled", "true");

	if (currentDefender.currentHealth <= 0) {
		wins++;
		setTimeout(function() {
			alertDiv.removeClass("alert-warning").addClass("alert-success").find("h4").text("You Win!");
		},1000);
		defenderDefeated = true;
		defenderareaDiv.fadeOut();
		setTimeout(function() {
			$(".enemy-text h2").text("Choose Your Enemy");
			alertDiv.css("visibility", "hidden");
		}, 500);
		return;
	}

	if (!defenderDefeated) {
		setTimeout(function() {
			defenderDiv.toggleClass("hvr-wobble-defender-hover");
			setTimeout(function() {
				defenderDiv.toggleClass("hvr-wobble-defender-hover");
			}, 1000);
			currentFighter.currentHealth -= currentDefender.counterAttackPower;
			healthBar(currentFighter, fighterDiv);
			alertDiv.css("visibility","visible").find("h4").text(currentDefender.name + " countered for " + currentDefender.counterAttackPower + " damage!");
				if (currentFighter.currentHealth <= 0) {
					alertDiv.show().removeClass("alert-warning").addClass("alert-danger").find("h4").text("You Lose!");
					return;
				}
				attackBtnDiv.removeAttr("disabled");

		}, 1000);

	}

}


$("#attack-button").on("click", function() {
	fighterAttack();
});

});
