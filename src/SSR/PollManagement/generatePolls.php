<?php

    namespace Pollio\SSR\PollMangement\Polls;

    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;

    function generatePolls(array $polls) {
        $pollElements = "";
        foreach($polls as $poll) {
            $pollElements .= generatePoll($poll);
        }
        return $pollElements;
    }

    function generatePoll(Poll $poll) {
        $pollInfo = generatePollInfo($poll);
        $pollView = generateView($poll);

        return "<div class=\"poll\"><div class=\"poll-info\">$pollInfo</div><div class=\"poll-view\" style=\"display: none;\">$pollView</div></div>";
    }

    function generatePollInfo(Poll $poll) {
        $pollDate = getCreatedDate($poll);
        return "<h3>$poll->Question</h3><h3>$pollDate</h3>";
    }

    function getCreatedDate(Poll $poll) {
        return date("d/m/y", $poll->CreatedDate);
    }

    function generateView(Poll $poll) {
        $pollView = "";

        $pollOptions = generateOptions($poll);
        $pollCreatedDate = getCreatedDate($poll);
        $pollButtons = generateButtons($poll);

        $pollView .= "<div class=\"options\">$pollOptions</div>";
        $pollView .= "<h3 class=\"mbl-date\">$pollCreatedDate</h3>";
        $pollView .= "<div class=\"btn-control\">$pollButtons</div>";

        return $pollView;
    }

    use function Pollio\Url\getBaseURL;
    function generateButtons(Poll $poll) {
        $baseURL = getBaseURL(true);

        return "<div class=\"btn-danger\">Delete</div><a class=\"btn-common\" href=\"{$baseURL}pollio/poll_vote?pollID=$poll->PollId\">Share</a><a class=\"btn-common\" href=\"{$baseURL}pollio/poll_results?pollID=$poll->PollId\">Results</a>";
    }

    function generateOptions(Poll $poll) {
        $pollOptions = "";

        $maxValue = -1;

        foreach($poll->Options as $option) {
            if ($option->Votes > $maxValue) {
                $maxValue = $option->Votes;
            }
        }

        foreach($poll->Options as $option) {
            $pollOptions .= "<h3>$option->Name</h3>";
            $pollBar = generatePollBar(
                intval($option->Votes/$maxValue*100), 
                $option->Color
            );
            $pollOptions .= "<div>$pollBar</div>";
            $pollOptions .= "<h3 class=\"last-item\">$option->Votes</h3>";
        }

        return $pollOptions;
    }

    function generatePollBar(int $size, int $color) {
        return "<div class=\"poll-bar\" style=\"--size: $size; background-color: var(--option-$color-color)\"></div>";
    }
?>