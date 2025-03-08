<?php
$files = scandir('db');
echo json_encode($files);
?>