<?php
    
    require_once 'data/connection.php';
    require_once 'data/AccDecQuestions.php';
    
    class OurClimateData
    {
        private $dbConnection;
        
        private $getAllAccDecQuestions;
        
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
        }
    }
?>