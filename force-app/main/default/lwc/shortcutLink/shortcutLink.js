import { LightningElement, api } from 'lwc';
import updateClicksCount from '@salesforce/apex/ShortcutButtonsController.updateClicksCount'

export default class ShortcutButton extends LightningElement {
    @api shortcutName = ''
    @api shortcutIcon = ''
    @api shortcutUrl = ''
    error = undefined

    updateCount() {
        updateClicksCount()
            .then(result => {
                this.dispatchEvent(new CustomEvent('countupdate'))
            })
            .catch(error => {
                this.error = error
            })
    }
}