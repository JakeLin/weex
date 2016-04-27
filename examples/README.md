# Example Guide

## Add an example

* Add a file `newExample.we` copied from [template](./template.we) with [UI Gallery](#ui-gallery) (recommend).
* In [index.we](./index.we), add an item `{name: 'newExample', title: 'New Example'}` for array `data.cases`

## Rule

0. File name is hyphen separated words, each word is lower case, like `.we`, `ui-button.we`
0. DO NOT use [builtin components](../doc/components) name as file name, it may be failed ro run. 

## UI Gallery

> Inspired by Bootstrap.

We import a simple UI Gallery for a consistent UI style. See [UI Gallery Example](./ui.we) for details.

<img src="http://gtms04.alicdn.com/tps/i4/TB1_v6FMpXXXXXfXXXX7XWpVpXX-278-519.gif" width="160" /> <img src="http://gtms03.alicdn.com/tps/i3/TB13LTOMpXXXXceXXXXIxc4RpXX-944-1316.png" width="214" />

Reference:

## Button
 
[**ui-button**](./ui-button.we)

* Attributes: 
    * `type`, ***default*** | primary | success | info | warning | danger | link 
    * `size`, ***large*** | middle | small
    * `value`
    * `disabled`, ***false*** | true
* Event: 
    * `click`
* Example:
    
    <img src="http://gtms01.alicdn.com/tps/i1/TB1uUzOMpXXXXXuXpXXqnuiVpXX-278-456.gif" width="160" />

## Panel

[**ui-panel**](./ui-panel.we)

* Attributes: 
    * `type`, ***default*** | primary | success | info | warning | danger 
    * `title`
    * `border`, number
* Example:
    
    <img src="http://gtms04.alicdn.com/tps/i4/TB18drzMpXXXXc9XFXXHO6y1XXX-319-615.png" width="160" />
    
## Hn
 
[**ui-hn**](./ui-hn.we)

* Attributes: 
    * `level`, ***1*** | 2 | 3
* Example:
    
    <img src="http://gtms02.alicdn.com/tps/i2/TB1BZYMMpXXXXaYXpXXVSoUTpXX-275-203.png" width="160" />

## Tip
 
[**ui-tip**](./ui-tip.we)

* Attributes: 
    * `type`, ***success*** | info | warning | danger 
    * `value`, ***large*** | middle | small
    * `value`
    * `disabled`, ***false*** | true
* Example:
    
    <img src="http://gtms03.alicdn.com/tps/i3/TB1x5DJMpXXXXb2XpXXnTPSZVXX-320-367.png" width="160" />

## List
 
[**ui-list-item**](./ui-list-item.we)

* Event: 
    * `click`
* Example:
    
    <img src="http://gtms04.alicdn.com/tps/i4/TB1qzjNMpXXXXabXpXX9it9VpXX-278-357.gif" width="160" />