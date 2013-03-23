PicoModal [![Build Status](https://secure.travis-ci.org/Nycto/PicoModal.png?branch=master)](http://travis-ci.org/Nycto/PicoModal)
=========

A small, self-contained JavaScript modal library

Features
--------

* Small: At just over 1.6kb, its small and easily embeddable
* No Library Dependencies: PicoModal does not depend on any JS libraries,
  so you can use it in places where you don't have access to one.
* Self-contained: No extra CSS or images required
* Simple: The interface is easy to use
* Customizable: Its easy to apply your own styling

Browser Support
---------------

IE7+, Chrome, FireFox, Safari and Opera

Example Code
------------

If all you want to do is display a modal, it's as easy as
this: ([Run this code](http://jsfiddle.net/z2t9e/))

```javascript
  picoModal("Ah, the pitter patter of tiny feet in huge combat boots.");
```

For more control over the behaviour of the modal, you can pass in a
settings object: ([Run this code](http://jsfiddle.net/BqHeY/))

```javascript
  picoModal({
      content: "Ah, the pitter patter of tiny feet in huge combat boots.",
      overlayStyles: {
          backgroundColor: "#169",
          opacity: 0.75
      }
  });
```

A full list of settings is documented below.

If you need to be able to programatically close the modal you can do it like
this: ([Run this code](http://jsfiddle.net/8pPTD/))

```javascript
  var modal = picoModal(
      "<p>Ah, the pitter patter of tiny feet in huge combat boots.<p>"
      + "<p><a href='#' class='dismiss'>Dismiss</a></p>"
  );

  document.getElementsByClassName("dismiss")[0].onclick = function () {
      modal.close();
  };
```

You can also attach an event to fire when the modal is closed:
([Run this code](http://jsfiddle.net/TM95X/))

```javascript
  var modal = picoModal(
      "Ah, the pitter patter of tiny feet in huge combat boots."
  );

  modal.onClose(function () {
      alert("Closed");
  });
```

To disable the close button, and instead just rely on someone clicking
outside of the modal, you can do this:
([Run this code](http://jsfiddle.net/dwhcX/))

```javascript
  picoModal({
      content: "Ah, the pitter patter of tiny feet in huge combat boots.",
      closeButton: false
  });
```

Or, to disable closing when someone clicks outside of the modal, you can
do this: ([Run this code](http://jsfiddle.net/WkG3d/))

```javascript
  picoModal({
      content: "Ah, the pitter patter of tiny feet in huge combat boots.",
      overlayClose: false
  });
```

Settings
--------

The following settings are available:

* __content__: The data to display to the user
* __width__: The forced width of the modal
* __closeButton__: Boolean whether to display the close button
* __overlayClose__: Boolean whether a click on the shadow should close the modal
* __overlayStyles__: A hash of additional CSS properties to apply to the
  overlay behind the modal
* __modalStyles__: A hash of additional CSS properties to apply to the
  modal element
* __closeStyles__: A hash of additional CSS properties to apply to the
  close button element

Return Object Properties
------------------------

The following properties are available on the object returned by picoModal:

* __modalElem__: A reference to the modal DOM element
* __closeElem__: A reference to the close DOM element
* __overlayElem__: A reference to the overlay DOM element
* __close__: A function to close the modal
* __onClose__: A function that registers a callback to invoke when the
  modal is closed

License
-------

PicoModal is released under the MIT License, which is pretty spiffy. You should
have received a copy of the MIT License along with this program. If not, see
http://www.opensource.org/licenses/mit-license.php

