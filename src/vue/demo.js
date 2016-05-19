/**
 * format comparison
 *
 * old:
 * __h__(tag, data, children, namespace)
 * new:
 * _h(self, children)       -> render
 * _e(tag, data, namespace) -> self
 * _t(text)                 -> text content
 * _m(index)                -> static tree
 *
 * the new format MUST be with `stream: true` option from root Vm
 */

// /**
//  * Example 0
//  */
// Vue.component('foo', {
//   props: ['a', 'b'],
//   data: function () {
//     return {list: [1,2]}
//   },
//   // // new format
//   // stream: true,
//   render: function () {
//     with (this) {
//       // old format
//       return __h__('div', undefined, [
//         (list) && __renderList__((list), function (k, v,$index) {
//           return __h__('div', {
//             class:[a, 'a'],
//             style:{m: '1', n: a},
//             attrs:{"n":a},
//             staticAttrs:{"m":"a","style":"l: 2"}
//           }, [
//             ("\n aaa"+__toString__(a)+"bbb"+__toString__(k)+"-"+__toString__(v)+"\n "),
//             _staticTrees[0]
//           ], '')
//         })
//       ], '')
//       // // new format
//       // return _h(
//       //   _e('div', {
//       //     staticAttrs: {a: 'b'}
//       //   }),
//       //   [
//       //     _h(
//       //       _e('text', {
//       //         staticAttrs: {value: 'child text content'}
//       //       })
//       //     ),
//       //   (list) && __renderList__((list), function(k, v, $index) {
//       //     return _h(
//       //       _e('div', {
//       //         class:[a, 'a'],
//       //         style:{m: '1', n: a},
//       //         attrs:{"n":a},
//       //         staticAttrs:{"m":"a","style":"l: 2"}
//       //       }),
//       //       [
//       //         _t("\n aaa"+__toString__(a)+"bbb"+__toString__(k)+"-"+__toString__(v)+"\n "),
//       //         _m(0)
//       //       ]
//       //     )
//       //   })]
//       // )
//     }
//   },
//   staticRenderFns: [
//     function () {
//       with(this){
//         // old format
//         return __h__('text', {
//           staticAttrs: {value: 'Hello World'}
//         }, [], '')
//         // // new format
//         // return _h(
//         //   _e('text', {
//         //     staticAttrs: {value: 'Hello World'}
//         //   }),
//         //   []
//         // )
//       }
//     }
//   ]
// })
// return new Vue({
//   el: 'scroller',
//   data: {x: 1, y: 2, z: 'foo'},
//   methods: {foo: function (e) {
//     console.log('event', e)
//     this.y++
//   }},
//   style: {y: {fontSize: 64}},
//   // // new format
//   // stream: true,
//   render: function () {
//     with (this) {
//       // old format
//       return __h__(
//         'div', {},
//         [
//           __h__('foo', {attrs:{"a":x,"b":y}}, undefined, ''),
//           __h__('text', {
//             on:{"click":foo},
//             staticClass:"a b",
//             class:[y, 'y'],
//             attrs:{value:(__toString__(y)+"asdfasdfaf")}
//           }, [], '')
//         ], ''
//       )
//       // // new format
//       // return _h(
//       //   _e('div', {}),
//       //   [
//       //     _h(
//       //       _e('foo', {
//       //         attrs:{"a":x,"b":y}
//       //       }),
//       //       []
//       //     ),
//       //     _h(
//       //       _e('text', {
//       //         on:{"click":foo},
//       //         staticClass:"a b",
//       //         class:[y, 'y'],
//       //         attrs:{value:(__toString__(y)+"asdfasdfaf")},
//       //         // atom: true
//       //       }),
//       //       []
//       //     )
//       //   ]
//       // )
//     }
//   }
// })
// // testing registerModules()
// console.log(__weex_require_module__('dom'))
// // testing registerComponents()
// registerComponents(['a', {name: 'b'}, null])
// console.log(Vue.config.isReservedTag('a'))
// console.log(Vue.config.isReservedTag('b'))
// console.log(Vue.config.isReservedTag('c'))

// /**
//  * Example 1
//  * div > text + image
//  */
// return new Vue({
//   el: 'scroller',
//   stream: true,
//   render: function () {
//     with (this) {
//       return _h(
//         _e('div', {
//           staticAttrs: {a: '1', b: '2'}
//         }),
//         [
//           _t('hello'),
//           _h(
//             _e('image', {
//               staticAttrs: {
//                 src: 'http://www.baidu.com/favicon.ico',
//                 style: 'width: 32px; height: 32px;'
//               }
//             })
//           )
//         ]
//       )
//     }
//   }
// })

// /**
//  * Example 2
//  * div > text + image (static)
//  */
// return new Vue({
//   el: 'scroller',
//   stream: true,
//   render: function () {
//     with (this) {
//       return _h(
//         _e('div', {
//           staticAttrs: {a: '1', b: '2'}
//         }),
//         [
//           _t('hello'),
//           _m(0)
//         ]
//       )
//     }
//   },
//   staticRenderFns: [
//     function () {
//       with (this) {
//         return _h(
//           _e('image', {
//             staticAttrs: {
//               src: 'http://www.baidu.com/favicon.ico',
//               style: 'width: 64px; height: 64px;'
//             }
//           })
//         )
//       }
//     }
//   ]
// })

// /**
//  * Example 3
//  * div > text + image (dynamic)
//  */
// return new Vue({
//   el: 'scroller',
//   data: {url: 'http://www.baidu.com/favicon.ico'},
//   stream: true,
//   render: function () {
//     with (this) {
//       return _h(
//         _e('div', {
//           staticAttrs: {a: '1', b: '2'}
//         }),
//         [
//           _t('hello'),
//           _h(
//             _e('image', {
//               attrs: {
//                 src: url
//               },
//               staticAttrs: {
//                 style: 'width: 48px; height: 48px;'
//               }
//             })
//           )
//         ]
//       )
//     }
//   }
// })

// /**
//  * Example 4
//  * component
//  */
// Vue.component('foo', {
//   data: function () { return {url: 'http://www.baidu.com/favicon.ico'}},
//   stream: true,
//   render: function () {
//     with (this) {
//       return _h(
//         _e('div', {
//           staticAttrs: {a: '1', b: '2'}
//         }),
//         [
//           _t('hello'),
//           _h(
//             _e('image', {
//               attrs: {
//                 src: url
//               },
//               staticAttrs: {
//                 style: 'width: 48px; height: 48px;'
//               }
//             })
//           )
//         ]
//       )
//     }
//   }
// })
// return new Vue({
//   el: 'scroller',
//   stream: true,
//   render: function () {
//     with (this) {
//       return _h(_e('foo'), [])
//     }
//   }
// })

/**
 * Example 5
 * atom=tree
 */
Vue.component('foo', {
  data: function () { return {url: 'http://www.baidu.com/favicon.ico'}},
  stream: true,
  render: function () {
    with (this) {
      return _h(
        _e('div', {
          staticAttrs: {a: '1', b: '2'},
          atom: true
        }),
        [
          _t('hello'),
          _h(
            _e('image', {
              attrs: {
                src: url
              },
              staticAttrs: {
                style: 'width: 48px; height: 48px;'
              }
            })
          )
        ]
      )
    }
  }
})
return new Vue({
  el: 'scroller',
  stream: true,
  render: function () {
    with (this) {
      return _h(_e('foo', {
        atom: true
      }))
    }
  }
})
