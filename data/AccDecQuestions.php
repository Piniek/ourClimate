<?php

    class AccDecQuestion implements JsonSerializable
    {
        /** @var int unique id */
        private $id;
        
        /** @var varchar question title */
        private $title;
        
        /** @var varchar question text */
        private $text;
        
        /** @var boolean provided answer status */
        private $provided_answer;
        
        /** @var int accepted response foreign ID */
        private $acceptID;
        
        /** @var int declined response foreign ID */
        private $declineID;
        
        /** @var character string question type */
        private $type;
        
        /** @var character string question threshold */
        private $threshold;
        
        /** @var character string question location */
        private $location;
        
        /** @var character string accept result */
        private $accept_result;
        
        /** @var character string decline result */
        private $decline_result;
        
        /**
         * Question constructor.
         */
        public function __construct( $_id, $_title, $_text, $_provided_answer, $_acceptID, $_declineID, $_type, $_threshold, $_location, $_accept_result, $_decline_result )
        {
            $this->id         = $_id;
            $this->title      = $_title;
            $this->text    = $_text;
            $this->provided_answer = $_provided_answer;
            $this->acceptID = $_acceptID;
            $this->declineID = $_declineID;
            $this->type = $_type;
            $this->threshold = $_threshold;
            $this->location = $_location;
            $this->accept_result = $_accept_result;
            $this->decline_result = $_decline_result;
        }
        
        /**
        * @return int
        */
        public function getId()
        {
            return $this->id;
        }
        
        /**
        * @param int $id
        */
        public function setId( $id )
        {
            $this->id = $id;
        }
        
        /** 
        * @return string $title
        */
        public function getTitle()
        {
            return $this->title;   
        }
        
        /**
        * @param string $title
        */
        public function setTitle( $title )
        {
            $this->title = $title;   
        }
        
        /**
        * @return string $text
        */
        public function getText()
        {
            return $this->text;
        }
        
        /**
        * @param string $text
        */
        public function setText( $text )
        {
            $this->text = $text;   
        }
        
        /**
        * @return boolean $provided_answer
        */
        public function getProvidedAnswer()
        {
            return $this->provided_answer;   
        }
        
        /**
        * @param boolean $provided_answer
        */
        public function setProvidedAnswer( $provided_answer )
        {
            $this->provided_answer = $provided_answer;   
        }
        
        /**
        * @return int $acceptID
        */
        public function getAcceptId()
        {
            return $this->acceptID;
        }
        
        /**
        * @param int $acceptID
        */
        public function setAcceptId( $acceptID )
        {
            $this->acceptID = $acceptID;
        }
        
        /**
        * @return int $declineID
        */
        public function getDeclineId()
        {
            return $this->declineID;
        }
        
        /**
        * @param int $declineID
        */
        public function setDeclineId( $declineID )
        {
            $this->declineID = $declineID;
        }
        
        /**
        * @return string $type
        */
        public function getType()
        {
            return $this->type;   
        }
        
        /**
        * @param string $type
        */
        public function setType( $type )
        {
            $this->type = $type;   
        }
        
        /**
        * @return string $threshold
        */
        public function getThreshold()
        {
            return $this->threshold;   
        }
        
        /**
        * @param string $threshold
        */
        public function setThreshold( $threshold )
        {
            $this->threshold = $threshold;   
        }
        
        /**
        * @return string $location
        */
        public function getLocation()
        {
            return $this->location;   
        }
        
        /**
        * @param string $location
        */
        public function setLocation( $location )
        {
            $this->location = $location;   
        }
        
        /**
        * @return string $accept_result
        */
        public function getAcceptResult()
        {
            return $this->accept_result;   
        }
        
        /**
        * @param string $accept_result
        */
        public function setAcceptResult( $_accept_result )
        {
            $this->accept_result = $_accept_result;   
        }
        
        /**
        * @return string $decline_result
        */
        public function getDeclineResult()
        {
            return $this->decline_result;   
        }
        
        /**
        * @param string $decline_result
        */
        public function setDeclineResult( $_decline_result )
        {
            $this->decline_result = $_decline_result;   
        }
        
        /**
     * Specify data which should be serialized to JSON
     * @link  http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
      $array = [
        'id'        =>  $this->id,
        'title'     =>  $this->title,
        'text'      =>  $this->text,
        'provided_answer'   =>  $this->provided_answer,
        'acceptID'  =>  $this->acceptID,
        'declineID' =>  $this->declineID,
        'type'      =>  $this->type,
        'threshold' =>  $this->threshold,
        'location'  =>  $this->location,
        'accept_result' =>  $this->accept_result,
        'decline_result'    =>  $this->decline_result
      ];

      return $array;
    }
    }
?>