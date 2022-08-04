<?php
    namespace Pollio\SSR\MainPage\Graph;

    use Pollio\DataAccess\Models\Poll;

    define("SEGMENT_UNDER_OFFSET", 2);

    class GraphSegment {
        public int $Value;
        public int $Color;
        public int $Offset;
        public int $ZIndex;

        public function __construct(
            int $value,
            int $color,
            int $offset,
            int $ZIndex
        )
        {
            $this->Value = $value;
            $this->Color = $color;
            $this->Offset = $offset;
            $this->ZIndex = $ZIndex;
        }
    }

    function generateGraphSegments(Poll $graph, bool $noAnimate) {
        $segments = "";
        $total = 0;

        foreach($graph->Options as $index=>$option){
            $total = $total + $option->Votes;
        }
        
        $currentFilledGraph = 0;
        foreach($graph->Options as $index=>$option) {
            $segment = new GraphSegment(0, 0, 0, 0);
            
            $segment->Value = intval(round($option->Votes/$total*360)) 
                    + (($index === count($graph->Options) - 1 ? SEGMENT_UNDER_OFFSET : 0)) 
                    + (($index !== 0 ? SEGMENT_UNDER_OFFSET : 0));
            
            $segment->ZIndex = count($graph->Options) - $index;
            
            $segment->Offset = $index === 0 ? 0 : ($currentFilledGraph - SEGMENT_UNDER_OFFSET);

            $segment->Color = $option->Color;

            $currentFilledGraph += $segment->Value 
                    - ($index !== 0 ? SEGMENT_UNDER_OFFSET : 0);

            if ($segment->Value >= 180) {
                $segments .= createGraphSegment(new GraphSegment(
                    180,
                    $segment->Color,
                    $segment->Offset,
                    $segment->ZIndex
                ), $noAnimate);

                $segment->Value += -180 + SEGMENT_UNDER_OFFSET;
                $segment->Offset += 180 - SEGMENT_UNDER_OFFSET;
                $segments .= createGraphSegment($segment, $noAnimate);
            } else {
                $segments .= createGraphSegment($segment, $noAnimate);
            }
        }

        return $segments;
    }

    function createGraphSegment(GraphSegment $segment, bool $noAnimate) {
        $styles = getGraphStyles($segment);
        $classes = ($noAnimate) ? "no-animate" : "";
        return "<div class=\"graph-segment $classes\" style=\"$styles\"> </div>";
    }

    function getGraphStyles(GraphSegment $segment) {
        $overflow = ($segment->Value > 180 ? "visible" : "hidden");
        $isOver50Percent = $segment->Value > 180 ? 1 : 0;

        return "--start: $segment->Offset; --value: $segment->Value; --color: var(--option-$segment->Color-color); --is-over-50-percent: $isOver50Percent; z-index: $segment->ZIndex; overflow: $overflow";
    }
?>