Structural abstraction for ambitious framework.

Build on top of AngularJS.

Represents a mid-level building block.  
Used to compose elements and other composits and expose logic to modify states.  
Consists of a directive with isolated scope + controller + state + channel.

## What is 'composite'?
Composite is a **mid-level** building block for your app.  
It is used to **combine elements and other composite** in a customized piece of UI.

It is represented by a custom tag in your markup:
``` 
<my-composite></my-composite>
```
This custom tag can be **replaced** in a final markup by it's template.

## How do I use it?

* Use it for a piece of the page, composed of low-level components.  
* Composite defines the relations between element [states](https://github.com/mr-mig/am.state) using [links](https://github.com/mr-mig/am.link) and [channels](https://github.com/mr-mig/am.channel)

## What is the difference between 'element' and 'composite'?

Roles:
* Element can modify only **it's internal state**.
* Composite makes elements talk to each other.

Portability:
* Element is totally reusable between apps
* Composite can be tightly bounded to the app

Functional:
* Element has only a `postlink` function
* Composite can have a `controller`
* Composite can be **replaced** by it's template

## Conventions
* Composite MUST have some `state` (controlled by framework, fallback to a default empty object state)
* Composite MUST bind it's state to some namespace through HTML state attribute (controlled by user)
* Composite CAN change the state of underlying elements directly or via `link` and `channel`
* Composite CAN react on channel signals (controlled by framework)
* Composite CAN omit channel binding through HTML channel attribute
* Composite CAN provide the API by binding elements' `state` to it's own `state` (controlled by user)
* Composite CAN be replaced by it's template in the resulting markup
