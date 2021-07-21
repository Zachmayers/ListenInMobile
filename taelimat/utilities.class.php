<?php
require_once('mysqldb.class.php');	

class Utilities {
/*****
	CHANGE THIS VARIABLE TO WHEN TRANSFERRING FILES TO THE LIVE SITE
*****/

	public $site_type = "prototype"; //
//	public $site_type = "live";

	public $version = "21"; //
	
	 public $states = array('AL'=>"Alabama",  
				'AK'=>"Alaska",  
				'AZ'=>"Arizona",  
				'AR'=>"Arkansas",  
				'CA'=>"California",  
				'CO'=>"Colorado",  
				'CT'=>"Connecticut",  
				'DE'=>"Delaware",  
				'DC'=>"District Of Columbia",  
				'FL'=>"Florida",  
				'GA'=>"Georgia",  
				'HI'=>"Hawaii",  
				'ID'=>"Idaho",  
				'IL'=>"Illinois",  
				'IN'=>"Indiana",  
				'IA'=>"Iowa",  
				'KS'=>"Kansas",  
				'KY'=>"Kentucky",  
				'LA'=>"Louisiana",  
				'ME'=>"Maine",  
				'MD'=>"Maryland",  
				'MA'=>"Massachusetts",  
				'MI'=>"Michigan",  
				'MN'=>"Minnesota",  
				'MS'=>"Mississippi",  
				'MO'=>"Missouri",  
				'MT'=>"Montana",
				'NE'=>"Nebraska",
				'NV'=>"Nevada",
				'NH'=>"New Hampshire",
				'NJ'=>"New Jersey",
				'NM'=>"New Mexico",
				'NY'=>"New York",
				'NC'=>"North Carolina",
				'ND'=>"North Dakota",
				'OH'=>"Ohio",  
				'OK'=>"Oklahoma",  
				'OR'=>"Oregon",  
				'PA'=>"Pennsylvania",
				'PR'=>"Puerto Rico",  
				'RI'=>"Rhode Island",  
				'SC'=>"South Carolina",  
				'SD'=>"South Dakota",
				'TN'=>"Tennessee",  
				'TX'=>"Texas",  
				'UT'=>"Utah",  
				'VT'=>"Vermont",  
				'VA'=>"Virginia",  
				'WA'=>"Washington",  
				'WV'=>"West Virginia",  
				'WI'=>"Wisconsin",  
				'WY'=>"Wyoming");
				

	function convert_month($number) {
		$month = "";
		
		switch($number) {
			case "1":
				$month = "Jan";
			break;
			
			case "2":
				$month = "Feb";
			break;

			case "3":
				$month = "Mar";
			break;

			case "4":
				$month = "Apr";
			break;

			case "5":
				$month = "May";
			break;

			case "6":
				$month = "June";
			break;

			case "7":
				$month = "July";
			break;

			case "8":
				$month = "Aug";
			break;

			case "9":
				$month = "Sep";
			break;

			case "10":
				$month = "Oct";
			break;
			
			case "11":
				$month = "Nov.";
			break;
			
			case "12":
				$month = "Dec";
			break;		
		}
		
		return $month;
	}

	function get_cities($state) {
		$database = new Database;
		$database->query("SELECT city FROM state_city
							WHERE state = :state
							ORDER BY city ASC");
		$database->bind(':state', $state);
		$result = $database->single();
		return $result;
	}
	
	
	function in_array_r($needle, $haystack, $sort) {
		$found = false;

		foreach ($haystack as $item) {
			if ($item[$sort] == $needle) {
				$found = true;
				break;
			} elseif (is_array($item)) {
				$found = $this->in_array_r($needle, $item, $sort);
			}
		}
		return $found;
	}
		
	function get_city_state($zip) {
		$database = new Database;
		
		$database->query("SELECT city, state FROM zcta WHERE zip = :zip");
		$database->bind(':zip', $zip);
		$result = $database->single();
		return $result;
	}
		
	function makeSafe(&$value, $key) {
	
		$value = str_replace ("&amp;", "&", $value);
		$value = str_replace ('&quot;', '"', $value);
		$value = str_replace ("&#039;", "'", $value);		
		
		$value = htmlentities($value, ENT_QUOTES, 'UTF-8'); // use htmlspecialchars() if you want

		//$value = $this->mynl2br($value);	
	
		//return $value;
	}
	
	function clickable_links($string) {
		$url = '@(http(s)?)?(://)?(([a-zA-Z])([-\w]+\.)+([^\s\.]+[^\s]*)+[^,.\s])@';
		$string = preg_replace($url, '<a href="http$2://$4" target="_blank" title="$0">$0</a>', $string);
		return $string;		
	}
	
	function makeSafe_array(&$value, $key) {
	
		$value = str_replace ("&amp;", "&", $value);
		$value = str_replace ('&quot;', '"', $value);
		$value = str_replace ("&#039;", "'", $value);		
		
		$value = htmlentities($value, ENT_QUOTES, 'UTF-8'); // use htmlspecialchars() if you want
			
		//$value = $this->mynl2br($value);	
	
		//return $value;
	}	

	function makeSafe_flat($value) {
	
		$value = str_replace ("&amp;", "&", $value);
		$value = str_replace ('&quot;', '"', $value);
		$value = str_replace ("&#039;", "'", $value);		
		
		$value = htmlentities($value, ENT_QUOTES, 'UTF-8'); // use htmlspecialchars() if you want
	
		return $value;
	} 	
	
	function get_coordinates($zip) {
		$database = new Database;
		
		$database->query("SELECT latitude, longitude FROM zcta WHERE zip = :zip");
		$database->bind(':zip', $zip);
		$result = $database->single();
		return $result;
	}
		
	function distance($lat1, $lng1, $lat2, $lng2)  {
		$pi80 = M_PI / 180;
		$lat1 *= $pi80;
		$lng1 *= $pi80;
		$lat2 *= $pi80;
		$lng2 *= $pi80;
	 
		$r = 6372.797; // mean radius of Earth in km
		$dlat = $lat2 - $lat1;
		$dlng = $lng2 - $lng1;
		$a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlng / 2) * sin($dlng / 2);
		$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
		$km = $r * $c;
		$miles = $km * 0.621371192;
		return $miles;
	}	
	
	function mynl2br($text) { 
		return strtr($text, array("\r\n" => '<br />', "\r" => '<br />', "\n" => '<br />')); 
	}
			
	function generateRandomString($length) {
	    $characters = '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, strlen($characters) - 1)];
	    }
	    return $randomString;
	}	
	
	function ie_detect() {
		if(preg_match('/(?i)msie [6-8]/',$_SERVER['HTTP_USER_AGENT'])) {
			$_SESSION['browser'] = "low_ie";
		} else {
			    // if IE>8
			$_SESSION['browser'] = "other";			    
		}
	}
	
			
		
	
	function month_selections($month) {
		$jan = $feb =$mar = $apr = $may = $jun = $jul = $aug = $sep = $oct = $nov = $dec = ""; 
		
		switch($month) {
			case "1":
				$jan = 'selected';
			break;
			
			case "2":
				$feb = 'selected';
			break;
			
			case "3":
				$mar = 'selected';
			break;
			
			case "4":
				$apr = 'selected';
			break;
			
			case "5":
				$may = 'selected';
			break;
			
			case "6":
				$jun = 'selected';
			break;
			
			case "7":
				$jul = 'selected';
			break;
			
			case "8":
				$aug = 'selected';
			break;
			
			case "9":
				$sep = 'selected';
			break;
			
			case "10":
				$oct = 'selected';
			break;
			
			case "11":
				$nov = 'selected';
			break;
			
			case "12":
				$dec = 'selected';
			break;				
		}
		
		return array("jan" => $jan,
							"feb" => $feb,
							"mar" => $mar,
							"apr" => $apr,
							"may" => $may,
							"jun" => $jun,
							"jul" => $jul,
							"aug" => $aug,
							"sep" => $sep,
							"oct" => $oct,
							"nov" => $nov,
							"dec" => $dec);		
	}	
	

		function comp($a, $b) {
		    if ($a['start_date_number'] == $b['start_date_number']) {
		        return 0;
		    } else {
		    
		    return ($a['start_date_number'] < $b['start_date_number']) ? -1 : 1;
		    }
		}											


	function get_unique_array_values($array, $key) {
		$new_array = array();
		foreach($array as $row) {
			$new_array[] = $row[$key];
		}
		
		$unique_array = array_unique($new_array);
		return $unique_array;
	}
		
	function convert_datetime($month, $day, $year, $hour, $minute, $ampm) {
		//convert into timestamp for database 0000-00-00 00:00:00 format
		
		if ($ampm == "PM") {
			$hour = $hour + 12;
		}
		
		if ($day < 10) {
			$day = "0".$day;
		}
		
		if ($hour < 10) {
			$hour = "0".$hour;
		}						
		
		$date = $year."-".$month."-".$day." ".$hour.":".$minute.":00";
		
		return $date;
	}
	

	function convert_password($userID, $password) {
		$database = new Database;

		$options = ['cost' => 10,];		
		$new_pass = password_hash($password, PASSWORD_BCRYPT, $options);		
		
		$database->query('UPDATE members SET password = :new_pass, pass_test = :new_flag
									WHERE userID = :userID');
		$database->bind(':userID', $userID);		
		$database->bind(':new_pass', $new_pass);		
		$database->bind(':new_flag', "Y");	
		
		$database->execute();
	}
		
	
	function utf8ize($d) {
	    if (is_array($d) || is_object($d))
	        foreach ($d as &$v) $v = $this->utf8ize($v);
	    else
	        return utf8_encode($d);
	
	    return $d;	
    }	
	
}
?>