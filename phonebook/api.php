<?php
$con = new mysqli("localhost","root","","phonebook");
if ($con->connect_error) {
 die("Couldnot Connect..!!");
}
$res = array('error'=> false);
$action = 'read';
if (isset($_GET['action'])) {
 $action = $_GET['action'];
}
//read
if ($action == 'read') {
 $result = $con->query("SELECT * FROM `phone`");
 $users = array();
 while($row = $result->fetch_assoc()){
   array_push($users, $row);
 }
 $res['users']= $users;
}
//create or insert
if ($action == 'create') {
  $name=$_POST['name'];
  $email=$_POST['email'];
  $mobile=$_POST['mobile'];

 $result = $con->query("INSERT INTO `phone`(`name`, `email`, `mobile`) VALUES ('$name','$email','$mobile')");
 if($result)
 {
   $res['message']="user added sucessfully";
 }
 else {
      $res['error']=true;
      $res['message']="user not sucessfully";

   }
   $res['users']= $users;
 }

 if ($action == 'update') {
   $id=$_POST['id'];
   $name=$_POST['name'];
   $email=$_POST['email'];
   $mobile=$_POST['mobile'];

  $result = $con->query("UPDATE `phone` SET `name`='$name', `email`='$email', `mobile`='$mobile' WHERE `id`='$id' ");
  if($result)
  {
    $res['message']="user updated sucessfully";
  }
  else {
       $res['error']=true;
       $res['message']="user not sucessfully";

    }
    $res['users']= $users;
  }
  if ($action == 'delete') {
    $id=$_POST['id'];

   $result = $con->query("DELETE FROM `phone` WHERE `id`='$id' ");
   if($result)
   {
     $res['message']="user deleted sucessfully";
   }
   else {
        $res['error']=true;
        $res['message']="user not sucessfully";

     }
     $res['users']= $users;
   }







$con->close();
header("Content-type: application/json");
echo json_encode($res);
