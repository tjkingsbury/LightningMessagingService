// myPublisherComponent.js
import { LightningElement } from 'lwc';
import { createMessageContext, releaseMessageContext,
         publish } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";
 
export default class MyPublisherComponent extends LightningElement {
    context = createMessageContext();
     
    publishMC() {
        const message = {
            recordId: "some string",
            recordData: { value: "some value" }
        };
        publish(this.context, SAMPLEMC, message);
    }
     
    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}