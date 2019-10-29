define(["exports","../node_modules/lit-element/lit-element.js","../node_modules/lit-html/directives/style-map.js","../node_modules/lit-html/directives/class-map.js"],function(_exports,_litElement){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.default=void 0;class BaiscForm extends _litElement.LitElement{static get properties(){return{recipient_email:{type:String},form_obj:{type:Object},msgSuccess:{type:Boolean},recipient_email:{type:String},loading:{type:Boolean}}}constructor(){super();this.loading=!1;this.form_obj={name:"",from:"",subject:"",body:""};this.msgSuccess=!1}handleSetInputValues(e){return this.form_obj[e.target.name]=e.target.value}renderBasicContactForm(){return _litElement.html`

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
                <p>To: ${this.recipient_email}</p>
                <slot></slot>
                <input 
                    name="name"
                    type="text" 
                    placeholder="Your Name"
                    required
                    .value="${this.form_obj.name}"
                    @input="${e=>this.handleSetInputValues(e)}" 
                ></input>
                <input 
                    name="from"
                    type="text" 
                    placeholder="Your Email"
                    required
                    .value="${this.form_obj.from}"
                    @input="${e=>this.handleSetInputValues(e)}" 
                ></input>
                <input 
                    name="subject"
                    type="text" 
                    placeholder="Subject" 
                    required
                    .value="${this.form_obj.subject}"
                    @input="${e=>this.handleSetInputValues(e)}" 
                ></input>
                <textarea 
                    name="body"
                    rows="4" 
                    cols="50" 
                    placeholder="Talk to me Goose..." 
                    required
                    .value="${this.form_obj.body}"
                    @input="${e=>this.handleSetInputValues(e)}" 
                ></textarea>
                <input type="submit"></input>
            </form>

        `}render(){return _litElement.html`

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
        `}}var _default=customElements.define("basic-form",BaiscForm);_exports.default=_default});