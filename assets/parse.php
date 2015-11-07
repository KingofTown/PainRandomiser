<style>
div { margin-left:30px; }
pre { margin-left:30px; }
</style>
<?
function show($data) { echo '<pre>'; print_r($data); echo '</pre>'; }

// Cards
$Cards = array();
$All = array();

// ----------------------------------------------------------------------
// Loop
$row = 1;
if (($handle = fopen("curse.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",", '"')) !== FALSE) {
        $Cards['Curses'][] = $data;
		$All[] = $data;
    }
    fclose($handle);
}
$row = 1;
if (($handle = fopen("quests.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $Cards['Quests'][] = $data;
		$All[] = $data;
    }
    fclose($handle);
}
// ----------------------------------------------------------------------

// Check Cards
foreach($All as $card)
{
	$image = 'cards/'.$card[4].'.png';
	if (!file_exists($image)) {
		Show($card);	
	}
}
echo '<hr/>';

echo '<pre>';
echo 'var Cards = {<br>';
	echo '<div>';
	
	// Create Javascript
	foreach($Cards as $Title => $List)
	{
		echo $Title .': [<div>';
		foreach($List as $Cards){
			echo '[';
			
			// Title
			echo '"'. $Cards[0] .'",<br/>';
			
			// Flavour
			echo '"'. $Cards[2] .'",<br/>';
			
			// Action
			echo '"'. $Cards[3] .'",<br/>';
			
			// Days
			if ($Cards[1] == '-') {
				echo 'null,<br/>';
			} else {
				echo '['. $Cards[1] .'],<br/>';	
			}
			
			// Image
			echo '"'. $Cards[4] .'.png",<br/>';
			
			// List
			if ($Cards[5]) {
				$Cards[5] = explode(",", $Cards[5]);
				$Cards[5] = array_filter(array_map('trim', $Cards[5]));
				$Cards[5] = implode('", "', $Cards[5]);
				echo '["'. $Cards[5] .'"],<br/>';
			}
			
			echo '],<br/>';
		}
		echo '</div>],<br><br>';
	}
	echo '</div>';
echo '};';
echo '</pre>';

?>