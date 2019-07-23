<template lang="html">

    <div>
      <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav">&times;</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>

    <header >
      <span id="main-span" style="font-size: 30px; cursor: pointer" v-on:click="openNav"><img src="../assets/sidebarlogo.png"></span>
      QUALITYBUDDY

    </header>
    </div>

</template>

<script>
export default {
  data:()=>({
    active:false,
  }),
  methods: {
    openNav: function() {
          document.getElementById("mySidenav").style.width = "250px";
        },
        closeNav: function() {
          document.getElementById("mySidenav").style.width = "0";
        }
  }
}
  

</script>

<style type="text/css">
        
        body {
          font-family: "Lato", sans-serif;
        }
        *{
          padding: 0px;
          margin: 0px;
        }

        header{
          font-size: 29px;
          background-color: black;
          color: white;
          padding: 16px;
          font-family: Arial;
          text-align: center;
        }

        #main-span{
          vertical-align: 50%;
          float: left;
        }

        .sidenav {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #111;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
        }

        .sidenav a {
          padding: 8px 8px 8px 32px;
          text-decoration: none;
          font-size: 25px;
          color: white;
          display: block;
          transition: 0.3s;
        }

        .sidenav a:hover {
          color: white;
        }

        .sidenav .closebtn {
          position: absolute;
          top: 0;
          right: 25px;
          font-size: 36px;
          margin-left: 50px;
        }

        @media screen and (max-height: 450px) {
          .sidenav {padding-top: 15px;}
          .sidenav a {font-size: 18px;}
        }
  
      </style>