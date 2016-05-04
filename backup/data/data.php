<?php
    
    require_once 'data/connection.php';
    require_once 'data/AccDecQuestions.php';
    require_once 'data/AcceptDeclineStats.php';
    
    class OurClimateData
    {
        private $dbConnection;
        
        private $getAllAccDecQuestions;
        
        private $getAllAcceptStats;
        
        private $getAllDeclineStats;
        
        private static $instance;
        
        public function getAccDecQuestions() {
            $ret = [ ];
            
            // AccDecQuestions variables
            $id = null;
            $title = null;
            $text = null;
            $provided_answer = null;
            $acceptID = null;
            $declineID = null;
            $type = null;
            $threshold = null;
            $location = null;
            
            $this->getAllAccDecQuestions->execute();
            $this->getAllAccDecQuestions->bind_result( $id, $title, $text, $provided_answer, $acceptID, $declineID, $type, $threshold, $location );
            
            while ( $this->getAllAccDecQuestions->fetch() )
            {
                $newQuestion = new AccDecQuestion( $id, $title, $text, $provided_answer, $acceptID, $declineID, $type, $threshold, $location );
                
                array_push( $ret, $newQuestion->jsonSerialize() );
            }
            
            return $ret;
        }
        
        public function getAcceptStats() {
            $ret = [ ];
            
            //AcceptDeclineStats variables
            $id = null;
            $temp_delta = null;
            $forest_delta = null;
            $co2_delta = null;
            $sea_delta = null;
            $results = null;
            
            $this->getAllAcceptStats->execute();
            $this->getAllAcceptStats->bind_result( $id, $temp_delta, $forest_delta, $co2_delta, $sea_delta, $results );
            
            while ( $this->getAllAcceptStats->fetch() )
            {
                $newStat = new AcceptDeclineStats( $id, $temp_delta, $forest_delta, $co2_delta, $sea_delta, $results );
                array_push( $ret, $newStat->jsonSerialize() );
            }
            
            return $ret;
        }
        
        public function getDeclineStats() {
            $ret = [ ];
            
            //AcceptDeclineStats variables
            $id = null;
            $temp_delta = null;
            $forest_delta = null;
            $co2_delta = null;
            $sea_delta = null;
            $results = null;
            
            $this->getAllDeclineStats->execute();
            $this->getAllDeclineStats->bind_result( $id, $temp_delta, $forest_delta, $co2_delta, $sea_delta, $results );
            
            while ( $this->getAllDeclineStats->fetch() )
            {
                $newStat = new AcceptDeclineStats( $id, $temp_delta, $forest_delta, $co2_delta, $sea_delta, $results );
                array_push( $ret, $newStat->jsonSerialize() );
            }
            
            return $ret;
        }
        
        /**
        * @return ourClimateData The single shared instance
        */
        public static function getInstance()
        {
        if ( !self::$instance )
        {
        self::$instance = new self();
        }

        return self::$instance;
        }
        
        /**
        * Empty clone method to prevent connection duplication
        */
        private function __clone()
        {

        }
        
        /**
        * OurClimateData constructor.
        * Initialize prepared statements
        */
        private function __construct()
        {
            $this->dbConnection = new DatabaseConnection();
            
            $this->getAllAccDecQuestions   = $this->dbConnection->prepare_statement( "SELECT * FROM `accdec_questions`" );
            $this->getAllAcceptStats        = $this->dbConnection->prepare_statement( "SELECT * FROM `accepted_stats`" );
            $this->getAllDeclineStats       = $this->dbConnection->prepare_statement( "SELECT * FROM `decline_stats`" );
        }
        
        /**
        * Close resources on destruct
        */
        function __destruct()
        {
            if ( $this->getAllAccDecQuestions )
            {
                $this->getAllAccDecQuestions->close();
            }
            if ( $this->getAllAcceptStats )
            {
                $this->getAllAcceptStats->close();   
            }
            if ( $this->getAllDeclineStats ) 
            {
                $this->getAllDeclineStats->close();
            }
        }
    }
?>