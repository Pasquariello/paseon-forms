import{LitElement,html}from"../node_modules/lit-element/lit-element.js";import{styleMap}from"../node_modules/lit-html/directives/style-map.js";import{classMap}from"../node_modules/lit-html/directives/class-map.js";class PaseonForm extends LitElement{static get properties(){return{recipient_email:{type:String},form_obj:{type:Object},msgSuccess:{type:Boolean},recipient_email:{type:String},loading:{type:Boolean},formSchema:{type:Object},name:{reflectToAttribute:!0,type:String,noAccessor:!0}}}constructor(){super();this.loading=!1;this.form_obj={name:"",from:"",subject:"",body:""};this.name="";this.formSchema=null;this.msgSuccess=!1}firstUpdated(){this.initFetch()}initFetch(){fetch(`http://localhost:3001/campaign/get_campaign_details/${167}`).then(response=>{if(200===response.status){return response.json()}return response.json()}).then(response=>{this.formSchema=response})}handleSetInputValues(e){return this.form_obj[e.target.name]=e.target.value}submitForm(e){e.preventDefault();this.loading=!0;let data=this.form_obj;data.recipient_email=this.recipient_email;fetch("https://paseonemailservice.azurewebsites.net/api/paseon",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(data)}).then(response=>{if(200===response.status){this.loading=!1;this.msgSuccess=!0;let self=this;setTimeout(function(){self.msgSuccess=!1},2e3)}else{console.log("error")}}).then(()=>{})}renderSuccess(){return html`

        <div class="successMsg">
            <h1>Success</h1>
        </div>`}renderBasicContactForm(){return html`

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
                background: black;
                // background: rgb(2,0,36);
                // background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(108,9,121,1) 39%, rgba(255,0,63,1) 100%);
                padding: 14px 20px;
                margin: 8px 0;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            input[type=submit]:hover {
                color: black !important;
                background: white;
                border: 3px solid black;
                // border-color: black !important;
                transition: all 0.4s ease 0s;
                
            }

            input[type=submit]:active {
                position: relative;
                top: 1px;
            }

            </style>

            <form @submit=${(e,data)=>this.submitForm(e,data)}>
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

        `}renderLoading(){return html`
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

        <div id="bl_loading" class="spinner" style="${styleMap(this.loading?{display:"inline-block"}:{display:"none"})}">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
         </div>
        `}renderFormField(field){let obj={input:html`
                    <input 
                        type="${field.type}"
                        name="${field.name}"
                    />
                `,select:html`
                    <select>
                        
                    <select/>
                `,textarea:html`
                    <textarea
                        type="${field.type}"
                        name="${field.name}"
                    />
                `};return obj[field.tag]}renderCustomForm(){console.log(this.formSchema.data_schema[0].form_schema);return html`
            <style>
                input, select, textarea {
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
                    background: black;
                    // background: rgb(2,0,36);
                    // background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(108,9,121,1) 39%, rgba(255,0,63,1) 100%);
                    padding: 14px 20px;
                    margin: 8px 0;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    border: 4px solid black !important;

                }
                
                input[type=submit]:hover {
                    color: black !important;
                    background: white;
                    // border: 3px solid black;
                    // border-color: black !important;
                    transition: all 0.4s ease 0s;
                    
                }
    
                input[type=submit]:active {
                    position: relative;
                    top: 1px;
                }

            </style>
        
            <div>
                <form
                    @submit=${e=>{e.preventDefault()}}
                >
                ${this.formSchema.data_schema[0].form_schema.map(field=>{return html`
                            <label>${field.label}</label>
                            ${this.renderFormField(field)}
                        `})}
                <input type="submit" />
                </form>
            </div>

        `}render(){return html`

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
                ${this.formSchema?this.renderCustomForm():null}
                ${this.renderBasicContactForm()}
                <div class="centerContent">
                ${this.msgSuccess?this.renderSuccess():null}
                ${this.loading?this.renderLoading():null}
                </div>

            </div>
        `}}export default customElements.define("paseon-form",PaseonForm);