/* jshint globalstrict: true */
/* global require */

"use strict";

var testing = require('grunt-dom-test');

testing.a("modal")
    .withFile("src/picoModal.js")
    .withUtility("node_modules/chai/chai.js")

    .setup(function ($) {
        $.assert = $.window.chai.assert;
        $.picoModal = $.window.picoModal;
    })

    .should("Be created when 'show' is called").in(function (done, $) {
        $.picoModal(
            "<div>Curse your sudden but inevitable betrayal!</div>"
        ).show();
        $.assert.equal(
            $.query(".pico-content div").one().text(),
            "Curse your sudden but inevitable betrayal!");
        done();
    })

    .should("Be creatable with existing DOM content").using(
        "<div id='myContent'>Curse your sudden but inevitable betrayal!</div>"
    ).in(function (done, $) {

        $.picoModal( $.query("#myContent").one().elem ).show();

        $.assert.equal(
            $.query(".pico-content #myContent").one().text(),
            "Curse your sudden but inevitable betrayal!" );

        $.query("#myContent").one();

        done();
    })

    .should("Be re-usable via .show and .close").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");
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
            content: "Curse your sudden but inevitable betrayal!",
            width: 50
        }).show();

        $.assert.equal( '50px', $.query(".pico-content").one().styles().width );

        done();
    })

    .should("Allow custom classes to be added").in(function (done, $) {
        var modal = $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            modalClass: "my-modal",
            overlayClass: "my-overlay",
            closeClass: "my-close"
        }).show();

        $.assert.equal( $.query(".my-modal").one().elem, modal.modalElem());
        $.assert.equal( $.query(".my-overlay").one().elem, modal.overlayElem());
        $.assert.equal( $.query(".my-close").one().elem, modal.closeElem());

        done();
    })

    .should("Allow functions as options").in(function (done, $) {
        var modal = $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            width: function (def) {
                $.assert.equal(def, 'auto');
                return 200;
            }
        }).show();

        $.assert.equal('200px', modal.modalElem().style.width);

        done();
    })

    .should("Allow custom styles to be set").in(function (done, $) {
        var modal = $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            modalStyles: { border: "1px solid red", background: "orange" },
            overlayStyles: { border: "1px solid yellow", background: "green" },
            closeStyles: { border: "1px solid blue", background: "purple" }
        }).show();

        $.assert.equal(modal.modalElem().style.borderColor, "red");
        $.assert.equal(modal.modalElem().style.background, "orange");

        $.assert.equal(modal.overlayElem().style.borderColor, "yellow");
        $.assert.equal(modal.overlayElem().style.background, "green");

        $.assert.equal(modal.closeElem().style.borderColor, "blue");
        $.assert.equal(modal.closeElem().style.background, "purple");

        done();
    })

    .should("Allow styles to be modified").in(function (done, $) {
        var modal = $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            modalStyles: function (styles) {
                styles.border = "1px solid red";
                styles.background = "orange";
            }
        }).show();

        $.assert.equal(modal.modalElem().style.borderColor, "red");
        $.assert.equal(modal.modalElem().style.background, "orange");
        $.assert.equal(modal.modalElem().style.padding, "20px");

        done();
    })

    .should("Allow the close button to be disabled").skip(function () {
        throw new Error();
    })

    .should("Close when the shadow is clicked").skip(function () {
        throw new Error();
    })

    .should("Allow shadow clicks to be disabled").skip(function () {
        throw new Error();
    })

    .should("Trigger events").skip(function () {
        throw new Error();
    })

    .should("Allow `beforeShow` to prevent show").skip(function () {
        throw new Error();
    })

    .should("Allow `beforeClose` to prevent close").skip(function () {
        throw new Error();
    })

    .should("Bypass `beforeClose` with `forceClose`").skip(function () {
        throw new Error();
    })

    .should("Be destroyable").skip(function () {
        throw new Error();
    })

    .should("Allow its DOM to be prebuilt").skip(function () {
        throw new Error();
    })

    .should("Allow an alternate document parent").skip(function () {
        throw new Error();
    })

    .should("Set focus on the first element").skip(function () {
        throw new Error();
    })

    .should("Loop the tab key back to the start").skip(function () {
        throw new Error();
    })

    .should("Loop shift-tab to the end").skip(function () {
        throw new Error();
    })

    .should("Allow focus capture to be disabled").skip(function () {
        throw new Error();
    })

    .should("Close the modal when escape is pressed").skip(function () {
        throw new Error();
    })

    .should("Allow 'escape to close' to be disabled").skip(function () {
        throw new Error();
    })

    .should("Allow customizing the close button html").skip(function () {
        throw new Error();
    })

    .should("Add an ID to every modal").skip(function () {
        throw new Error();
    })

    .should("Allow a custom ID to be added").skip(function () {
        throw new Error();
    })

    .should("Allow custom aria attributes").skip(function () {
        throw new Error();
    })

    ;

