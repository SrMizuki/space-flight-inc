var player = {
  money: 500,
  spaceship: 1,
  location: 3,
  status: 0,
  travellingTo: 3,
  travelTime: 0
};

var statuses = ["Docked", "Travelling"];

var planets = [
  { name: "Space", distance: -1 },
  { name: "Mercury", distance: 0 },
  { name: "Venus", distance: 2 },
  { name: "Earth", distance: 4 },
  { name: "Mars", distance: 6 },
  { name: "Jupiter", distance: 13 },
  { name: "Saturn", distance: 26 },
  { name: "Uranus", distance: 40 },
  { name: "Neptune", distance: 53 },
  { name: "Pluto", distance: 66 }
];

var spaceships = [
  { name: "Cessna Spc-Rocket", timeMultiplier: 1, capacity: 5, price: 250 },
  { name: "Airbus A9000", timeMultiplier: 0.75, capacity: 100, price: 3500 }
];

function updateStats() {
  document.getElementById("money").innerHTML = player.money;
  document.getElementById("spaceship").innerHTML =
    spaceships[player.spaceship].name;
  document.getElementById("passengerCapacity").innerHTML =
    spaceships[player.spaceship].capacity;
  document.getElementById("speed").innerHTML =
    spaceships[player.spaceship].timeMultiplier + "sec/Dunit";
  document.getElementById("location").innerHTML = planets[player.location].name;
  document.getElementById("status").innerHTML = statuses[player.status];
}

function updateDestinations() {
  planets.forEach(function(item, index) {
    if (planets[index].distance !== -1 && index !== player.location) {
      var distance = Math.abs(
        planets[player.location].distance - planets[index].distance
      );

      // destination name
      var container = document.createElement("div");
      var node = document.createElement("p");
      var textNode = document.createTextNode(planets[index].name);
      node.appendChild(textNode);

      //document.getElementById("destinations").appendChild(node);
      container.appendChild(node);

      // destination distance
      node = document.createElement("p");
      textNode = document.createTextNode("Distance: " + distance + " Dunits");
      node.appendChild(textNode);

      //document.getElementById("destinations").appendChild(node);
      container.appendChild(node);

      // travel to destination button
      if (distance !== 0) {
        node = document.createElement("button");
        textNode = document.createTextNode("Travel here");
        node.appendChild(textNode);

        node.addEventListener("click", function() {
          travelTo(index, distance);
        });

        //document.getElementById("destinations").appendChild(node);
        container.appendChild(node);
      }
      document.getElementById("destinations").appendChild(container);
    }
  });

  function travelTo(i, d) {
    player.location = 0;
    player.status = 1;
    player.travellingTo = i;
    //player.travelTime = d * spaceships[player.spaceship].timeMultiplier;

    updateStats();
    startTravelCountdown(
      Math.floor(d * spaceships[player.spaceship].timeMultiplier),
      i
    );
    clearDestinations();
  }

  function startTravelCountdown(travelTime, l) {
    document.getElementById("travelling").innerHTML =
      travelTime + " seconds left to arrive at " + planets[l].name;

    var timeLeft = setInterval(function() {
      travelTime--;
      document.getElementById("travelling").innerHTML =
        travelTime + " seconds left to arrive at " + planets[l].name;
      if (travelTime <= 0) {
        clearInterval(timeLeft);
        player.location = l;
        player.status = 0;
        document.getElementById("travelling").innerHTML = "";
        updateStats();
        updateDestinations();
      }
    }, 1000);
  }

  function clearDestinations() {
    document.getElementById("destinations").innerHTML = "";
  }
}

(function() {
  updateStats();
  updateDestinations();
})();
