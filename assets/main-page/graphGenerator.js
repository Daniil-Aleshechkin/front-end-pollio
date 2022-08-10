import { createElementWithText, getCSSVariable} from "../../public/helpers";

const SEGMENT_UNDER_OFFSET = 2;

let currentGraph = 0;

//defineGraphColors(graphs);
//updateMainGraph(graphs[currentGraph]);
//updateGraphSidebar(graphs.filter((_, index) => index !== 0));

function updateMainGraph(graph) {
    let mainGraph = document.getElementsByClassName("main-graph-display")[0];

    //Replace title
    mainGraph.children[0].replaceChildren(document.createTextNode(graph.question));
    
    //Replace main graph
    mainGraph.children[1].replaceChildren(...createGraphSegments(graph.options, true));

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

    return legendElements;
}

function createGraphSegments(options, animate=false) {
    if (options.length === 1) {
        return [createSegment(180, 0, options[0].color, 1, animate),
                createSegment(180, 180, options[0].color, 1, animate)]
    }

    let segments = [];
    
    let total = options.reduce((sum, currentOption) =>
        sum += currentOption.value
    , 0);

    let currentFilledGraph = 0;

    options.forEach((option, index) => {
        let value = Math.floor(Math.round(option.value/total*360)) + ((index === options.length -1) ? SEGMENT_UNDER_OFFSET : 0) + ((index !== 0) ? SEGMENT_UNDER_OFFSET : 0);

        let offset = (index === 0) ? 0 : (currentFilledGraph -  SEGMENT_UNDER_OFFSET);

        if (value >= 180) {
            segments.push(createSegment(
                180,
                offset,
                option.color,
                options.length-index,
                animate
            ));
            segments.push(createSegment(
                value-180+SEGMENT_UNDER_OFFSET,
                offset+180-SEGMENT_UNDER_OFFSET,
                option.color,
                options.length-index,
                animate
            ));
        } else {
            segments.push(createSegment(
                value,
                offset,
                option.color,
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

    updateMainGraph(graphs[triggeredGraphIndex]);
    triggeredGraph.replaceChildren(...createGraphSegments(graphs[currentGraph].options, false));
    triggeredGraph.id = `graph-${currentGraph}`;

    currentGraph = triggeredGraphIndex;
}