<template>
  <div class="ViewJob">
    <!-- <Todos v-bind:todos="todos" /> -->
    <CarouselJob />
  </div>
</template>

<script>
import CarouselJob from "../components/CarouselJob.vue";

export default {
  components: {
    CarouselJob,
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "Todo One",
          completed: false,
        },
        {
          id: 2,
          title: "Todo Two",
          completed: true,
        },
        {
          id: 3,
          title: "Todo Three",
          completed: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
</style>

