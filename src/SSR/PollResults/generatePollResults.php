<?php

    namespace Pollio\SSR\PollResults\PollOptions;

    use Pollio\DataAccess\Models\Poll;
    use Pollio\DataAccess\Models\PollOption;

    use function Pollio\Url\getBaseURL;

    function getUserNavItems() {
        $baseURL = getBaseURL(true);
        $username = $_SESSION['Username'];

        if ($_SESSION['UserId'] != null) {
            return "<a href=\"{$baseURL}pollio/poll_management\" class=\"user-welcome\">Welcome, $username</a><a href=\"{$baseURL}pollio/poll_creation\" class=\"create-btn\"><div>Create</div><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z\"/></svg></a>";
        } else {
            return "";
        }
    }

    function generatePollOptions(Poll $poll) {
        $pollOptions = "";
        
        $maxVotes = -1;

        foreach($poll->Options as $option) {
            if ($option->Votes > $maxVotes) {
                $maxVotes = $option->Votes;
            }
        }

        foreach($poll->Options as $option) {
            if ($maxVotes == 0) {
                $pollOptions .= generatePollOption($option, 1, 100);
            } else {
                $size = intval($option->Votes/$maxVotes*100);
                $pollOptions .= generatePollOption($option, $maxVotes, $size);
            }
        }
        
        return $pollOptions;
    }

    function generatePollOption(PollOption $option, $maxVotes, $size) {
        if ($size == 0) {
            $size = 1;
        }

        $voteCount = ($size > 10) ? "<p>$option->Votes</p>" : "<p style=\"display: none;\">$option->Votes</p>";
        $outsideVoteCount = ($size <= 10) ? "<p>$option->Votes</p>" : "<p style=\"display: none;\">$option->Votes</p>";
        $pollBar = generatePollBar($size, $option->Color, $voteCount);
        $pollOptionTitle = "<h3>$option->Name</h3>";

        return "<div class=\"option\"><div>$outsideVoteCount $pollBar</div>$pollOptionTitle</div>";
    }

    function generatePollBar(int $size, int $color, string $voteCount) {
        return "<div class=\"poll-bar\" style=\"--size: $size; background-color: var(--option-$color-color)\">$voteCount</div>";
    }

?>