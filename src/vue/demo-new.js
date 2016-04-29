return new Vue({
  el: 'scroller',
  data: {x: 1, y: 2, z: 'foo'},
  methods: {foo: function (e) {
    console.log('event', e)
    this.y++
  }},
  style: {y: {fontSize: 64}},
  // stream: true,
  render: function () {
    with (this) {
      return __r__(
        __s__('div', {}),
        [
          __r__(
            __s__('text', {
              on:{"click":foo},
              staticClass:"a b",
              class:[y, 'y'],
              attrs:{value:(__toString__(y)+"asdfasdfaf")},
              // append: true
            }),
            []
          )
        ]
      )
    }
  }
})

// // testing registerModules()
// console.log(__weex_require_module__('dom'))

// // testing registerComponents()
// registerComponents(['a', {name: 'b'}, null])
// console.log(Vue.config.isReservedTag('a'))
// console.log(Vue.config.isReservedTag('b'))
// console.log(Vue.config.isReservedTag('c'))
