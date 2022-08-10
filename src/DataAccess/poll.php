<?php
    namespace Pollio\DataAccess\Models;
    
    class PollOption {
        public function __construct(
            public readonly int $votes,
            public readonly string $name,
            public readonly int $color = -1
        ) {
            $this->Votes = $votes;
            $this->Name = $name;
            $this->Color = $color;
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
            public readonly string  $question,
            public readonly array $options,
            public readonly int $createdDate = 0,
            public readonly int $pollid = -1
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