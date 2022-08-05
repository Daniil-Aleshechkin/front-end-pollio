<?php

    namespace Pollio\SSR\PollResults\PollOptions;

    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;

    function generatePollOptions(Poll $poll) {
        $pollOptions = "";
        
        $maxVotes = -1;

        foreach($poll->Options as $option) {
            if ($option->Votes > $maxVotes) {
                $maxVotes = $option->Votes;
            }
        }

        foreach($poll->Options as $option) {
            $pollOptions .= generatePollOption($option, $maxVotes);
        }
        
        return $pollOptions;
    }

    function generatePollOption(PollOption $option, $maxVotes) {
        $size = intval($option->Votes/$maxVotes*100);
        $voteCount = "<p>$option->Votes</p>";
        $outsideVoteCount = ($size <= 5) ? $voteCount : "";
        $pollBar = generatePollBar($size, $option->Color, ($size <= 5) ? "" : $voteCount);
        $pollOptionTitle = "<h3>$option->Name</h3>";

        return "<div class=\"option\"><div>$outsideVoteCount $pollBar</div>$pollOptionTitle</div>";
    }

    function generatePollBar(int $size, int $color, string $voteCount) {
        return "<div class=\"poll-bar\" style=\"--size: $size; background-color: var(--option-$color-color)\">$voteCount</div>";
    }

?>