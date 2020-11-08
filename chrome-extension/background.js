var client = new XMLHttpRequest();
client.open('GET', '/CatFacts.txt');
client.onreadystatechange = function() {
    var facts_str = client.responseText;
    var facts = facts_str.split("\n");
	document.getElementById("CatFact").textContent = facts[Math.floor(Math.random() * (facts.length))];
}
client.send();