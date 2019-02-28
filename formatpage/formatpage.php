<!DOCTYPE html>
<html>
<head>
    <style>
    .grid-container {
        width : 100px;
        display: grid;
        grid-gap: 10px;
        padding: 10px;
    }

    .grid-item {
        background-color: rgba(255, 255, 255, 0.8);
        text-align: center;
        padding: 20px;
        font-size: 30px;
    }
    .profile {
        background-color: orange;
        height: 200px;
        grid-column: 1 ;
        grid-row: 1 ;
    }
    .logout {
        background-color: orange;
        height: 200px;
        grid-column: 6 ;
        grid-row: 1 ;
    }
    .header {
        background-color: orange;
        height: 200px;
        grid-column: 2 / span 4;
        grid-row: 1 ;
    }

    .sidebar{
        background-color: grey;
        height: 300px;
        grid-column: 1 ;
        grid-row: 2;
    }
    .content {
        background-color:green;
        height: 300px;
        grid-column: 2 / span 5;
        grid-row: 2;  
    }

    .footer {
        height: 50px;
        background-color:pink;
        grid-column: 1 / span 6;
        grid-row: 3;
    }
</style>
</head>
<body>


<div class="grid-container">
  <div class="grid-item profile">profile</div>
  <div class="grid-item header">header</div>
  <div class="grid-item logout">logout</div>
  <div class="grid-item sidebar">sidebar</div>  
  <div class="grid-item content">content</div>
  <div class="grid-item footer">footer</div>
</div>


</body>
</html>
