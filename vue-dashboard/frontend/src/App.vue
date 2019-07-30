<template>
  <div id="App">
    <SideBar/>
    <barGraph/>
  </div>
</template>



<script>
import SideBar from './components/SideBar'
import barGraph from './components/barGraph'


export default {
  name: 'App',
  components: {
    SideBar,
    barGraph
  }
}




</script>

