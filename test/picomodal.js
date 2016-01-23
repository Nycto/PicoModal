var testing = require('grunt-dom-test');

testing.a("modal")
    .withFile("src/picoModal.js")
    .withUtility("node_modules/chai/chai.js")

    .setup(function ($) {
        $.assert = $.window.chai.assert;
        $.picoModal = $.window.picoModal;
    })

    .should("Be created when 'show' is called").in(function (done, $) {
        $.picoModal("<div>Modal content</div>").show();
        $.assert.equal(
            $.query(".pico-content div").one().text(),
            "Modal content");
        done();
    })

    .should("Be creatable with existing DOM content").using(
        "<div id='myContent'>Modal!</div>"
    ).in(function (done, $) {

        $.picoModal( $.query("#myContent").one().elem ).show();

        $.assert.equal(
            $.query(".pico-content #myContent").one().text(),
            "Modal!" );

        $.query("#myContent").one();

        done();
    })

    .should("Be re-usable via .show and .close").in(function (done, $) {
        var modal = $.picoModal("My content");
        $.assert.isFalse( modal.isVisible() );

        modal.show();
        $.assert.isTrue( modal.isVisible() );

        modal.close();
        $.assert.isFalse( modal.isVisible() );

        modal.show();
        $.assert.isTrue( modal.isVisible() );

        done();
    })

    .should("Allow a specific width to be set").in(function (done, $) {
        $.picoModal({
            content: "Ah, the pitter patter of tiny feet in huge combat boots",
            width: 50
        }).show();

        $.assert.equal('50px', $.query(".pico-content").one().styles().width);

        done();
    })

    .should("Allow custom classes to be added").in(function (done, $) {
        var modal = $.picoModal({
            content: "Ah, the pitter patter of tiny feet in huge combat boots",
            modalClass: "my-modal",
            overlayClass: "my-overlay",
            closeClass: "my-close"
        }).show();

        $.assert.equal($.query(".my-modal").one().elem, modal.modalElem());
        $.assert.equal($.query(".my-overlay").one().elem, modal.overlayElem());
        $.assert.equal($.query(".my-close").one().elem, modal.closeElem());

        done();
    })

    .should("Allow custom styles to be set").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow the close button to be disabled").skip(function (done, $) {
        throw new Error();
    })

    .should("Close when the shadow is clicked").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow shadow clicks to be disabled").skip(function (done, $) {
        throw new Error();
    })

    .should("Trigger events").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow `beforeShow` to prevent show").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow `beforeClose` to prevent close").skip(function (done, $) {
        throw new Error();
    })

    .should("Bypass `beforeClose` with `forceClose`").skip(function (done, $) {
        throw new Error();
    })

    .should("Be destroyable").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow its DOM to be prebuilt").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow an alternate document parent").skip(function (done, $) {
        throw new Error();
    })

    .should("Set focus on the first element").skip(function (done, $) {
        throw new Error();
    })

    .should("Loop the tab key back to the start").skip(function (done, $) {
        throw new Error();
    })

    .should("Loop shift-tab to the end").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow focus capture to be disabled").skip(function (done, $) {
        throw new Error();
    })

    .should("Close the modal when escape is pressed").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow 'escape to close' to be disabled").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow customizing the close button html").skip(function (done, $) {
        throw new Error();
    })

    .should("Add an ID to every modal").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow a custom ID to be added").skip(function (done, $) {
        throw new Error();
    })

    .should("Allow custom aria attributes").skip(function (done, $) {
        throw new Error();
    })

    ;

