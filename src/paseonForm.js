// disable eslint messagge - "google is not defined"
/* global google */ 
import { LitElement, html } from 'lit-element';
import {styleMap} from 'lit-html/directives/style-map.js';
import {classMap} from 'lit-html/directives/class-map.js';

class PaseonForm extends LitElement {
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


    firstUpdated() {
       // this.shadowRoot.appendChild(this.fontScriptTag());
        this.initFetch(); //initial fetch if I need one
    }


    initFetch() {
        console.log('Hello from Init')
    }


    handleSetInputValues (e) {
        //this.addressForm[e.target.name] = e.target.value;

        return this.form_obj[e.target.name] = e.target.value;
    }
    

    submitForm(e) {
        e.preventDefault();
        this.loading = true;
        console.log('Posting...');

        let data = this.form_obj;
        data.recipient_email = this.recipient_email;
        
        console.log('This it my data!', data)

         //fetch('http://localhost:3001/sendEmail/test', {
            //http://localhost:7071/api/PaseonMailTrigger
            //https://paseonemailservice.azurewebsites.net/api/paseon
        fetch('https://paseonemailservice.azurewebsites.net/api/paseon', {
        headers: {
            'Content-Type':'application/json',
            },
          method: 'POST',
          body: JSON.stringify(data),
        })
        .then(response => {
            if (response.status === 200) {
                this.loading = false;
                this.msgSuccess = true;
                let self = this;
                setTimeout(function(){ 
                    console.log('YOYOYO ')
                    self.msgSuccess = false; 
                }, 2000);            } 
            else {
                console.log('error')
            }
           // return response.json();
        })
        .then(response => {
      
            
        });
    }
      
    renderSuccess() {
        
        console.log('render Success')
        return html`

        <div class="successMsg">
            <h1>Success</h1>
        </div>`;
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

            <form @submit=${(e, data) => this.submitForm(e, data)}>
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


    renderLoading(){
        const nonActive = { display: 'none'}
        const active= {display: 'inline-block'};
        return html`
        <style>
            .spinner {
                width: 70px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            
            .spinner > div {
                width: 18px;
                height: 18px;
                background-color: #333;
                border-radius: 100%;
                display: inline-block;
                -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
                animation: sk-bouncedelay 1.4s infinite ease-in-out both;
            }
            
            .spinner .bounce1 {
                -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
            }
            
            .spinner .bounce2 {
                -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
            }
            
            @-webkit-keyframes sk-bouncedelay {
                0%, 80%, 100% { -webkit-transform: scale(0) }
                40% { -webkit-transform: scale(1.0) }
            }
            
            @keyframes sk-bouncedelay {
                0%, 80%, 100% { 
                -webkit-transform: scale(0);
                transform: scale(0);
            } 40% { 
                -webkit-transform: scale(1.0);
                transform: scale(1.0);
            }
            }
        </style>

        <div id="bl_loading" class="spinner" style="${styleMap(this.loading ?  active : nonActive)}">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
         </div>
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
                <div class="centerContent">
                ${(this.msgSuccess ? this.renderSuccess() : null)}
                ${(this.loading ? this.renderLoading() : null)}
                </div>

            </div>
        `;
    }
}


export default customElements.define('paseon-form', PaseonForm);
