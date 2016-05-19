function processFile(e) {
	console.log("in process file");
	var jsonFile = e.target.result, results;
	console.log("jsonfile " + jsonFile);
	if (jsonFile && jsonFile.length) {

		obj = JSON.parse(jsonFile);

		console.log("waterB Concept[0].Node" + obj.Concepts[0].Node
				+ " jsondata.length " + obj.Concepts.length);
		drawTree(obj.Concepts);
	}
}

function processWaterBjson() {
	d3.json("js/waterB.json", function(error, jsonData) {		
		if (error)
			return console.warn(error);
		console.log("waterB Concept[0].Node" + jsonData.Concepts[0].Node
				+ " jsondata.length " + jsonData.Concepts.length);
		drawTree(jsonData.Concepts);
	});
}

function drawTree(concepts) {
	d3.select("svg").remove();
	console.log("concepts length " + concepts.length);
	var nodes = {};

	var w = 700, h = 800;
	var svg = d3.select(".main").append("svg").attr("width", w).attr("height",
			h);

	// Compute the distinct nodes from the links.
	concepts.forEach(function(concept) {
		var sc = concept.Node;
		var tg = concept.ParentNode;
		if (tg == -1)
			tg = sc;

		// console.log("concepts sc is " + sc + " tg is " + tg);
		concept.source = nodes[sc] || (nodes[sc] = {
			name : sc,
			attributes : concept.attributes,
			objects : concept.objects
		});
		concept.target = nodes[tg] || (nodes[tg] = {
			name : tg,
			attributes : concept.attributes,
			objects : concept.objects
		});
	});

	var force = d3.layout.force().gravity(.05).charge(-200).size([ w, h ]);

	force.nodes(d3.values(nodes)).links(concepts).linkDistance(130).start();

	var link = svg.selectAll(".links").data(concepts).enter().append("line")
			.attr("stroke-width", 2).attr("class", "link");

	var node = svg.selectAll(".node").data(d3.values(nodes)).enter()
			.append("g").attr("class", "node").call(force.drag);

	node.append("rect").attr("width", 30).attr("height", 60).attr("ry", 8)
			.attr("rx", 8).attr("y", -15).attr("x", -5).attr("opacity", 0.9)
			.attr("fill", "cyan");

	node.append("text").attr("font-size", 10)

	.text(function(d) {
		return d.name;
	});

	if (document.getElementById('attributes').checked) {
		node.append("text").attr("font-size", 10).attr("transform",
				"translate(0, 12)").text(function(d) {
			return d.attributes.toString();
		}).attr("fill", "green");
	}
	;

	if (document.getElementById('objects').checked) {

		node.append("text").attr("font-size", 10).attr("transform",
				"translate(0, 22)").text(function(d) {
			return d.objects.toString();
		}).attr("fill", "red");
	}
	;

	force.on("tick", function() {
		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		node.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	});
}
