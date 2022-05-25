# Modal web componentes
Criar um modal para praticar web componenent


## Feature
- Mudei de forma dinâmica o css,quando abrir e fechar o modal
- Para isto alterei a propriedade display flex para none
- Possível usar duas abordagens
- Abaixo esta às duas maneiras, uma usando o ciclo de vida observedAttributes e a outra acessando pelo css usando o host


 ``` javascript
  attributeChangedCallBack(name,oldValue,newValue){
      if(name === 'opened'   && this.hasAttribute('opened') ) {
            this.shadowRoot.querySelector('.modal').style.display = "flex"
           this.shadowRoot.querySelector('.background').style.display = "flex"
      }
  }
  
  static get observedAttributes() {
      return ['opened']
   }
   
 // outra maneira de fazer mesma coisa acima
  :host([opened]) .modal,
  :host([opened]) .background {
        display:flex
  }
 
 ```
 
 ## 
- Para abrir o modal foi apenas atribuído a propriedade opened 
- Caso a propriedade existir na tag o modal sera aberto <kvm-modal opened> </kvm-modal>
- Fluxo para abrir o modal foi o seguinte: Existe um botão no light dom, assim que ele e pressionado seto o atributo opened na tag
- [setAtribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) e um método Dom que acessamos com javascript, permite adicionar atributos na tag html


```html
<body>
    <kvm-modal>
      <h1 slot="title">Confirm payment</h1>
      <p>With your confirmation you agree to pay the full amount!</p>
    </kvm-modal>
    <h3>Clicked below to accept terms?</h3>
    <button>Accept terms</button>
    <script>
      
      buttonAccept.addEventListener("click", () => {
        modal.open();
      });
    </script>
  </body>

```

``` js
  open() {
    this.setAttribute("opened", "");
  }


```

##

- Criei meus próprios eventos usando um objeto javascript new Event()
- Esse objeto recebe um argumento e tem métodos como bubbles e composed
- Podemos acessar nossos eventos fora do shadow dom usando o argumento mais o bubbles e composed
- Mas existe uma maneira mais simples atribuindo o evento a própria classe com this

```html
 <script>
      const modal = document.querySelector("kvm-modal");
      const buttonAccept = document.querySelector("button");

      modal.addEventListener("confirm", () => {
        console.log("confirm clicked");
      });

      modal.addEventListener("cancel", () => {
        console.log("cancel clicked");
      });
</script>


```

``` js
 _cancel(event) {
    this._hidden();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this._hidden();
    const confirmEvent = new Event("confirm");
    this.dispatchEvent(confirmEvent);
  }


```









