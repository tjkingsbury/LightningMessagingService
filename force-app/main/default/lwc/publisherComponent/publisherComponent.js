// publisherComponent.js
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class PublisherComponent extends LightningElement {
    @wire(MessageContext)
    messageContext;
    inputMessage;
          
    handleClick() {
        
        const message = { message : this.inputMessage};
        publish(this.messageContext, SAMPLEMC, message);
    }

    handleInputChange(event) {
        this.inputMessage= event.target.value;
    }
}