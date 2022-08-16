<?php
    namespace Pollio\DataAccess\Models;

    class PollOption {
        public int $Votes;
        public string $Name;
        public int $Color;
        public int $PollOptionId;

        public function __construct(
            int $votes,
            string $name,
            int $color = -1,
            int $pollOptionId = -1
        ) {
            $this->Votes = $votes;
            $this->Name = $name;
            $this->Color = $color;
            $this->PollOptionId = $pollOptionId;
        }

        function toJson() {
            return "{
                \"value\": $this->votes,
                \"name\": \"$this->name\",
                \"color\": $this->Color,
            }";
        }
    };

    class Poll {
        public readonly string  $Question;
        public readonly array $Options;
        public readonly int $CreatedDate;
        public readonly int $PollId;

        public function __construct(
            string  $question,
            array $options,
            int $createdDate = 0,
            int $pollid = -1
        ) {
            $this->CreatedDate = $createdDate;
            $this->Question = $question;
            $this->Options = $options;
            $this->PollId = $pollid;
        }

        function toJson() {
            $optionsJSON = $this->getOptions(); 
            return "{
                \"question\": \"$this->question\",
                \"options\": $optionsJSON
            }";
        }

        function getOptions() {
            $optionStrings = array();

            foreach($this->Options as $option) {
                array_push($optionStrings, $option->toJson());
            }

            $optionsToString = join(",", $optionStrings);
            
            return "[$optionsToString]";
        }
    };
?>