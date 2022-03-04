import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';

import getClicksId from '@salesforce/apex/ShortcutsService.getClicksId';
import getShortcuts from '@salesforce/apex/ShortcutsService.getShortcuts';
import updateClicksCount from '@salesforce/apex/ShortcutsService.updateClicksCount';

export default class Shortcuts extends LightningElement {
    clicksIdResponse;
    csId = '';
    isLoading = true;
    recordExists;
    shortcuts;

    @wire(getClicksId)
    parseClicksId(value) {
        this.clicksIdResponse = value;
        const {error, data} = this.clicksIdResponse;
        
        if(data) {
            if(data[0]) {
                this.csId = '' + data[0].Id;
                this.recordExists = true;
            }

            this.isLoading = false;

        } else if(error) {
            console.error(error);
        }
    }

    @wire(getShortcuts)
    parseShortcuts({error, data}) {
        if(data) {
            this.shortcuts = data;
        } else if(error) {
            console.error(error);
        }
    }

    async handleCountUpdate() {
        await updateClicksCount({link: this.shortcutName});
        await refreshApex(this.clicksIdResponse);
    }
}