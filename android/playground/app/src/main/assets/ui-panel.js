define('@weex-component/ui-panel', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      type: 'default',
      title: '',
      paddingBody: 20,
      paddingHead: 20,
      dataClass: '', // FIXME transfer class
      border: 0
    }},
    ready: function() {
      console.log(this.data);
    }
  }


;module.exports.style = {
  "panel": {
    "marginBottom": 20,
    "backgroundColor": "#ffffff",
    "borderColor": "#dddddd",
    "borderWidth": 1
  },
  "panel-primary": {
    "borderColor": "rgb(40,96,144)"
  },
  "panel-success": {
    "borderColor": "rgb(76,174,76)"
  },
  "panel-info": {
    "borderColor": "rgb(70,184,218)"
  },
  "panel-warning": {
    "borderColor": "rgb(238,162,54)"
  },
  "panel-danger": {
    "borderColor": "rgb(212,63,58)"
  },
  "panel-header": {
    "backgroundColor": "#f5f5f5",
    "fontSize": 40,
    "color": "#333333"
  },
  "panel-header-primary": {
    "backgroundColor": "rgb(40,96,144)",
    "color": "#ffffff"
  },
  "panel-header-success": {
    "backgroundColor": "rgb(92,184,92)",
    "color": "#ffffff"
  },
  "panel-header-info": {
    "backgroundColor": "rgb(91,192,222)",
    "color": "#ffffff"
  },
  "panel-header-warning": {
    "backgroundColor": "rgb(240,173,78)",
    "color": "#ffffff"
  },
  "panel-header-danger": {
    "backgroundColor": "rgb(217,83,79)",
    "color": "#ffffff"
  },
  "panel-body": {}
}

;module.exports.template = {
  "type": "div",
  "classList": function () {return ['panel', 'panel-' + (this.type)]},
  "style": {
    "borderWidth": function () {return this.border}
  },
  "children": [
    {
      "type": "text",
      "classList": function () {return ['panel-header', 'panel-header-' + (this.type)]},
      "style": {
        "paddingTop": function () {return this.paddingHead},
        "paddingBottom": function () {return this.paddingHead},
        "paddingLeft": function () {return this.paddingHead*1.5},
        "paddingRight": function () {return this.paddingHead*1.5}
      },
      "attr": {
        "value": function () {return this.title}
      }
    },
    {
      "type": "div",
      "classList": function () {return ['panel-body', 'panel-body-' + (this.type)]},
      "style": {
        "paddingTop": function () {return this.paddingBody},
        "paddingBottom": function () {return this.paddingBody},
        "paddingLeft": function () {return this.paddingBody*1.5},
        "paddingRight": function () {return this.paddingBody*1.5}
      },
      "children": [
        {
          "type": "content"
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/ui-panel', {"transformerVersion":"0.1.8"})