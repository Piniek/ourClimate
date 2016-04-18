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
        
        /**
         * Question constructor.
         *
         * @param User    $owner
         * @param Species $species
         * @param string  $name
         */
        public function __construct( $_id, $_title, $_text, $_provided_answer, $_acceptID, $_declineID, $_type )
        {
            $this->id         = $_id;
            $this->title      = $_title;
            $this->text    = $_text;
            $this->provided_answer = $_provided_answer;
            $this->acceptID = $_acceptID;
            $this->declineID = $_declineID;
            $this->type = $_type;
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
        'type'      =>  $this->type
      ];

      return $array;
    }
    }