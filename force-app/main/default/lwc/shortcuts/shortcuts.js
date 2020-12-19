import { LightningElement, wire } from 'lwc'
import { refreshApex } from '@salesforce/apex'
import { getRecord } from 'lightning/uiRecordApi'
import getClicksId from '@salesforce/apex/ShortcutButtonsController.getClicksId'

const SHORTCUTS = [
    {
        Name: "Setup",
        Icon: "utility:setup",
        URL: "/lightning/setup/SetupOneHome/home"
    },
    {
        Name: "Object Manager",
        Icon: "utility:database",
        URL: "/lightning/setup/ObjectManager/home"
    },
    {
        Name: "Developer Console",
        Icon: "utility:apex",
        URL: "/_ui/common/apex/debug/ApexCSIPage"
    }
]

export default class Shortcuts extends LightningElement {
    error = undefined
    csId = ''
    recordExists = false
    shortcuts = SHORTCUTS
    
    @wire(getRecord, { recordId: '$csId', fields: ['Clicks_Saved__c.Id', 'Clicks_Saved__c.Count__c'] })
    clicksSaved;

    @wire(getClicksId)
    wiredClickId({error, data}) {
        if(data) {
            if(data[0]) {
                this.csId = '' + data[0].Id
                this.recordExists = true
            }
            this.error = undefined
        } else if(error) {
            this.error = error
        }
    }

    handleCountUpdate() {
        refreshApex(this.wiredClickId)
        if(this.csId) {
            refreshApex(this.clicksSaved)
        }
    }
}