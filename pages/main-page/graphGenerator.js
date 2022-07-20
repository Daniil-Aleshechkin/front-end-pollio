import { polls } from "./input";
import { createElementWithText, getCSSVariable, shuffle } from "../../public/helpers";

const SEGMENT_UNDER_OFFSET = 2;

let currentGraph = 0;
let graphs = polls;

defineGraphColors(graphs);
console.log(graphs)
updateMainGraph(graphs[currentGraph]);
updateGraphSidebar(graphs.filter((_, index) => index !== 0));


function defineGraphColors(graphs) {
    graphs.forEach(graph => {
        let colors = Array.from(Array(graph.options.length).keys())
        shuffle(colors);

        graph.options.forEach((option,index) =>
            option.color = colors[index]+1
        )
    });
}

function updateMainGraph(graph) {
    let mainGraph = document.getElementsByClassName("main-graph-display")[0];

    //Replace title
    mainGraph.children[0].replaceChildren(document.createTextNode(graph.question));
    
    //Replace main graph
    mainGraph.children[1].replaceChildren(...createGraphSegments(graph.options));

    //Replace legend
    mainGraph.children[2].replaceChildren(...createLegendElements(graph.options))
}

function createLegendElements(options) {
    let legendElements = [];

    options.forEach((option) => {
            let legendElement = createElementWithText("p", option.name);
            legendElement.style.setProperty("--legend-color", getCSSVariable(`option-${option.color}-color`))
            legendElements.push(legendElement);
        }
    )
    console.log(legendElements);
    return legendElements;
}

function createGraphSegments(options) {
    if (options.length === 1) {
        return [createSegment(360, 0, options[0].color)]
    }

    let segments = [];
    
    let total = options.reduce((sum, currentOption) =>
        sum += currentOption.value
    , 0);

    let currentFilledGraph = 0;

    options.forEach((option, index) => {
        let value = Math.floor(Math.round(option.value/total*360)) + ((index === options.length -1) ? SEGMENT_UNDER_OFFSET : 0) + ((index !== 0) ? SEGMENT_UNDER_OFFSET : 0);

        let offset = (index === 0) ? 0 : (currentFilledGraph -  SEGMENT_UNDER_OFFSET);

        segments.push(createSegment(value, offset, option.color));

        currentFilledGraph += value - ((index !== 0) ? SEGMENT_UNDER_OFFSET : 0);
    });

    return segments
}

function createSegment(value, offset, num) {
    let segment = document.createElement("div");

    segment.className="graph-segment";

    segment.style.setProperty("--start",offset);
    segment.style.setProperty("--value",value);
    segment.style.setProperty("--is-over-50-percent", (value >= 180) ? 1 : 0);
    segment.style.setProperty("--color", getCSSVariable(`option-${num}-color`));
    segment.style.setProperty("z-index", num);
    segment.style.setProperty("overflow", (value >= 180) ? "visible" : "hidden");

    return segment;
}

function updateGraphSidebar (graphs) {
    let graphSidebar = document.getElementsByClassName("graph-side-bar")[0];

    Array.from(graphSidebar.children).forEach((domGraph, index) => {
        domGraph.replaceChildren(...createGraphSegments(graphs[index].options));
        domGraph.id = `graph-${index+1}`;
        domGraph.addEventListener("click", onGraphSideBarClick);    
    }
    );
}

function onGraphSideBarClick(e)  {
    let triggeredGraph = e.currentTarget;

    let triggeredGraphId = triggeredGraph.id;
    let triggeredGraphIndex = triggeredGraphId.slice(triggeredGraphId.length - 1);

    updateMainGraph(graphs[triggeredGraphIndex]);

    triggeredGraph.replaceChildren(...createGraphSegments(graphs[currentGraph].options));
    triggeredGraph.id = `graph-${currentGraph}`;

    currentGraph = triggeredGraphIndex;
}