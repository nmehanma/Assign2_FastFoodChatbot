const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  SIZE2: Symbol("size2"),
  TYPE: Symbol("type"),
  TYPE2: Symbol("type2"),
  SECOND_ITEM: Symbol("second"),
  DRINKS: Symbol("drinks"),
  DRINKS2: Symbol("drinks"),
  FLAVOUR: Symbol("flavour"),
  FLAVOUR2: Symbol("flavour"),
  FRUITS: Symbol("Fruits"),
  FRUITS2: Symbol("Fruits"),
  PAYMENT: Symbol("payment")
});

module.exports = class ShwarmaOrder extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sSize2 = "";
    this.sType = "";
    this.sType2 = "";
    this.sDrinks = "";
    this.sDrinks2 = "";
    this.Flavour = "";
    this.Flavour2 = "";
    this.sFruits = "";
    this.sFruits2 = "";
    this.sItem = "Conestoga Cafeteria";
    this.nOrder = 0;
    this.sAddress = [];
    this.sName = "";
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push("Welcome to Conestoga's Cafeteria.");
        aReturn.push(
          "What meal size would you like? Small is $4, Medium is $5, Large is $6"
        );
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TYPE;
        if (sInput.toLowerCase() == "small") {
          this.sSize = sInput;
          this.nOrder = this.nOrder + 4;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "medium") {
          this.sSize = sInput;
          this.nOrder = this.nOrder + 5;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "large") {
          this.sSize = sInput;
          this.nOrder = this.nOrder + 6;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else {
          aReturn.push("Please enter valid size");
          this.stateCur = OrderState.SIZE;
        }
        break;
      case OrderState.TYPE:
        this.stateCur = OrderState.FLAVOUR;
        if (
          sInput.toLowerCase() != "fish" &&
          sInput.toLowerCase() != "burger" &&
          sInput.toLowerCase() != "chicken"
        ) {
          aReturn.push("Please enter valid type");
          this.stateCur = OrderState.TYPE;
        } else {
          this.sType = sInput;
          if (sInput.toLowerCase() == "fish") {
            aReturn.push("Would you like salmon or tuna");
          } else if (sInput.toLowerCase() == "burger") {
            aReturn.push("Would you like beef or veggie");
          } else if (sInput.toLowerCase() == "chicken") {
            aReturn.push("Would you like crispy or grilled");
          }
        }
        break;
      case OrderState.FLAVOUR:
        this.stateCur = OrderState.DRINKS;
        if (
          sInput.toLowerCase() != "salmon" &&
          sInput.toLowerCase() != "tuna" &&
          sInput.toLowerCase() != "beef" &&
          sInput.toLowerCase() != "veggie" &&
          sInput.toLowerCase() != "crispy" &&
          sInput.toLowerCase() != "grilled"
        ) {
          aReturn.push("Please enter valid selection");
          this.stateCur = OrderState.FLAVOUR;
        } else {
          this.sFlavour = sInput;
          aReturn.push(
            "Would you like a drink with that for an extra $2? If yes please specify Coke, Sprite, Lemonade, Water, else enter no"
          );
        }
        break;
      case OrderState.DRINKS:
        this.stateCur = OrderState.FRUITS;
        if (
          sInput.toLowerCase() == "coke" ||
          sInput.toLowerCase() == "sprite" ||
          sInput.toLowerCase() == "lemonade" ||
          sInput.toLowerCase() == "water"
        ) {
          this.sDrinks = sInput;
          this.nOrder = this.nOrder + 2;
          aReturn.push(
            "Would you like a fruit with that for an extra $3? If yes please specify apple or orange else enter no"
          );
        } else if (sInput.toLowerCase() == "no") {
          aReturn.push(
            "Would you like a fruit with that for an extra $3? If yes please specify apple or orange else enter no"
          );
        } else {
          this.stateCur = OrderState.DRINKS;
          aReturn.push("Please make a valid entry");
        }
        break;
      case OrderState.FRUITS:
        this.stateCur = OrderState.SIZE2;
        if (
          sInput.toLowerCase() == "apple" ||
          sInput.toLowerCase() == "orange"
        ) {
          this.sFruits = sInput;
          this.nOrder = this.nOrder + 3;
          aReturn.push(
            "Would you like a second item as well? If yes please specify either small medium or large else enter no"
          );
        } else if (sInput.toLowerCase() != "no") {
          this.stateCur = OrderState.FRUITS;
          aReturn.push("Please enter a valid selection");
        } else {
          aReturn.push(
            "Would you like a second item as well? If yes please specify either small medium or large else enter no"
          );
        }
        break;
      case OrderState.SIZE2:
        if (sInput.toLowerCase() == "small") {
          this.stateCur = OrderState.TYPE2;
          this.sSize2 = sInput;
          this.nOrder = this.nOrder + 4;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "medium") {
          this.stateCur = OrderState.TYPE2;
          this.sSize2 = sInput;
          this.nOrder = this.nOrder + 5;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "large") {
          this.stateCur = OrderState.TYPE2;
          this.sSize2 = sInput;
          this.nOrder = this.nOrder + 6;
          aReturn.push("What type would you like, Fish, Burger, or Chicken?");
        } else if (sInput.toLowerCase() == "no") {
          this.stateCur = OrderState.PAYMENT;
          aReturn.push("Thank-you for your order of");
          aReturn.push(
            `${this.sSize} meal from ${this.sItem} of type ${this.sFlavour} ${this.sType}`
          );
          if (this.sDrinks) {
            aReturn.push(`with a drink of ${this.sDrinks}`);
          }
          if (this.sFruits) {
            aReturn.push(`with a side of ${this.sFruits}`);
          }
          this.nOrder = (this.nOrder * 1.13).toFixed(2);
          aReturn.push(`Total cost with tax is $${this.nOrder}`);
          aReturn.push(`Please pay for your order here`);
          aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
          break;
        } else {
          aReturn.push("Please enter valid size");
          this.stateCur = OrderState.SIZE2;
        }
        break;
      case OrderState.TYPE2:
        this.stateCur = OrderState.FLAVOUR2;
        if (
          sInput.toLowerCase() != "fish" &&
          sInput.toLowerCase() != "burger" &&
          sInput.toLowerCase() != "chicken"
        ) {
          aReturn.push("Please enter valid type");
          this.stateCur = OrderState.TYPE2;
        } else {
          this.sType2 = sInput;
          if (sInput.toLowerCase() == "fish") {
            aReturn.push("Would you like salmon or tuna");
          } else if (sInput.toLowerCase() == "burger") {
            aReturn.push("Would you like beef or veggie");
          } else if (sInput.toLowerCase() == "chicken") {
            aReturn.push("Would you like crispy or grilled");
          }
        }
        break;

      case OrderState.FLAVOUR2:
        this.stateCur = OrderState.DRINKS2;
        if (
          sInput.toLowerCase() != "salmon" &&
          sInput.toLowerCase() != "tuna" &&
          sInput.toLowerCase() != "beef" &&
          sInput.toLowerCase() != "veggie" &&
          sInput.toLowerCase() != "crispy" &&
          sInput.toLowerCase() != "grilled"
        ) {
          aReturn.push("Please enter valid selection");
          this.stateCur = OrderState.FLAVOUR2;
        } else {
          this.sFlavour2 = sInput;
          aReturn.push(
            "Would you like a drink with that for an extra $2? If yes please specify Coke, Sprite, Lemonade, Water, else enter no"
          );
        }
        break;

      case OrderState.DRINKS2:
        this.stateCur = OrderState.FRUITS2;
        if (
          sInput.toLowerCase() == "coke" ||
          sInput.toLowerCase() == "sprite" ||
          sInput.toLowerCase() == "lemonade" ||
          sInput.toLowerCase() == "water"
        ) {
          this.sDrinks2 = sInput;
          this.nOrder = this.nOrder + 2;
          aReturn.push(
            "Would you like a fruit with that for an extra $3? If yes please specify apple or orange else enter no"
          );
        } else if (sInput.toLowerCase() != "no") {
          this.stateCur = OrderState.DRINKS2;
          aReturn.push("Please make a valid entry");
        } else {
          aReturn.push(
            "Would you like a fruit with that for an extra $3? If yes please specify apple or orange else enter no"
          );
        }
        break;
      case OrderState.FRUITS2:
        if (
          sInput.toLowerCase() == "apple" ||
          sInput.toLowerCase() == "orange"
        ) {
          this.sFruits2 = sInput;
          this.nOrder = this.nOrder + 3;
          this.stateCur = OrderState.PAYMENT;
        } else if (sInput.toLowerCase() != "no") {
          //this.stateCur = OrderState.FRUITS2;
          aReturn.push("Please make a valid entry");
          break;
        } else {
          this.stateCur = OrderState.PAYMENT;
        }
        aReturn.push("Thank-you for your order of");
        aReturn.push(
          `${this.sSize} meal from ${this.sItem} of type  ${this.sFlavour} ${this.sType}`
        );
        if (this.sDrinks) {
          aReturn.push(`with a drink of ${this.sDrinks}`);
        }
        if (this.sFruits) {
          aReturn.push(`with a side of ${this.sFruits}`);
        }
        if (this.sSize2) {
          aReturn.push(
            `and a second order of a ${this.sSize2} meal from ${this.sItem} of type ${this.sFlavour2} ${this.sType2}`
          );
        }
        if (this.sDrinks2) {
          aReturn.push(`with a drink of ${this.sDrinks2}`);
        }
        if (this.sFruits2) {
          aReturn.push(`with a side of ${this.sFruits2}`);
        }
        this.nOrder = (this.nOrder * 1.13).toFixed(2);
        aReturn.push(`Total cost with tax is $${this.nOrder}`);
        aReturn.push(`Please pay for your order here`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        break;
      case OrderState.PAYMENT:
        // console.log(sInput.purchase_units[0]);
        this.sName = sInput.purchase_units[0].shipping.name.full_name;
        this.sAddress = Object.values(
          sInput.purchase_units[0].shipping.address
        );
        // console.log(this.sAddress);
        // console.log(this.sName);
        this.isDone(true);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(
          `Thank you ${
            this.sName
          } for your payment! Your order will be delivered at ${d.toTimeString()} to the shipping  name and address of ${
            this.sName
          } ${this.sAddress.join("\n")}`
        );
        // console.log(this.sAddress.join("\n"))
        break;
    }
    return aReturn;
  }
  renderForm(sTitle = "-1", sAmount = "-1") {
    // your client id should be kept private
    if (sTitle != "-1") {
      this.sItem = sTitle;
    }
    if (sAmount != "-1") {
      this.nOrder = sAmount;
    }
    const sClientID =
      process.env.SB_CLIENT_ID ||
      "put your client id here for testing ... Make sure that you delete it before committing";
    return `
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem} order of $${this.nOrder}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.nOrder}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `;
  }
};
