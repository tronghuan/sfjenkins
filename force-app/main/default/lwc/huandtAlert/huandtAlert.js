/******************************************************************

    Author:         Trong Huan
    Company:        Huan Eth
    Description:    huandtAlert
    Date:           03-12-2023

    TODO:
    - 

 *******************************************************************/

import {LightningElement, api} from 'lwc';

export default class LightningAlert extends LightningElement {
    @api message;
    @api messageIcon;
    @api type = 'info';
    @api context;
    @api show = false;

    variant = 'inverse';
    alertClass = 'slds-notify slds-notify_alert slds-theme_alert-texture';

    connectedCallback() {
        if (this.type === 'info') {
            this.messageIcon = this.messageIcon || 'utility:info';
            this.variant = 'inverse';
            this.alertClass += ' slds-theme_info';
        } else if (this.type === 'warning') {
            this.messageIcon = this.messageIcon || 'utility:warning';
            this.variant = 'none';
            this.alertClass += ' slds-theme_warning';
        } else if (this.type === 'error') {
            this.messageIcon = this.messageIcon || 'utility:error';
            this.variant = 'inverse';
            this.alertClass += ' slds-theme_error';
        } else if (this.type === 'offline') {
            this.messageIcon = this.messageIcon || 'utility:offline';
            this.variant = 'inverse';
            this.alertClass += ' slds-theme_offline';
        }
    }

    renderedCallback() {
        if (this.show) {
            this.template.querySelector(
                '.message-container').innerHTML = this.message;
        }
    }

    close() {
        this.dispatchEvent(new CustomEvent('alertclose', {
            detail: {
                type: this.type,
                context: this.context,
            },
        }));
        this.show = false;
    }
}