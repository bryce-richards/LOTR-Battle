// jQuery shortcuts
var stagingDiv = $(".staging");
var fighterDiv = $(".fighter");
var defenderDiv = $(".defender");
var enemyDiv = $(".enemy");
var alertDiv = $(".alert");
var progressbarDiv = $(".progress-bar");
var healthDiv = $(".health");

var stagingareaDiv = $("#stagingarea");
var fighterareaDiv = $("#fighterarea");
var statsareaDiv = $("#statsarea");
var defenderareaDiv = $("#defenderarea");
var enemyareaDiv = $("#enemyarea");
var attackBtnDiv = $("#attack-button");
var stagingtextDiv = $("#staging-text");
var enemytextDiv = $("#enemy-text");
var alerttextDiv = $("#alert-text");
var victorytextDiv = $("#victory-text");

var main = $("main");

var currentGame;
var currentDefender;
var currentFighter;

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

var lotrCharacters = [
	new Character("Gimli", 120, 10, 25),
	new Character("Arwen", 140, 8, 20),
	new Character("Gothmog", 160, 6, 15),
	new Character("Lurtz", 180, 4, 10)
];
	
function Game(array) {
	this.characters = array;
	this.fighterSelected = false;
	this.enemySelected = false;
	this.defenderDefeated = false;
	this.wins = 0;
}

function resetDisplay() {
	fighterareaDiv.closest($(".col-md-offset-4")).removeClass("col-md-offset-4",1000);
	fighterareaDiv.parent().addClass("col-md-offset-3", 1000);
	fighterareaDiv.hide();
	fighterDiv.removeClass("fighter-pic-defeat");
	stagingareaDiv.show();
	stagingtextDiv.parent().fadeIn(1000);
	victorytextDiv.parent().hide();
	stagingtextDiv.text("Choose Your Fighter");
	statsareaDiv.hide();
	defenderareaDiv.hide();
	enemyareaDiv.hide();
	enemyDiv.css("visibility", "visible");
	enemytextDiv.css("visibility", "hidden");
	alertDiv.css("visibility", "hidden");
	defenderDiv.removeClass("hvr-wobble-defender-hover");
	fighterDiv.removeClass("hvr-wobble-fighter-hover");
	main.css("margin-top", "120px");
}

function newGame() {
	var clonedArray = JSON.parse(JSON.stringify(lotrCharacters));
	currentGame = new Game(clonedArray);
	resetDisplay();
	// iterate over each of the first for character divs and add an id of their name
	enemyDiv.each(function(i) {
		$(this).removeAttr("id");
		$(this).show();
	});

	stagingDiv.each(function(i) {
		$(this).attr("id", currentGame.characters[i].name);
	});

	// this function will populate the DOM elements for each the selected character object's name, image, and health
	$.each(currentGame.characters, function(i, item){
		displayCharacter(item);
	});
}

function displayCharacter(character) {
	var htmlElement = $("#" + character.name);
	htmlElement.find($(".name")).text(character.name);
	htmlElement.find($(".gif")).attr("src", character.image);
	htmlElement.find($(".health")).text(character.currentHealth);
}

function displayEnemy(enemy) {
	var htmlElement = $("#" + enemy.name);
	htmlElement.find($(".name")).text(enemy.name);
	htmlElement.find($(".health")).text(enemy.currentHealth);
	htmlElement.find($(".gif")).attr("src", enemy.image);
}

function displayFighter(fighter) {
	fighterDiv.find(progressbarDiv).removeClass("progress-bar-danger").addClass("progress-bar-success");
	fighterDiv.find($(".name")).text(fighter.name);
	fighterDiv.find($(".health")).text(fighter.currentHealth);
	fighterDiv.find($(".gif")).attr("src", fighter.image);
}

function displayDefender(defender) {
	defenderDiv.find(progressbarDiv).removeClass("progress-bar-danger").addClass("progress-bar-success");
	defenderDiv.find($(".name")).text(defender.name);
	defenderDiv.find($(".health")).text(defender.currentHealth);
	defenderDiv.find($(".gif")).attr("src", defender.image);
}

function healthBar(character, div) {
	character.healthPercent = ((character.currentHealth / character.healthPoints) * 100);
	div.find(progressbarDiv).css("width", character.healthPercent + "%");
	if (character.healthPercent < 20) {
		div.find(progressbarDiv).removeClass("progress-bar-success").addClass("progress-bar-danger");
	}
	if (character.currentHealth <= 0) {
		div.find(healthDiv).text("0");
	} else {
		div.find(healthDiv).text(character.currentHealth);
	}
}

function newFighter(fighter) {
	$.each(currentGame.characters, function(i) {
		if (this.name === fighter.attr("id")) {
			currentFighter = currentGame.characters[i];
		}
	});
	stagingtextDiv.empty();
	main.animate({"margin-top": "50px"}, 800);
	stagingareaDiv.hide();
	stagingDiv.each(function(i) {
		$(this).removeAttr("id");
	});
	displayFighter(currentFighter);
	healthBar(currentFighter, fighterDiv);
	fighterareaDiv.fadeIn();
	enemyDiv.each(function(i) {
		$(this).attr("id", currentGame.characters[i].name);
	});
	$("#" + currentFighter.name).css("visibility", "hidden");
	$.each(currentGame.characters, function(i, item){
		displayEnemy(item);
	});
	enemyareaDiv.fadeIn(800);
	enemytextDiv.css("visibility", "visible").text("Choose Your Enemy").parent().animate({opacity:1});
	currentGame.fighterSelected = true;
}

// Select Fighter
stagingDiv.on("click", function() {
	if (!currentGame.fighterSelected) {
		var $currentDiv = $(this);
		newFighter($currentDiv);
	}
});

function newDefender(defender) {
	$.each(currentGame.characters, function(i) {
		if (this.name === defender.attr("id")) {
			currentDefender = currentGame.characters[i];
			defender.hide();
		}
	});
	enemytextDiv.css("visiblity","hidden");
	alertDiv.css("visibility", "hidden");
	attackBtnDiv.removeAttr("disabled");
	statsareaDiv.fadeIn(1000);
	displayDefender(currentDefender);
	healthBar(currentDefender, defenderDiv);
	defenderareaDiv.fadeIn(1000);
	enemytextDiv.text("Choose Your Enemy").parent().animate({opacity:0});
	currentGame.enemySelected = true;
}

// Select Defender
enemyDiv.on("click", function() {
	if (currentGame.fighterSelected && !currentGame.enemySelected) {
		$currentDiv = $(this);
		newDefender($(this));
	}
});


function fighterAttack() {
	fighterDiv.addClass("hvr-wobble-fighter-hover");
	setTimeout(function() {
		fighterDiv.removeClass("hvr-wobble-fighter-hover");
	}, 1000);
	currentDefender.currentHealth -= currentFighter.currentAttack;
	healthBar(currentDefender, defenderDiv);
	alertDiv.removeClass("alert-info").addClass("alert-warning").css(
		"visibility","visible").find(alerttextDiv).text(currentFighter.name + " hit " + currentDefender.name + " for " + currentFighter.currentAttack + " damage!");
	currentFighter.currentAttack += currentFighter.attackPower;
	attackBtnDiv.attr("disabled", "true");
	// Win conditions
	if (currentDefender.currentHealth <= 0) {
		currentGame.wins++;
		setTimeout(function() {
			alertDiv.removeClass("alert-warning").addClass("alert-info").find(alerttextDiv).text(currentDefender.name + " was defeated!");
		},1000);
		currentGame.defenderDefeated = true;
		if (currentGame.wins < 3) {
			currentGame.enemySelected = false;
			setTimeout(function() {
				defenderareaDiv.fadeOut();
				setTimeout(function() {
					statsareaDiv.fadeOut();
					enemytextDiv.text("Choose Your Enemy").parent().animate({opacity:1});
				}, 1000);
			}, 1000);
			return;
		} else if (currentGame.wins === 3) {
			setTimeout(function() {
				alertDiv.removeClass("alert-warning").addClass("alert-success").find(alerttextDiv).text(currentFighter.name + " has defeated all enemies!");
				setTimeout(function() {
					defenderareaDiv.fadeOut();
					statsareaDiv.fadeOut();
					setTimeout(function() {
						enemytextDiv.parent().animate({opacity:0});
						fighterareaDiv.closest($(".col-md-4")).addClass("col-md-offset-4",1000);
						victorytextDiv.text("Victory!").parent().fadeIn(1000);
					}, 1000);
				}, 1000);
			},1000);
			return;
		}
	}
	if (!currentGame.defenderDefeated) {
		setTimeout(function() {
			defenderDiv.addClass("hvr-wobble-defender-hover");
			setTimeout(function() {
				defenderDiv.removeClass("hvr-wobble-defender-hover");
				attackBtnDiv.removeAttr("disabled");
			}, 1000);
			currentFighter.currentHealth -= currentDefender.counterAttackPower;
			healthBar(currentFighter, fighterDiv);
			alertDiv.css("visibility","visible").find(alerttextDiv).text(currentDefender.name + " countered for " + currentDefender.counterAttackPower + " damage!");
			setTimeout(function() {
				if (currentFighter.currentHealth <= 0) {
					setTimeout(function() {
						defenderareaDiv.fadeOut();
						statsareaDiv.fadeOut();
						enemyDiv.fadeOut();
						setTimeout(function() {
							fighterareaDiv.closest($(".col-md-4")).addClass("col-md-offset-4",1000);
							victorytextDiv.text(currentFighter.name + " was defeated!").parent().fadeIn(1000);
							fighterDiv.addClass("fighter-pic-defeat", 1000);
						}, 1000);
					}, 1000);
				}
			}, 1000);	
		}, 1000);
	}
}

$("#attack-button").on("click", function() {
	currentGame.defenderDefeated = false;
	fighterAttack();
});

newGame();