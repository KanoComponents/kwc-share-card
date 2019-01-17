/**
`kwc-share-action`
Perform actions such as like, remix or "send to kit" on the `kwc-share-card`.

### Styling

`<kwc-share-action>` provides the following custom properties and mixins
for styling:

Custom property | Description | Default
----------------|-------------|----------
`--kwc-share-action-wrapper-color` | Default background color of the wrapper | `#f6f7f9`
`--kwc-share-action-label-color` | Default color of the icon | `--color-chateau`
`--kwc-share-action-icon-color` | Default color of the icon | `--color-grey`
`--kwc-share-action-wrapper-hover-color` | Color of the icon when hovering | `#e5e8eC`
`--kwc-share-action-icon-hover-color` | Color of the icon when hovering | `--color-grey`
`--kwc-share-action-label-hover-color` | Color of the label when hovering | `--color-chateau`
`--kwc-share-action-wrapper-active-color` | Color of the icon when active | `#e5e8eC`
`--kwc-share-action-icon-active-color` | Color of the icon when active | `--color-grey`
`--kwc-share-action-label-active-color` | Color of the label when active | `--color-chateau`
`--kwc-share-action-wrapper-active-hover-color` | Hover color of the icon when active | `#e5e8eC`
`--kwc-share-action-icon-active-hover-color` | Hover color of the icon when active | `--color-grey`
`--kwc-share-action-label-active-hover-color` | Hover color of the label when active | `--color-chateau`

@demo demo/index-action.html
*/

import '@kano/kwc-style/kwc-style.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class KwcShareAction extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
                font-family: var(--font-body);
                cursor: var(--kwc-share-action-host-cursor, pointer);
                font-size: 16px;
                font-weight: bold;
            }

            /*DEFAULT STATE*/
            .wrapper {
                padding: 5.6px 15px;
                background-color: var(--kwc-share-action-wrapper-color, #f6f7f9);
                border-radius: 34px;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
            .label-container {
                color: var(--kwc-share-action-label-color, var(--color-chateau));
            }
            .label-container.extra-margin {
                margin-left: 9px;
                margin-right: 4px;
            }
            .label-container.extra-margin:empty {
                margin: 0px;
            }

            /*HOVER STATE*/
            .wrapper:hover {
                background-color: var(--kwc-share-action-wrapper-hover-color, #e5e8eC);
            }
            .wrapper:hover .icon-container ::slotted(*) {
                fill: var(--kwc-share-action-icon-hover-color, var(--kwc-share-action-icon-color));
            }
            .wrapper:hover .label-container {
                color: var(--kwc-share-action-label-hover-color, var(--kwc-share-action-label-color));
            }

            /*ACTIVE STATE*/
            .wrapper.active {
                background-color: var(--kwc-share-action-wrapper-active-color, #e5e8eC);
            }
            .active .label-container {
                color: var(--kwc-share-action-label-active-color, var(--color-chateau));
            }
            .active .icon-container ::slotted(*) {
                fill: var(--kwc-share-action-icon-active-color, var(--color-grey));
            }
            .active .icon {
                fill: var(--kwc-share-action-icon-active-color, var(--color-grey));
            }

            /*ACTIVE HOVER STATE*/
            .wrapper.active:hover {
                background-color: var(--kwc-share-action-wrapper-active-hover-color, #e5e8eC);
            }
            .wrapper.active:hover .icon-container ::slotted(*) {
                fill: var(--kwc-share-action-icon-active-hover-color, var(--kwc-share-action-icon-active-color));
            }
            .wrapper.active:hover .label-container {
                color: var(--kwc-share-action-label-active-hover-color, var(--kwc-share-action-label-active-color));
            }
            .icon-container {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .icon-container ::slotted(*) {
                fill: var(--kwc-share-action-icon-color, var(--color-grey));
                width: 16px;
                height: 16px;
                margin-top: -2px;
                display: inline-block;
                margin-right: 9px;
            }
        </style>
        <div class$="wrapper [[_computeActiveClass(active)]]">
            <div class="icon-container"><slot name="icon"></slot></div>
            <div class$="label-container"><slot id="slot"></slot></div>
        </div>
`;
    }
    static get properties() {
        return {
            /**
             * Flags if this component is active or not. Active mostly means
             * the icon will be coloured and the text (inside the slot) will be
             * darker.
             * @type {Boolean}
             */
            active: {
                type: Boolean,
                value: false
            },
        };
    }
    /**
     * Computes CSS class appended on the `.wrapper` element to identify if
     * this component is active or not.
     *
     * @param {Boolean} active Wether the component is active or not.
     * @return {String}
     */
    _computeActiveClass(active) {
        return active ? 'active' : 'inactive';
    }
    /**
     * Toggles active state of the button.
     *
     * @return {Boolean}
     */
    toggleActive() {
        this.active = !this.active;
        return this.active;
    }
}

customElements.define('kwc-share-action', KwcShareAction);
