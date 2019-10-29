// disable eslint messagge - "google is not defined"
/* global google */ 
import { LitElement, html } from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map.js';
import {classMap} from 'lit-html/directives/class-map.js';

class BaiscForm extends LitElement {
    // Any changes to properties defined in the static properties will trigger a re-render
    // of the component.
    static get properties() {
        return {
            recipient_email : { type: String }, //Should be array?
            form_obj        : { type: Object },
            msgSuccess      : { type: Boolean },
            recipient_email : { type: String },
            loading         : { type: Boolean },
        };
    }


    constructor() {
        super();

        this.loading = false;
        this.form_obj = {
            name: '',
            from: '',
            subject: '',
            body: '',
        };

        this.msgSuccess = false;
        
    }


    handleSetInputValues (e) {
        //this.addressForm[e.target.name] = e.target.value;

        return this.form_obj[e.target.name] = e.target.value;
    }



    renderBasicContactForm(){

        return html`

            <style>
            input[type=text], select, textarea {
                width: 100%;
                padding: 12px 20px;
                margin: 8px 0;
                display: inline-block;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }
            
            input[type=submit] {
                width: 100%;
                color: white;
                background: rgb(2,0,36);
                background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(108,9,121,1) 39%, rgba(255,0,63,1) 100%);
                padding: 14px 20px;
                margin: 8px 0;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            input[type=submit]:hover {
                background-color: #45a049;
                
            }

            </style>

            <form onSubmit>
                <p>To: ${ this.recipient_email }</p>
                <slot></slot>
                <input 
                    name="name"
                    type="text" 
                    placeholder="Your Name"
                    required
                    .value="${this.form_obj.name}"
                    @input="${(e) => this.handleSetInputValues(e)}" 
                ></input>
                <input 
                    name="from"
                    type="text" 
                    placeholder="Your Email"
                    required
                    .value="${this.form_obj.from}"
                    @input="${(e) => this.handleSetInputValues(e)}" 
                ></input>
                <input 
                    name="subject"
                    type="text" 
                    placeholder="Subject" 
                    required
                    .value="${this.form_obj.subject}"
                    @input="${(e) => this.handleSetInputValues(e)}" 
                ></input>
                <textarea 
                    name="body"
                    rows="4" 
                    cols="50" 
                    placeholder="Talk to me Goose..." 
                    required
                    .value="${this.form_obj.body}"
                    @input="${(e) => this.handleSetInputValues(e)}" 
                ></textarea>
                <input type="submit"></input>
            </form>

        `;
    }


    // The _render callback is called each time any of the defined properties change.
    // lit-html is optimized for handling frequent updates and updating the DOM efficiently
    render() {
        return html`

            <style>

     
            .centerContent{
                color: #39DB80;
                position: absolute;
                left: 50%;
                top: 50%;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                z-index: 99;
            }
   
            </style>
            <div style="position: relative">
                ${this.renderBasicContactForm()}
            </div>
        `;
    }
}


export default customElements.define('basic-form', BaiscForm );
