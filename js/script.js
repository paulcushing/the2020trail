var game = {
  totalDays: 0,
  daysLeft: 25
};

var caravan = {
  party: [],
  food: 200,
  medicine: 5
  // this.wagonParts = 5;
}

var checkpoints = ["Fort Laramie", "the Big Blue River", "Fort Bridger", "the Snake River"];

function Character(name) {
  this.name = name;
  this.health = 100;
  this.diseases = 0;
}

Character.prototype.healthGain = function() {
  this.health += 20;
}

Character.prototype.healthLoss = function() { //daily health loss
  var starvingModifier = 1;
  var diseasedModifier = this.diseases * 2;
  if (caravan.food <= 0) {
    starvingModifier = 2;
  }

  this.health -= (5 + diseasedModifier) * starvingModifier;
}

Character.prototype.deathCheck = function(i) {
  // debugger;
  if(this.health<=0) {
    return true;
  }
}

function foodLoss() {
  caravan.food -= 2 * caravan.party.length;
  if (caravan.food <= 0) {
    caravan.food = 0;
    console.log("Out of food!");
  }
}

function checkDeath() {
  for(var i = 0; i < caravan.party.length; i++) {
    if(caravan.party[i].deathCheck(i)) {
      console.log(caravan.party[i].name + " has died. Sorry about it.");
      caravan.party.splice(i, 1);
      if (caravan.party.length <= 0) {
        console.log("Everyone in your party has died. The party is over.");
      }
      i--;
    }
  }
}

var trailPrompt = function(inputNumber) {
  switch (inputNumber) {
    case 1:
      travel("trail");
      break;
    case 2:
      rest();
      break;
    case 3:
      hunt();
      break;
    case 4:
      medicine();
      break;
  }
}

var fortPrompt = function(inputNumber) {
  switch (inputNumber) {
    case 1:
      travel("trail");
      break;
    case 2:
      rest();
      break;
    case 3:
      talk();
      break;
    case 4:
      medicine();
      break;
  }
}

var riverPrompt = function(inputNumber) {
  switch (inputNumber) {
    case 1:
      travel("river");
      break;
    case 2:
      rest();
      break;
    case 3:
      medicine();
      break;
  }
}

function fates(roll, rivOrTrail) {
  var charIndex = rollNumber(0,caravan.party.length);
  var more = "";

  if (rivOrTrail === "trail") {
    if (roll <= 7) {
      if (caravan.party[charIndex].diseases > 0){
        more = "nother";
      }
      $("#randomEventMessage").text(caravan.party[charIndex].name+" got a" + more + " disease!");
      caravan.party[charIndex].diseases += 1;
    } else if (roll<=14){
      $("#randomEventMessage").text(caravan.party[charIndex].name+" has broken their foot!");
      caravan.party[charIndex].health -= 50;
    } else if (roll<=21 && caravan.food > 0){
      $("#randomEventMessage").text(caravan.party[charIndex].name+" has dropped a lot of food!");
      caravan.food -= 50;
    } else if (roll >= 98) {
      caravan.food += 50;
      $("#randomEventMessage").text("Your caravan comes across a field of ripe berries");
    } else if (roll >= 95) {
      caravan.medicine += 1;
      $("#randomEventMessage").text("A traveling apothecary has gifted you 1 medicines");
    } else if (roll >= 90) {
      caravan.party.forEach(function (element) {
        element.healthGain();
      });
      $("#randomEventMessage").text("You find a hot spring! Your party feels more rested");
    } else {
      $("#trailHappen").text("You advance a day");
    }
  } else if (rivOrTrail === "river") {
    if (roll <= 1) {
      caravan.party[charIndex].health = 0;
      console.log(caravan.party[charIndex].name + " has drowned.");
    } else if (roll <= 4) {
      var amount = rollNumber(10, 31);
      caravan.food -= amount;
      console.log(caravan.party[charIndex].name + " dropped some food in the river.");
    } else if (roll <= 7) {
      caravan.party[charIndex].diseases += 1;
      console.log(caravan.party[charIndex].name + " has contracted a disease from the dirty river.");
    } else if (roll <= 10 && caravan.party.medicine > 0) {
      var amount = rollNumber(1, (caravan.party.medicine + 1));
      caravan.party.medicine -= amount;
      console.log(caravan.party[charIndex].name + " dropped " + amount + " medicines.")
    } else if (roll <= 12) {
      var amount = rollNumber(5, 16);
      caravan.party.forEach(function(element) {
        element.health -= amount;
      });
      console.log("The river was freezing cold! Everyone loses " + amount + " health.");
    } else {
      console.log("you've crossed the river")
      return;
    }
  } else {
    console.log("ERRORRR");
    return;
  }
}

function rollNumber(min, max) {
  min = Math.ceil(min);  //inclusive
  max = Math.floor(max); //exclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

function talk() {
  var talkRoll = rollNumber(0, 4);
  if(talkRoll === 0) {
    console.log("Howdy Yall! My name is Jeremy Yetternutter, I'm the town blacksmith. It's a pleasure making your aquaintance");
  }else if(talkRoll === 1) {
    console.log("Why Hello there! My name is Jebediah Yankles, I'm the Mayor in these here parts. It's a pleasure making your aquaintance");
  }else if(talkRoll === 2) {
    console.log("GIMME YA LOOTS YA DARN YANKIES");
  }else if(talkRoll === 3) {
    console.log("Pardon me, do yall have any spare change?");
  }else {
    console.log("talk function error");
  }
}

function gameChecker() {
  if (game.daysLeft === 0) {  //GAME OVER WIN
    var left = caravan.party.length;
    $("#trailHappen").text("WINNER! WINNER! WINNER! Only " + left + " of your party has survived.");
  } else if (game.daysLeft % 20 === 0) { //20 days from end (and multiples of 20)...fort
    $("#trailHappen").text("You've reached " + checkpoints[0] + "!");
    checkpoints.shift();
  } else if (game.daysLeft % 10 === 0) { //10 days from end (and multiples of 20)...river
    $("#trailHappen").text("You've reached " + checkpoints[0] + "!");
    checkpoints.shift();
  } else {
    console.log("go ahead and travel");
  }
}

function medicine() {
  if (caravan.medicine <= 0) {
    $("#trailHappen").text("You have 0 medicines.");
  } else {
    var index;
    var lowestHealth = 1000;
    caravan.party.forEach(function(element, i) {
      if (element.diseases > 0) {
        if (element.health < lowestHealth) {
          lowestHealth = element.health;
          index = i;
        } else {
          return;
        }
      } else {
        return;
      }
    });
    if (lowestHealth === 1000) {
      $("#trailHappen").text("No one is siiiick.");
    } else {
      caravan.party[index].diseases -= 1;
      caravan.medicine -= 1;
      $("#trailHappen").text(caravan.party[index].name + " has been healed 1 disease.");
    }
  }
  return;
}

function rest() {
  foodLoss();
  caravan.party.forEach(function (element) {
    element.healthGain();
  });
  $("#trailHappen").text("Your party decides to rest for the day ahead.");
  game.totalDays++;
}

function hunt() {
  var meatGained = rollNumber(1, 10);
  caravan.food += meatGained * caravan.party.length;
  $("#trailHappen").text("Everyone in your party gathered "+meatGained+" foods!");
  foodLoss();
  caravan.party.forEach(function (element) {
    element.healthLoss();
  });
  checkDeath();
  game.totalDays++;

}

function travel(rivOrTrail) {
  var roll = rollNumber(1,101);
  console.log(roll);
  fates(roll, rivOrTrail);
  foodLoss();
  caravan.party.forEach(function (element) {
    element.healthLoss();
  });
  checkDeath();
  game.totalDays++;
  game.daysLeft--;

}

var char1 = new Character("Ryan");
var char2 = new Character("Riley");
var char3 = new Character("Chris");
var char4 = new Character("Gloria");
var char5 = new Character("Megan");
caravan.party.push(char1, char2, char3, char4, char5);

//where things go to die
// function medicine() {
//   if (caravan.medicine <= 0){
//     console.log("You have 0 medicines.")
//   } else {
//     patientIndex = parseInt(prompt("Who to heal? 1-5?")) - 1;
//     if (caravan.party[patientIndex].diseases < 1) {
//       console.log(caravan.party[patientIndex].name + " is not sick! Psh.")
//     } else {
//       caravan.medicine -= 1;
//       caravan.party[patientIndex].diseases -= 1;
//       console.log("You have successfully removed a disease from " + caravan.party[patientIndex].name + "'s body.")
//     }
//   }
//   var prom = parseInt(prompt("1)Travel 2)Rest 3)Hunt 4)Heal"));
//   trailPrompt(prom);
// }

function updateStats() {
    $(".totalDays").text(game.totalDays);

    var nameString = "";
    caravan.party.forEach(function(member) {
      nameString += "<li>" + member.name + " || Health: " + member.health + "</li>";
    });

    $(".wagonMembers").html(nameString);
    $(".food").text(caravan.food);
    $(".medicine").text(caravan.medicine);
}

$(function() {
  $("form#createParty").submit(function(event) {
    event.preventDefault();

    var wagonLeader = $("#addLeader").val();
    var member1 = $("#addMember1").val();
    var member2 = $("#addMember2").val();
    var member3 = $("#addMember3").val();
    var member4 = $("#addMember4").val();

    console.log(wagonLeader);
    console.log(member1);
    console.log(member2);
    console.log(member3);
    console.log(member4);
  });

  $(".continueOnTrail").click(function() {
    $("#randomEventMessage").empty();
    travel("trail");

    gameChecker();
    console.log(game.daysLeft);
    updateStats();
  });

  $(".rest").click(function() {
    rest();
    updateStats();
  });

  $(".hunt").click(function() {
    hunt();
    updateStats();
  });

  $(".heal").click(function() {
    medicine();
    updateStats();
  });


})
