<?php
    namespace Pollio\DataAccess\Models;
    
    class PollOption {
        public function __construct(
            public readonly int $votes,
            public readonly string $name
        ) {
            $this->Votes = $votes;
            $this->Name = $name;
            $this->Color = -1;
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
        public string  $Question;
        public readonly array $Options;

        public function __construct(
            public readonly string  $question,
            public readonly array $options
        ) {
            
            $this->Question = $question;
            $this->Options = $options;
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