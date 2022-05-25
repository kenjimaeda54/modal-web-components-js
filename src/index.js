class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    //bom do position fixed e que vai ocupar o espaco todo,display vai tentar separar os conteudos

    //logica e apenas mudar o CSS entao pode ser feito no proprio CSS,
    //            atributo
    //entao :host([opened]) nome da classe

    //outra soulcao era verificar o atributo pelo attributeChangedCallBack(name,oldValue,newValue){
    //   if(name === 'opened'   && this.hasAttribute('opened') ) {
    //        this.shadowRoot.querySelector('.modal').style.display = "flex"
    //        this.shadowRoot.querySelector('.background').style.display = "flex"
    //   }
    //}
    //
    //static get observedAttributes() {
    //  return ['opened']
    //}
    this.shadowRoot.innerHTML = `
        <style>
            .background {
                display: none;
                justify-content: center;
                align-items:flex-start;
                position: fixed;
                top: 0;
                left: 0;
                background-color: rgba(0,0,0,0.75);
                width:100%;
                height: 100vh;

            }
            :host([opened]) .modal,
            :host([opened]) .background {
                 display:flex
            }

            :host([opened]) .modal {
               margin-top: 15px;
            }

            .modal {
                margin-top: 23vh;
                display:none;
                flex-direction: column;
                justify-content: space-between;
                width: 50%;
                padding:25px 15px;
                background-color: white;
                box-shadow:0px 2px 8px rgba(0,0,0,0.26);
                gap: 35px;
                border-radius: 3px;
                transition: all ease-in-out 0.3s;
            }
            p {
               font-size: 17px;
               line-height: 23px;
            }
            ::slotted(h1) {
              border-bottom: 1px solid black;
              font-size: 20px;
            }
            .actions {
               border-top: 1px solid black;
               display: flex;
               padding: 15px;
               gap: 10px;
               justify-content:flex-end;
            }
        </style>
        <div class="background">
            <div class="modal">
                <slot name="title"></slot>
                <slot></slot>
                <div class="actions" >
                    <button class="cancel"  >Cancel</button>
                    <button class="confirm" >Confirm</button>
                </div>
            </div>
        </div>

    `;
    //nao esqueca elementos internos e this
    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", () => {
      //console.dir traz uma lista de elementos
      //https://developer.mozilla.org/pt-BR/docs/Web/API/console/dir

      //vai retornar uma lista de nodes assinados pelo slots[1] ou seja seus filhos
      console.dir(slots[1].assignedNodes);
    });
    const backgroundClose = this.shadowRoot.querySelector(".background");
    const buttonCancel = this.shadowRoot.querySelector(".cancel");
    const buttonConfirm = this.shadowRoot.querySelector(".confirm");
    buttonCancel.addEventListener("click", this._cancel.bind(this));
    buttonConfirm.addEventListener("click", this._confirm.bind(this));
    backgroundClose.addEventListener("click", this._hidden.bind(this));
  }
  open() {
    this.setAttribute("opened", "");
  }
  _hidden() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
  }

  //recebo evento por callback
  _cancel(event) {
    this._hidden();
    //maneira de criar meu evento para ser acessado fora o shadow dow
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this._hidden();
    //outra maneira de criar um evento proprio e acessar ele
    const confirmEvent = new Event("confirm");
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define("kvm-modal", Modal);
