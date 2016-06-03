# &lt;switch&gt;
<span class="weex-version">0.4</span>

### Summary

The weex builtin component `switch` is used to create and manage a IOS styled On/Off buttons used, for example, in the Settings app for options such as 'muted' and 'toggle color'.

### Child Components

This component supports no child components.

### Attributes

- `checked`: &lt;boolean&gt; `true` | `false`. The initial value of whether the status of this button is On or Off.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**common styles**: check out [common styles for components](../references/common-style.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

**Notes:** The `width` and `height` is not configurable and the size of this component is fixed to `100x60` (for the design width 750px).

### Events

- `click`: check out [common events](../references/common-event.md)

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Parameters of events' object

- for `change` event:
  - value: the value of the component who dispatched this event, which is the boolean value ``true`` or ``false``.
  - timestamp: the time stamp of the event.

### Example

```html
<div>
  <text>muted:</text>
  <switch checked="true"></switch>
</div>
```
