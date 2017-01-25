// Type definitions for PicoModal 3.0.0
// Project: https://github.com/Nycto/PicoModal
// Definitions by: Aluísio Augusto Silva Gonçalves <https://github.com/AluisioASG>

export as namespace picoModal
export = picoModal

declare function picoModal(content: string | Node): picoModal.Modal
declare function picoModal(options: picoModal.Options): picoModal.Modal


declare namespace picoModal {
    type Option<T> = T | ((defaultValue: T | undefined) => T)
    type Html = string | Node
    type CssProps = {[key: string]: any}
    type Callback<T> = (context: T, event: {detail: any, preventDefault: () => void}) => void

    export interface Options {
        content?: Option<Html>
        width?: Option<string | number>
        closeButton?: Option<boolean>
        closeHtml?: Option<Html>
        closeStyles?: Option<CssProps>
        closeClass?: Option<string>
        overlayClose?: Option<boolean>
        overlayStyles?: Option<CssProps>
        overlayClass?: Option<string>
        modalStyles?: Option<CssProps>
        modalClass?: Option<string>
        modalId?: Option<string>
        parent?: Option<string | Node>
        escCloses?: Option<boolean>
        focus?: Option<boolean>
        ariaDescribedBy?: Option<string>
        ariaLabelledBy?: Option<string>
        bodyOverflow?: Option<boolean>
    }

    export interface Modal {
        /**
         * Returns the wrapping modal element.
         */
        modalElem: () => HTMLElement
        /**
         * Returns the close button element.
         */
        closeElem: () => HTMLElement
        /**
         * Returns the overlay element.
         */
        overlayElem: () => HTMLElement
        /**
         * Shows this modal.
         */
        show: (detail?: any) => this
        /**
         * Builds the DOM without showing the modal.
         */
        buildDom: (detail?: any) => this
        /**
         * Hides this modal.
         */
        close: (detail?: any) => this
        /**
         * Force closes this modal.  This will not call beforeClose events and will
         * just immediately hide the modal
         */
        forceClose: (detail?: any) => this
        /**
         * Destroys this modal.
         */
        destroy: () => void
        /**
         * Returns whether this modal is currently being shown.
         */
        isVisible: () => boolean
        /**
         * Updates the options for this modal.  This will only let you change
         * options that are re-evaluted regularly, such as `overlayClose`.
         */
        options: (options: Options) => void

        /**
         * Registers a callback to invoke when the modal is created.
         */
        afterCreate: (callback: Callback<this>) => this
        /**
         * Registers a callback to invoke before the modal is shown.
         */
        beforeShow: (callback: Callback<this>) => this
        /**
         * Registers a callback to invoke when the modal is shown.
         */
        afterShow: (callback: Callback<this>) => this
        /**
         * Registers a callback to invoke before the modal is closed.
         */
        beforeClose: (callback: Callback<this>) => this
        /**
         * Registers a callback to invoke when the modal is closed.
         */
        afterClose: (callback: Callback<this>) => this
    }
}
