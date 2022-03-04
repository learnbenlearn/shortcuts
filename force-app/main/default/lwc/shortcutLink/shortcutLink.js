import { LightningElement, api } from 'lwc';


export default class ShortcutButton extends LightningElement {
    @api shortcutName = '';
    @api shortcutIcon = '';
    @api shortcutUrl = '';

    updateCount() {
        this.dispatchEvent(new CustomEvent('countupdate'));
    }
}