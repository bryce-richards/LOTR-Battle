$(document).ready(function() {

	var characterDiv = $(".character");
	var stagingDiv = $(".staging");
	var fighterDiv = $(".fighter");
	var defenderDiv = $(".defender");
	var enemyDiv = $(".enemy");
	var alertDiv = $(".alert");


	var stagingareaDiv = $("#stagingarea");
	var fighterareaDiv = $("#fighterarea");
	var statsareaDiv = $("#statsarea");
	var defenderareaDiv = $("#defenderarea");
	var enemyareaDiv = $("#enemyarea");
	var attackBtnDiv = $("#attack-button");
	var stagingtextDiv = $("#staging-text");
	var enemytextDiv = $("#enemy-text");
	var alerttextDiv = $("#alert-text");

	var main = $("main");

	function newGame() {



		var fighterSelected = false;
		var enemySelected = false;
		var defenderDefeated = false;

		var currentFighter;
		var currentDefender;
		var $currentDiv;
		var wins = 0;

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

		var characters = [
			new Character("Gimli", 150, 10, 16),
			new Character("Arwen", 140, 120, 18),
			new Character("Gothmog", 160, 11, 15),
			new Character("Lurtz", 170, 8, 15)
		];

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

		// Reset display
		fighterareaDiv.closest($(".col-md-offset-4")).remove("col-md-offset-4");
		stagingtextDiv.text("Choose Your Fighter");
		statsareaDiv.parent().hide();
		fighterareaDiv.hide();
		defenderareaDiv.hide();
		enemyareaDiv.hide();
		alertDiv.css("visibility", "hidden");


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


		// Select Fighter
		stagingDiv.on("click", function() {
			$currentDiv = $(this);
			if (!fighterSelected) {
				$.each(characters, function(i) {
					if (this.name === $currentDiv.attr("id")) {
						currentFighter = characters[i];
					}
				});
				stagingtextDiv.empty();
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
				enemytextDiv.text("Choose Your Enemy").parent().fadeIn();
				fighterSelected = true;
			}
		});

		// Select Defender
		enemyDiv.on("click", function() {
			$currentDiv = $(this);
			if (fighterSelected && !enemySelected) {
					$.each(characters, function(i) {
					if (this.name === $currentDiv.attr("id")) {
						currentDefender = characters[i];
					}
				});
				enemytextDiv.css("visiblity","hidden");
				alertDiv.css("visibility", "hidden");
				attackBtnDiv.removeAttr("disabled");
				statsareaDiv.parent().fadeIn();
				displayDefender(currentDefender);
				healthBar(currentDefender, defenderDiv);
				console.log(currentDefender.currentHealth);
				defenderareaDiv.fadeIn(800);
				$("#" + currentDefender.name).hide();
				enemytextDiv.text("Choose Your Enemy").parent().animate({opacity:0});
				enemySelected = true;
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
			alertDiv.removeClass("alert-info").addClass("alert-warning").css(
				"visibility","visible").find(alerttextDiv).text(currentFighter.name + " hit " + currentDefender.name + " for " + currentFighter.currentAttack + " damage!");
			currentFighter.currentAttack += currentFighter.attackPower;
			attackBtnDiv.attr("disabled", "true");

			// Win conditions
			if (currentDefender.currentHealth <= 0) {
				wins++;
				setTimeout(function() {
					alertDiv.removeClass("alert-warning").addClass("alert-info").find(alerttextDiv).text(currentDefender.name + " was defeated!");
				},1000);
				defenderDefeated = true;
				if (wins < (characters.length - 1)) {
					enemySelected = false;
					setTimeout(function() {
						defenderareaDiv.fadeOut();
						setTimeout(function() {
							statsareaDiv.parent().fadeOut();
								enemytextDiv.text("Choose Your Enemy").parent().animate({opacity:1});
						}, 1000);
					}, 1000);
					return;
				} else {
					setTimeout(function() {
						alertDiv.removeClass("alert-warning").addClass("alert-success").find(alerttextDiv).text(currentFighter.name + " has defeated all enemies!");
					},1000);
					setTimeout(function() {
						defenderareaDiv.fadeOut();
						statsareaDiv.fadeOut();
						fighterareaDiv.closest($(".col-md-4")).addClass("col-md-offset-4");
					}, 1000);

				}
			}

			if (!defenderDefeated) {
				setTimeout(function() {
					defenderDiv.toggleClass("hvr-wobble-defender-hover");
					setTimeout(function() {
						defenderDiv.toggleClass("hvr-wobble-defender-hover");
					}, 1000);
					currentFighter.currentHealth -= currentDefender.counterAttackPower;
					healthBar(currentFighter, fighterDiv);
					alertDiv.css("visibility","visible").find(alerttextDiv).text(currentDefender.name + " countered for " + currentDefender.counterAttackPower + " damage!");
						if (currentFighter.currentHealth <= 0) {
							alertDiv.show().removeClass("alert-warning").addClass("alert-danger").alertextDiv.text(currentFighter.name + " was defeated!");
							return;
						}
						attackBtnDiv.removeAttr("disabled");
				}, 1000);
			}
		}
		$("#attack-button").on("click", function() {
			fighterAttack();
		});
	}
newGame();

});
