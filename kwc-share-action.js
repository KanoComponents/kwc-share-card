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

import '@polymer/iron-icon/iron-icon.js';
import '@kano/kwc-icons/kwc-icons.js';
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

                @apply --layout-horizontal;
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
            .icon,
            .label-container ::slotted(.icon) {
                fill: var(--kwc-share-action-icon-color, var(--color-grey));
                width: 16px;
                height: 16px;
                margin-top: -2px;
            }

            .label-container ::slotted(.icon) {
                margin-right: 9px;
            }

            /*HOVER STATE*/
            .wrapper:hover {
                background-color: var(--kwc-share-action-wrapper-hover-color, #e5e8eC);
            }
            .wrapper:hover .icon,
            .wrapper:hover .label-container ::slotted(.icon) {
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
            .active .icon-container .icon {
                fill: var(--kwc-share-action-icon-active-color, var(--color-grey));
            }
            .active .icon,
            .active .label-container ::slotted(.icon) {
                fill: var(--kwc-share-action-icon-active-color, var(--color-grey));
            }

            /*ACTIVE HOVER STATE*/
            .wrapper.active:hover {
                background-color: var(--kwc-share-action-wrapper-active-hover-color, #e5e8eC);
            }
            .wrapper.active:hover .icon,
            .wrapper.active:hover .label-container ::slotted(.icon) {
                fill: var(--kwc-share-action-icon-active-hover-color, var(--kwc-share-action-icon-active-color));
            }
            .wrapper.active:hover .label-container {
                color: var(--kwc-share-action-label-active-hover-color, var(--kwc-share-action-label-active-color));
            }
        </style>
        <div class$="wrapper [[_activeClass]]">
            <div class="icon-container">
                <template is="dom-if" if="[[_hasIcon]]">
                    <iron-icon class="icon" icon="[[icon]]"></iron-icon>
                </template>
            </div>
            <div class$="label-container [[_computeLabelContainerClass(_hasIcon)]]"><slot id="slot"></slot></div>
        </div>
`;
    }
    static get properties() {
        return {
            /**
             * Icon id from `kano-icons` to be displayed
             * @type {String}
             */
            icon: {
                type: String,
                value: null
            },
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
            /**
             * Flags if component has icon based on the existence or lack of
             * `icon`
             * @type {Boolean}
             */
            _hasIcon: {
                type: String,
                computed: '_computeHasIcon(icon)'
            },
            /**
             * CSS class appended on the `.wrapper` element to identify if this
             * component is active or not.
             * @type {String}
             */
            _activeClass: {
                type: String,
                computed: '_computeActiveClass(active)'
            }
        };
    }
    /**
     * Computes if component has icon or not based on the existence or lack
     * of `icon`
     *
     * @param {String} icon `kano-icons` icon id.
     * @return {Boolean}
     */
    _computeHasIcon(icon) {
        return icon ? true : false;
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
     * Computes CSS class appended on the `.label-wrapper` element based
     * on whether the element has an icon or not.
     *
     * @param {Boolean} hasIcon Has icon assigned?
     * @return {String}
     */
    _computeLabelContainerClass(hasIcon) {
        return hasIcon ? 'extra-margin' : '';
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
