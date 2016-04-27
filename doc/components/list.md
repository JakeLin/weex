# &lt;list&gt;

### Summary

A fixed height container which has multiple child components (cells) arranged in one column. If total height of its child components is higher then the height of itself, the whole child components are scrollable and it's high-performanced.

**Notes:** height of `list` must be specified (list's styles must contain `height` or pair of `top`, `bottom` or flex value if outter container's `flex-direction` value is `column`).

### Child Components

`cell` is a available candidate to be used as a child component for `list`.

### Attributes

- `loadmoreoffset`: &lt;number&gt; the offset distance downwards the bottom of the list to trigger the loadmore event, which is triggered when the list scrolls down near enough to the bottom.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**common styles**: check out [common styles for components](../references/common-style.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

- `loadmore`: if the list scrolls to bottom, this event will be triggered immediately. You can load the next page of items in this event handler.

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Example

```
<template>
  <list>
    <cell repeat="{{list}}">
      <text>{{name}}: ${{price}}</text>
    </cell>
  </list>
</template>

<script>
  module.exports = {
    data: {
      list: [
        {name: '...', price: 100},
        {name: '...', price: 500},
        {name: '...', price: 1.5},
        ...
      ]
    }
  }
</script>
```
