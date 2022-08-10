<?php

    namespace Pollio\SSR\PollVote\PollOptions;

    use Pollio\DataAccess\Models\Poll;

    function generatePollOptions(Poll $poll) {
        $pollOptions = "";

        foreach($poll->Options as $option) {
            $pollOptions .= "<div class=\"option\">$option->Name</div>";
            $pollOptions .= "<input type=\"radio\" value=\"$option->Color\" name=\"vote\" style=\"display: none;\">";
        }

        return $pollOptions;
    }
?>