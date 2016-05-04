/**
 * format comparison
 *
 * old:
 * __h__(tag, data, children, namespace)
 * new:
 * __r__(self, children)       -> render
 * __s__(tag, data, namespace) -> self
 * __t__(text)                 -> text content
 * __m__(index)                -> static tree
 *
 * the new format MUST be with `stream: true` option from root Vm
 */
Vue.component('foo', {
  props: ['a', 'b'],
  data: function () {
    return {list: [1,2]}
  },
  // // new format
  // stream: true,
  render: function () {
    with (this) {
      // old format
      return __h__('div', undefined, [
        (list) && __renderList__((list), function (k, v,$index) {
          return __h__('div', {
            class:[a, 'a'],
            style:{m: '1', n: a},
            attrs:{"n":a},
            staticAttrs:{"m":"a","style":"l: 2"}
          }, [
            ("\n aaa"+__toString__(a)+"bbb"+__toString__(k)+"-"+__toString__(v)+"\n "),
            _staticTrees[0]
          ], '')
        })
      ], '')
      // // new format
      // return __r__(
      //   __s__('div', {
      //     staticAttrs: {a: 'b'}
      //   }),
      //   [
      //     __r__(
      //       __s__('text', {
      //         staticAttrs: {value: 'child text content'}
      //       })
      //     ),
      //   (list) && __renderList__((list), function(k, v, $index) {
      //     return __r__(
      //       __s__('div', {
      //         class:[a, 'a'],
      //         style:{m: '1', n: a},
      //         attrs:{"n":a},
      //         staticAttrs:{"m":"a","style":"l: 2"}
      //       }),
      //       [
      //         __t__("\n aaa"+__toString__(a)+"bbb"+__toString__(k)+"-"+__toString__(v)+"\n "),
      //         __m__(0)
      //       ]
      //     )
      //   })]
      // )
    }
  },
  staticRenderFns: [
    function () {
      with(this){
        // old format
        return __h__('text', {
          staticAttrs: {value: 'Hello World'}
        }, [], '')
        // // new format
        // return __r__(
        //   __s__('text', {
        //     staticAttrs: {value: 'Hello World'}
        //   }),
        //   []
        // )
      }
    }
  ]
})

return new Vue({
  el: 'scroller',
  data: {x: 1, y: 2, z: 'foo'},
  methods: {foo: function (e) {
    console.log('event', e)
    this.y++
  }},
  style: {y: {fontSize: 64}},
  // // new format
  // stream: true,
  render: function () {
    with (this) {
      // old format
      return __h__(
        'div', {},
        [
          __h__('foo', {attrs:{"a":x,"b":y}}, undefined, ''),
          __h__('text', {
            on:{"click":foo},
            staticClass:"a b",
            class:[y, 'y'],
            attrs:{value:(__toString__(y)+"asdfasdfaf")}
          }, [], '')
        ], ''
      )
      // // new format
      // return __r__(
      //   __s__('div', {}),
      //   [
      //     __r__(
      //       __s__('foo', {
      //         attrs:{"a":x,"b":y}
      //       }),
      //       []
      //     ),
      //     __r__(
      //       __s__('text', {
      //         on:{"click":foo},
      //         staticClass:"a b",
      //         class:[y, 'y'],
      //         attrs:{value:(__toString__(y)+"asdfasdfaf")},
      //         // append: true
      //       }),
      //       []
      //     )
      //   ]
      // )
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
