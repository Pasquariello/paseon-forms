// disable eslint messagge - "google is not defined"
/* global google */ 
import { LitElement, html } from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map.js';
import {classMap} from 'lit-html/directives/class-map.js';


class TestWrapper extends LitElement {
    // Any changes to properties defined in the static properties will trigger a re-render
    // of the component.
    static get properties() {
        return {
            recipient_email : { type: String }, //Should be array?
            msgSuccess      : { type: Boolean },
            loading         : { type: Boolean },
        };
    }


    constructor() {
        super();

        this.loading = false;
        this.msgSuccess = false;
        
    }

    firstUpdated(changedProperties) {
    //     let myEvent = new CustomEvent('my-event', { 
    //       detail: { message: 'my-event happened.' },
    //       bubbles: true, 
    //       composed: true });
    //     this.dispatchEvent(myEvent);
        const myElement = document.querySelector('my-element');
        
         //myElement.addEventListener('my-event', (e) => {console.log(e)})
    }


    handleSetInputValues (e) {
        //this.addressForm[e.target.name] = e.target.value;

        return this.form_obj[e.target.name] = e.target.value;
    }


    serializeArray(form) {

        // Setup our serialized data
        var serialized = [];
    
        // Loop through each field in the form
        for (var i = 0; i < form.elements.length; i++) {
    
            var field = form.elements[i];
    
            // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
            if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
    
            // If a multi-select, get all selections
            if (field.type === 'select-multiple') {
                for (var n = 0; n < field.options.length; n++) {
                    if (!field.options[n].selected) continue;
                    serialized.push({
                        name: field.name,
                        value: field.options[n].value
                    });
                }
            }
    
            // Convert field data to a query string
            else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                serialized.push({
                    name: field.name,
                    value: field.value
                });
            }
        }
    
        return serialized;
    
    };


    submitForm(e) {
        e.preventDefault();
        console.log(e)
        let rawForm = e.target
        let value = this.serializeArray(rawForm)
       
    }
    // The _render callback is called each time any of the defined properties change.
    // lit-html is optimized for handling frequent updates and updating the DOM efficiently
    render() {
        return html`
            <div id="mybutton" @click="${(e) => console.log('taylor', e.target)}" @submit=${(e, data) => this.submitForm(e, data)}>
                
                <slot></slot>
            </div>
          
        `;
    }
}


customElements.define('test-wrapper', TestWrapper);
