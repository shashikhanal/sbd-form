<?php

  $products = [];
  $file = fopen("totalProducts.csv","r");
  while (($line = fgetcsv($file)) !== FALSE) {

    if (!array_key_exists($line[0], $products)) {
      $products[$line[0]] = [
        $line[1]
      ];
    } else {
      $products[$line[0]][] = $line[1];
    }
  }
  fclose($file);
  // echo '<pre>' . var_export($products, true) . '</pre>';

?>
<!DOCTYPE html>
<html>
<head>
	<title>Form</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/materialize.min.css">
	<link rel="stylesheet" type="text/css" href="fonts/roboto/Roboto-Regular.woff">
	<link rel="stylesheet" type="text/css" href="css/icon.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">

</head>
<body>
<div class="content-wrapper">
	<div class="content-header"></div>
	<div class="container clrfix">
		<div class="form-wrapper z-depth-1">
			<div class="form-border"></div>
			<div class="row ">
	    		<div class="form-space col s12">
	    			<h2>MR SKU Visibility</h2>
	    			<p>This form allows RMAP Auditor to enter the Visibility of MR SKUs</p>
          <form name="generalForm" id="outletForm" action="formHandler.php" class="space-top" method="post" validate>
						<div class="required section input-field ">
							<h5>Outlet name<span class="error">This field is required</span></h5>
              <input type="text" id="autocomplete" class="outletName autocomplete" name="outletName">
              <!-- <select name="outlet">
      				 <option disabled selected>Outlet name</option>
      					<option>Yuna Cold Store</option>
      					<option>Saujanya Suppliers and cosmtic</option>
      					<option>Hari Cold Store</option>
      					<option>Chandra Store</option>
      					<option>Shrestha Store</option>
      				</select> -->
						</div>

						<div class="space-top brand-list">
              <h5>Items</h5>

							<ul class="collapsible" data-collapsible="accordion">
                <?php
                  foreach ($products as $key => $values) {
                ?>
                  <li>
									<div class="collapsible-header">
                    <h6><?php echo $key;?></h6>
									</div>
                  <?php foreach ($values as $value) { ?>
									<div class="collapsible-body">
										<ul>
											<li>
												<div class="row grid-body no-margin">
												<ul class="skuList clrfix">
													<li class="clrfix">
														<div class="col s8 no-margin">
                              <input type="checkbox" id="<?php echo $value; ?>" name="brand[<?php echo $key;?>]" class="skuCheck"/>
                              <label for="<?php echo $value; ?>"><?php echo $value; ?></label>
														</div>
														<div class="col s4 no-margin qtyInpParnt">
                              <input type="number" class="qtyInp" name="sku[<?php echo $key; ?>][<?php echo $value; ?>]" disabled/>
                              <span class="error">This field is required</span>
														</div>
													</li>
												</div>
											</li>
										</ul>
									</div>
                  <?php
                      }
                    }
                  ?>

							</ul>
						</div>
						<div class="btn-wrapper" id="submit">
              <input type="submit" name="submit" value="Submit" id="submitBtn" class="waves-effect waves-light btn"/>
						</div>
					</form>
	    		</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/materialize.min.js"></script>
<script type="text/javascript" src="js/custom.js"></script>
</body>
</html>
