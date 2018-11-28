<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <input placeholder="Name" v-model="name">
      <input placeholder="Value" v-model="value">
      <button @click="add">Add</button>
    </div>
    <div>
      <p v-for="(item, index) in items" v-bind:key="index">
        Name: <strong>{{item.name}}</strong> Value: <strong>{{item.value}}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      name: '',
      value: '',
      isLoading: false,

      items: [],
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      const self = this;
      axios.get(`${this.$store.state.api}/values/all`)
        .then((response) => {
          self.items = response.data.reverse();
        })
        .catch((error) => {
          // handle error
          console.log(error); // eslint-disable-line
        });
    },
    add() {
      const self = this;

      const query = qs.stringify({
        name: this.name,
        value: this.value,
      });

      axios.get(`${this.$store.state.api}/values?${query}`)
        .then((response) => {
          if (response.data.success) {
            self.loadItems();
          }
        })
        .catch((error) => {
          // handle error
          console.log(error); // eslint-disable-line
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
