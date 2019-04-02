var app=new Vue({
el:"#root",
data:{
     showaddmodal:false,
     showeditmodal:false,
     showdeletemodal:false,
     sucessmessage:"",
     errormessage:"",
     users:[],
     newuser:{name: "",email: "",mobile: ""},
     edituser:{}
},
mounted:function(){
  //automatically call hbe
  //console.log('hei');
  this.getallusers();
},
methods:{
//other function gula akhan theke call hbe
//data read korar jonno
getallusers:function()
{
  axios.get("http://localhost/phonebook/api.php?action=read")
  .then(function(response){
    //console.log(response);
    if(response.data.error)
    {
      app.errormessage=response.data.message;
    }
    else {
      app.users=response.data.users;
    }

  });
},
//data insert korar jono
saveuser:function()
{
//console.log(app.newuser);
var formdata=app.toFormData(app.newuser);
axios.post("http://localhost/phonebook/api.php?action=create",formdata)
.then(function(response){
  //console.log(response);
  app.newuser={name: "",email: "",mobile: ""}
  if(response.data.error)
  {
    app.errormessage=response.data.message;
  }
  else {
    app.getallusers();
  }

});

},
updateuser:function()
{
//console.log(app.newuser);
var formdata=app.toFormData(app.edituser);
axios.post("http://localhost/phonebook/api.php?action=update",formdata)
.then(function(response){
  //console.log(response);
  app.edituser={};
  if(response.data.error)
  {
    app.errormessage=response.data.message;
  }
  else {
    app.sucessmessage=response.data.message;
    app.getallusers();
  }

});

},
deleteuser:function()
{
//console.log(app.newuser);
var formdata=app.toFormData(app.edituser);
axios.post("http://localhost/phonebook/api.php?action=delete",formdata)
.then(function(response){
  //console.log(response);
  app.edituser={};
  if(response.data.error)
  {
    app.errormessage=response.data.message;
  }
  else {
    app.sucessmessage=response.data.message;
    app.getallusers();
  }

});

},
selectuser(user)
{
  app.edituser=user;
},
toFormData: function(obj)
{
var form_data=new FormData();
for (var key in obj) {
  form_data.append(key,obj[key]);
}
  return form_data;
},
clearMessage:function()
{
  app.errormessage="";
  app.sucessmessage="";
}



}


});
