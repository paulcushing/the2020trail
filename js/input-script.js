$(document).ready(function() {

    // Home Screen Inputs
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

  // Trail Screen and For Screen Inputs
  $(".continueOnTrail").click(function() {
    console.log("Continue on Trail click");

    var option = 1;
    console.log(option);
  });

  $(".rest").click(function() {
    console.log("Rest click");

    var option = 2;
    console.log(option);
  });

  $(".hunt").click(function() {
    console.log("Hunt click");

    var option = 3;
    console.log(option);
  });

});