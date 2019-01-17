import './kwc-share-action.js';

const basic = fixture`
    <kwc-share-action></kwc-share-action>
`;

const active = fixture`
    <kwc-share-action active></kwc-share-action>
`;

const icon = fixture`
    <kwc-share-action active>
        <div slot="icon"></div>
    </kwc-share-action>
`;

suite('kwc-share-action', () => {
    test('instanciate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-share-action'));
    });
    test('active', () => {
        const el = active();
        const wrapper = el.root.querySelector('.wrapper');
        assert(wrapper.classList.contains('active'));
    });
    test('toggleActive()', () => {
        const el = basic();
        assert.equal(el.active, false);
        el.toggleActive();
        assert.equal(el.active, true);
    });
    test('slot:icon', () => {
        const el = icon();
        const iconEl = el.querySelector('[slot="icon"]');
        let styles = window.getComputedStyle(iconEl);
        // Default background color
        assert.equal(styles.fill, 'rgb(159, 164, 168)');
        // Default size
        assert.equal(styles.width, '16px');
        assert.equal(styles.height, '16px');
        // Set property
        el.style.setProperty('--kwc-share-action-icon-active-color', 'rgba(12, 12, 12)');
        // set active
        el.active = true;
        // Make sure prop updated style
        styles = window.getComputedStyle(iconEl);
        assert.equal(styles.fill, 'rgb(12, 12, 12)');
    });
});
