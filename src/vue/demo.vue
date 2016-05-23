<template>
  <list>
    <cell v-for="item in items">
      <text>{{item.title}}</text>
      <item :title="'a'"></item>
    </cell>
  </list>
</template>

<script>
  module.exports = {
    el: 'list',
    stream: true,
    data: {
      items: [
        {title: 'A', url: 'a'},
        {title: 'B', url: 'b'},
        {title: 'C', url: 'c'}
      ]
    },
    components: {
      item: require('./item.vue')
    }
  }
</script>
