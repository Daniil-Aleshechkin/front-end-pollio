import { createElementWithText, getCSSVariable, getBaseURL} from "../../public/helpers";

const SEGMENT_UNDER_OFFSET = 2;

let currentGraph = 0;

//defineGraphColors(graphs);
//updateMainGraph(graphs[currentGraph]);
//updateGraphSidebar(graphs.filter((_, index) => index !== 0));

function updateGraphData(newGraphData) {
    let existingPolls = []

    for (let i = 0; i < graphs.length; i++) {
        existingPolls.push(graphs[i].PollId)
    }

    existingPolls.sort();
    let deletingElements = [];
    let addingPolls = [];
    while (existingPolls.length > 0) {
        if(existingPolls[existingPolls.length-1] != newGraphData[existingPolls.length-1].PollId){
            deletingElements.push(existingPolls[0]);
            addingPolls.push(newGraphData[existingPolls.length-1]);
            existingPolls.shift();
        } else {
            graphs[existingPolls.length-1].Options.forEach((option,i)=> {
                option.Votes = newGraphData[existingPolls.length-1].Options[i].Votes
            })
            existingPolls.pop();
        }
    }
    
    for (let i = 0; i < graphs.length; i++) {
        if (graphs[i].PollId in deletingElements) {
            graphs[i] = addingPolls[0];
            addingPolls.shift();
        }
    }
}

function updateGraphs() {
    for (let i = 0; i < graphs.length; i++) {
        try {
            document.getElementById(`graph-${i}`).replaceChildren(...createGraphSegments(graphs[i].Options))
        } catch {
            updateMainGraph(graphs[i], false);
        }
    }
}

function getGraphData() {
    var xhttp = new XMLHttpRequest();
    let topGraphs = [];
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            topGraphs = JSON.parse(this.responseText);

            updateGraphData(topGraphs);
            updateGraphs();
        }
    };
    xhttp.open("GET", getBaseURL()+ "api/getPolls.php", true);
    xhttp.send();
    return topGraphs;
}
setInterval(getGraphData, 10000);

function updateMainGraph(graph, animate) {
    let mainGraph = document.getElementsByClassName("main-graph-display")[0];

    //Replace title
    mainGraph.children[0].replaceChildren(document.createTextNode(graph.Question));
    
    //Replace main graph
    mainGraph.children[1].replaceChildren(...createGraphSegments(graph.Options, animate));

    //Replace legend
    mainGraph.children[2].replaceChildren(...createLegendElements(graph.Options))
}

function createLegendElements(options) {
    let legendElements = [];

    options.forEach((option) => {
            let legendElement = createElementWithText("p", option.Name);
            legendElement.style.setProperty("--legend-color", getCSSVariable(`option-${option.Color}-color`))
            legendElements.push(legendElement);
        }
    )

    return legendElements;
}

function createGraphSegments(options, animate=false) {
    if (options.length === 1) {
        return [createSegment(180, 0, options[0].Color, 1, animate),
                createSegment(180, 180, options[0].Color, 1, animate)]
    }

    let segments = [];
    
    let total = options.reduce((sum, currentOption) =>
        sum += currentOption.Votes
    , 0);

    if (total == 0) {
        total = 1;
    }

    let currentFilledGraph = 0;

    options.forEach((option, index) => {
        let value = Math.floor(Math.round(option.Votes/total*360)) + ((index === options.length -1) ? SEGMENT_UNDER_OFFSET : 0) + ((index !== 0) ? SEGMENT_UNDER_OFFSET : 0);
        if (option.Votes == 0) {
            return;
        }
        //console.log(option, value);
        let offset = (index === 0) ? 0 : (currentFilledGraph -  SEGMENT_UNDER_OFFSET);

        if (value >= 180) {
            segments.push(createSegment(
                180,
                offset,
                option.Color,
                options.length-index,
                animate
            ));
            segments.push(createSegment(
                value-180+SEGMENT_UNDER_OFFSET,
                offset+180-SEGMENT_UNDER_OFFSET,
                option.Color,
                options.length-index,
                animate
            ));
        } else {
            segments.push(createSegment(
                value,
                offset,
                option.Color,
                options.length-index,
                animate
            ));
        }

        currentFilledGraph += value - ((index !== 0) ? SEGMENT_UNDER_OFFSET : 0);
    });

    return segments
}

function createSegment(value, offset, color, num, animate) {
    let segment = document.createElement("div");

    segment.className="graph-segment";

    segment.style.setProperty("--start",offset);
    segment.style.setProperty("--value",value);
    segment.style.setProperty("--is-over-50-percent", (value > 180) ? 1 : 0);
    segment.style.setProperty("--color", getCSSVariable(`option-${color}-color`));
    segment.style.setProperty("z-index", num);
    segment.style.setProperty("overflow", (value > 180) ? "visible" : "hidden");
    if (!animate)
        segment.classList.add("no-animate");

    return segment;
}

Array.from(document.getElementsByClassName("graph-side-bar")[0].children).forEach(graph =>
    graph.addEventListener("click", onGraphSideBarClick)
)

function onGraphSideBarClick(e)  {
    let triggeredGraph = e.currentTarget;

    let triggeredGraphId = triggeredGraph.id;
    let triggeredGraphIndex = triggeredGraphId.slice(triggeredGraphId.length - 1);

    updateMainGraph(graphs[triggeredGraphIndex], true);
    triggeredGraph.replaceChildren(...createGraphSegments(graphs[currentGraph].Options, false));
    triggeredGraph.id = `graph-${currentGraph}`;

    currentGraph = triggeredGraphIndex;
}