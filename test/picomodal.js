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
        $.assert.equal(modal.modalElem().style.backgroundColor, "orange");

        $.assert.equal(modal.overlayElem().style.borderColor, "yellow");
        $.assert.equal(modal.overlayElem().style.backgroundColor, "green");

        $.assert.equal(modal.closeElem().style.borderColor, "blue");
        $.assert.equal(modal.closeElem().style.backgroundColor, "purple");

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
        $.assert.equal(modal.modalElem().style.backgroundColor, "orange");
        $.assert.equal(modal.modalElem().style.padding, "20px");

        done();
    })

    .should("Be destroyable").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");
        $.assert.equal($.query(".pico-content").count, 0);

        modal.show();
        $.assert.equal($.query(".pico-content").count, 1);

        modal.close();
        $.assert.equal($.query(".pico-content").count, 1);

        modal.destroy();
        $.assert.equal($.query(".pico-content").count, 0);

        done();
    })

    .should("Allow its DOM to be prebuilt").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");
        $.assert.isFalse( modal.isVisible() );
        $.assert.equal($.query(".pico-content").count, 0);

        modal.buildDom();
        $.assert.isFalse( modal.isVisible() );
        $.assert.equal($.query(".pico-content").count, 1);

        done();
    })


    .and("The modal close button")

    .should("Be disableable").in(function (done, $) {
        $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            closeButton: false
        }).show();

        $.assert.equal($.query("pico-close").count, 0);

        done();
    })

    .should("Support custom html").in(function (done, $) {
        $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            closeHtml: "Close this thing!"
        }).show();

        $.assert.equal(
            $.query(".pico-close").one().text(),
            "Close this thing!");

        done();
    })


    .and("Setting an alternate modal parent")

    .should("Allow an alternate parent from a selector").using(
        "<div id='myParent'></div>"
    ).in(function (done, $) {
        var modal = $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            parent: "#myParent"
        }).show();

        $.assert.equal(
            $.query("#myParent").one().elem,
            modal.modalElem().parentNode );

        done();
    })

    .should("Allow an alternate parent from an element").using(
        "<div id='myParent'></div>"
    ).in(function (done, $) {
        var modal = $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            parent: $.query("#myParent").one().elem
        }).show();

        $.assert.equal(
            $.query("#myParent").one().elem,
            modal.modalElem().parentNode );

        done();
    })


    .and("The modal overlay")

    .should("Close the modal when clicked").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");
        modal.show();

        $.query(".pico-overlay").one().click();
        $.assert.isFalse( modal.isVisible() );

        done();
    })

    .should("Allow shadow clicks to be disabled").in(function (done, $) {
        var modal = $.picoModal({
            content: "Curse your sudden but inevitable betrayal!",
            overlayClose: false
        });
        modal.show();

        $.query(".pico-overlay").one().click();
        $.assert.isTrue( modal.isVisible() );

        done();
    })


    .and("Modal events")

    .should("be triggered").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");

        var status = "new";

        function checkStatus(previous, next, isVisible) {
            return function (m) {
                $.assert.equal(status, previous);
                $.assert.equal(m, modal);
                $.assert.equal( modal.isVisible(), isVisible );
                status = next;
            };
        }

        modal
            .beforeShow(checkStatus("new", "beforeShow", false))
            .afterCreate(checkStatus("beforeShow", "afterCreate", false))
            .afterShow(checkStatus("afterCreate", "afterShow", true))
            .beforeClose(checkStatus("open", "beforeClose", true))
            .afterClose(checkStatus("beforeClose", "afterClose", false));

        modal.show();
        $.assert.equal(status, "afterShow");
        status = "open";

        modal.close();
        $.assert.equal(status, "afterClose");

        done();
    })

    .should("Trigger afterCreate from buildDom").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");
        modal
            .afterCreate(done)
            .beforeShow( $.assert.fail )
            .afterShow( $.assert.fail );
        modal.buildDom();
    })

    .should("Allow `beforeShow` to prevent show").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");

        modal
            .beforeShow(function (m, event) {
                event.preventDefault();
            })
            .afterCreate( $.assert.fail )
            .afterShow( $.assert.fail );

        $.assert.isFalse( modal.isVisible() );
        done();
    })

    .should("Allow `beforeClose` to prevent close").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");

        modal
            .beforeClose(function (m, event) {
                event.preventDefault();
            })
            .afterClose( $.assert.fail )
            .show()
            .close();

        $.assert.isTrue( modal.isVisible() );
        done();
    })

    .should("Bypass `beforeClose` with `forceClose`").in(function (done, $) {
        var modal = $.picoModal("Curse your sudden but inevitable betrayal!");

        modal
            .beforeClose( $.assert.fail )
            .afterClose(function () {
                $.assert.isFalse( modal.isVisible() );
                done();
            })
            .show()
            .forceClose();
    })


    .and("Modal accessibility")

    .should("Add an ID to every modal").skip(function () {
        throw new Error();
    })

    .should("Allow a custom ID to be added").skip(function () {
        throw new Error();
    })

    .should("Allow custom aria attributes").skip(function () {
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

    ;

