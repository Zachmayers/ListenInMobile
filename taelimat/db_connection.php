<?php
	//require_once('db_config.php');	

class Database {
	
//PROTOTYPE SITE
	
    private $host      = "localhost";
    private $user      = "root";
    private $pass      = "Ouroboros21";
    private $dbname = "ONLINEINSTRUCTIONS";
	
    private $dbh;
    private $error;
    
	private $stmt;    
 
    public function __construct(){
	    	    
        // Set DSN
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
        // Set options
        $options = array(
            PDO::ATTR_PERSISTENT    => true,
            PDO::ATTR_ERRMODE       => PDO::ERRMODE_EXCEPTION
        );
        // Create a new PDO instance
        try{
            $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
        }
        // Catch any errors
        catch(PDOException $e){
	        echo "ERROR";
	        //turn this off for live code
	        print_r($e);
            $this->error = $e->getMessage();
        }
    }
    
	public function query($query){
		//echo $query;
	    $this->stmt = $this->dbh->prepare($query);
	}    
	
	public function bind($param, $value, $type = null){
	    if (is_null($type)) {
	        switch (true) {
	            case is_int($value):
	                $type = PDO::PARAM_INT;
	                break;
	            case is_bool($value):
	                $type = PDO::PARAM_BOOL;
	                break;
	            case is_null($value):
	                $type = PDO::PARAM_NULL;
	                break;
	            default:
	                $type = PDO::PARAM_STR;
	        }
	    }
	    $this->stmt->bindValue($param, $value, $type);
	}   
	
	public function execute(){
	    return $this->stmt->execute();
	}	
	
	public function resultset(){
	    $this->execute();
	    return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
	}	
	
	public function single(){
	    $this->execute();
	    $result = $this->stmt->fetch(PDO::FETCH_ASSOC);
		if (!is_array($result)) {
			return array();
		} else {
		    return $result;
		}
	}		

	public function rowCount(){
	    return $this->stmt->rowCount();
	}	
	
	public function lastInsertId(){
	    return $this->dbh->lastInsertId();
	}			 
	
	public function beginTransaction(){
	    return $this->dbh->beginTransaction();
	}	
	
	public function endTransaction(){
	    return $this->dbh->commit();
	}
	
	 public function cancelTransaction(){
	    return $this->dbh->rollBack();
	}	
	
	public function debugDumpParams(){
	    return $this->stmt->debugDumpParams();
	}		
}
?>