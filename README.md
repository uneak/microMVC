# microMVC
>v.0.0.0

Minimalist Javascript MVC Framework

## Features
*	loosely coupled system
*	each components (model, view, controller) is a mediator
*	a component can register, unregister, and call subscriber methods
*	no dependencies on any other libraries
*	ultra light library

## Installation
using Bower:

```shell
$ bower install micro-mvc
```

## Getting Started

>load library:

```html
<script type="text/javascript" src="microMVC/dist/js/micromvc.min.js"></script> 
```

>Create application:

```javascript
var app = new microMVC.Application();
```

>Add a controller:

```javascript
app.controllers.add("appctrl", {
    
});
```

>Add a model:

```javascript
app.models.add("appmodel", {

});
```

>Add a view:

```javascript
app.views.add("appview", {

});
```

## API

### Add a element to a component
```javascript
app.{component}.add("{element id}", {element object}, {extended class});
```

### Subscribe to a event
```javascript
app.{component}.subscribe({context}, {scope}, {callback});
```

### Publish a event
```javascript
app.{component}.publish({context}, {event});
```

### Call method from a element component
```javascript
app.{component}.call({path}, {argument});
```

## Copyright and license

Copyright © 2015 Marc Galoyer (http://marc.galoyer.com)

Licensed under the **MIT** (http://raphaeljs.com/license.html) license.
