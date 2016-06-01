# Virtual DOM APIs

### `Document`

Each instance has a corresponding document with the instance id. A document has many nodes which compose a node tree.

#### Constructor

* `new Document(id: string, url: string?)`

#### Members

* `createBody(type: string, props: Object?): Element`  
Create document body. The `type` must be one of `div`, `list` or `scroller`. And the `props` may contain `attr` object and `style` object. e.g. `createBody('div', {style: {backgroundColor: '#ffffff'}})`
* `createElement(tagName: string, props: Object?): Element`  
Create a certain type `Element` with props.
* `createComment(text: string): Comment`  
Create a `Comment` with a certain comment text.
* `open()`  
Set a flag which means init rendering start, so each dom update will be called immediately
* `close()`  
Set a flag which means init rendering finished, so the dom updates later will be batched in each task.
* `fireEvent(el: Element, type: string, e: Object?, domChanges: Object?)`  
Fire an certain type of event on a certain element with an event object. When the event leads to some dom changes, the fourth parameter will describe the change just like `props` parameter in `createElement` method.

**Read-only & Getters**

* `body: Node`  
document body element
* `getRef(ref: string): Node?`  
Get node by `ref` from the internal node map

### `Node`

#### Constructor

* `new Node()`

#### Members

* `next(): Node?`  
Returns the next sibling or null
* `prev(): Node?`  
Returns the previous sibling or null
* `destroy()`

**Read-only & Getters**

* `ref: string` unique

### `Element` extends `Node`

#### Constructor

* `new Element(type: string, props: Object?, ownerDocument: Document)`  
Create an element and the `props` may contain `attr` object and `style` object.

#### Members

**DOM Tree**

* `appendChild(node: Node)`
* `insertBefore(node: Node, before: Node?)`
* `insertAfter(node: Node, after: Node?)`
* `removeChild(node: Node, preserved: boolean?)`  
Removes a child. The parameter `preserved` means whether destroy the removed node immediately or preserve it.
* `clear()`

**DOM props**

* `setAttr(key: string, value: string, silent: boolean?)`  
If `slient` is truthy, it won't cause native calls. Used for handling event with virtual-DOM changes.
* `setStyle(key: string, value: string, silent: boolean?)`  
The `slient` parameter is just same as `setAttr` method.
* `setClassStyle(classStyle: Object)`  
The specificity of class style is lower than normal style. In another way the normal style will override the same name value in class style.
* `addEvent(type: string, handler: Function)`
* `removeEvent(type: string)`

**Read-only & Getters**

* `toJSON()`  
Format of `{ref: string, type: string, attr: Object, style: Object, event: Array(string), children: Array}`

### `Comment` extends `Node`

`Comment` won't be passed to the rendering engine. So it's very useful as a assistant placeholder sometimes.

#### Constructor

* `new Comment(value: string, ownerDocument: Document)`

#### Members

**Read-only & Getters**

* `type` Returns `'comment'`
* `value`
