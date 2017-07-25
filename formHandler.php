<?php
$pwd = getcwd();
require_once($pwd.'/PHPMailer-5.2-stable/PHPMailerAutoload.php');
// require_once($pwd.'/vendor/phpmailer');

  if(isset($_POST['submit'])){
    $_POST = filter_var_array($_POST);
    // echo '<pre>' . var_export($_POST, true) . '</pre>';
    // exit;
    date_default_timezone_set('Asia/Kathmandu');

    $timestamp = date('Y-m-d H:i:s');
    $outletName = $_POST['outlet'];
    $list = [];

    foreach ($_POST['sku'] as $brand => $skuItem) {
      if ($_POST['brand'][$brand] === 'on') {
        foreach ($skuItem as $name => $qty) {
          if (!empty($qty)) {
            array_push($list, $timestamp.','.$outletName.','.$brand.','.$name.','.$qty);
          }
        }
      }
    }

    // Prepare arrays of data to be inserted into response.csv file
    // $list = [
    //   "12:00,BBSM Naxal,Vicks,Vicks 10gm,100",
    //   "12:00,BBSM Patan,Vicks,Vicks 5gm,50",
    // ];
    //
    $file = fopen("response.csv","a");

    foreach ($list as $line)
      {
      fputcsv($file,explode(',',$line));
      }

    fclose($file);

    header("Location: ./thanks.php");
    exit;
  }
