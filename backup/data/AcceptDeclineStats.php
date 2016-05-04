<?php

    class AcceptDeclineStats implements JsonSerializable
    {
        /** @var int unique id */
        private $id;
        
        /** @var varchar temp_delta */
        private $temp_delta;
        
        /** @var varchar forest_delta */
        private $forest_delta;
        
        /** @var varchar co2_delta */
        private $co2_delta;
        
        /** @var varchar sea_delta */
        private $sea_delta;
        
        /** @var varchar results */
        private $results;
        
        /**
         * Question constructor.
         */
        public function __construct( $_id, $_temp_delta, $_forest_delta, $_co2_delta, $_sea_delta, $_results )
        {
            $this->id         = $_id;
            $this->temp_delta   = $_temp_delta;
            $this->forest_delta = $_forest_delta;
            $this->co2_delta    = $_co2_delta;
            $this->sea_delta    = $_sea_delta;
            $this->results     = $_results;
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
        public function setId( $_id )
        {
            $this->id = $_id;
        }
        
        /**
        * @return int
        */
        public function getTempDelta()
        {
            return $this->temp_delta;
        }
        
        /**
        * @param int $itemp_delta
        */
        public function setTempDelta( $_temp_delta )
        {
            $this->temp_delta = $_temp_delta;
        }
        
        /**
        * @return int
        */
        public function getForestDelta()
        {
            return $this->temp_delta;
        }
        
        /**
        * @param int $forest_delta
        */
        public function setForestDelta( $_forest_delta )
        {
            $this->forest_delta = $_forest_delta;
        }
        
        /**
        * @return int
        */
        public function getCo2Delta()
        {
            return $this->co2_delta;
        }
        
        /**
        * @param int $co2_delta
        */
        public function setCo2Delta( $_co2_delta )
        {
            $this->co2_delta = $_co2_delta;
        }
        
        /**
        * @return int
        */
        public function getSeaDelta()
        {
            return $this->sea_delta;
        }
        
        /**
        * @param int $forest_delta
        */
        public function setSeaDelta( $_sea_delta )
        {
            $this->sea_delta = $_sea_delta;
        }

        /**
        * @return varchar
        */
        public function getResults()
        {
            return $this->results;
        }
        
        /**
        * @param varchar $_results
        */
        public function setResults( $_results )
        {
            $this->results = $_results;
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
                'temp_delta'    => $this->temp_delta,
                'forest_delta'  => $this->forest_delta,
                'co2_delta'     => $this->co2_delta,
                'sea_delta'     =>  $this->sea_delta,
                'results'       =>  $this->results
            ];
            return $array;
        }
    }
    
?>