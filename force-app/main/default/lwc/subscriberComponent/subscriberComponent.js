// subscribeComponent.js
import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';

import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import searchAccounts from '@salesforce/apex/AccountSearch.searchAccounts';

const columns = [
    { label: 'Label', fieldName: 'Name' }
];

export default class SubscribeComponent extends LightningElement {

    columns = columns;



    @wire(MessageContext)
    messageContext;

    subscription = null;
    receivedMessage;
    accountName;
    nameObject;


    connectedCallback(){
        this.subscribeMC();
    }

    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(
            this.messageContext,
            SAMPLEMC, (message) => {
                this.handleMessage(message);
            },
            {scope: APPLICATION_SCOPE});
    }

    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        console.log('in handle message');
        this.receivedMessage = message ? JSON.stringify(message, null, '\t') : 'no message payload';
        console.log('receivedMessage: ' + this.receivedMessage);
        console.log('name: ' + message.nameMessage);
        this.accountName = message.nameMessage;
        console.log('accounts: ' + JSON.stringify(this.accounts));
    }

    @wire(searchAccounts, {accountName : '$accountName'})
    accounts;
}