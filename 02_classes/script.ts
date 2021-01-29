interface BankAccountSpecs {
  balance: number,
  /**
   * amount should be non negative
   * @param {number} amount amount of money to be deposited
   * @return {void}
   */
  deposit: (amount: number) => void,
  /**
   * withdraw the specified amount from the balance
   * @param {number} amount amount of money to be withdraw
   * @return {boolean} true when succeed, false otherwise
   */
  withdraw: (amount: number) => boolean
}


class BankAccount implements BankAccountSpecs {
  balance: number = 0;
  constructor(initialAmount: number) {
    this.balance = initialAmount
  }
  deposit(amount: number) {
    if(amount > 0) {
      this.balance += amount
    }
    else {
      console.log('No free money!')
    }
  }
  withdraw(amount: number):boolean {
    if(amount > 0 && this.balance >= amount) {
      this.balance -= amount;
    }
    else {
      console.log('Insuffient funds.');
      return false;
    }
  }
  checkBalance(): number {
    return this.balance;

  }
}

class MortagePayment {

  account:BankAccountSpecs;

  constructor(account: BankAccountSpecs) {
    this.account = account;
  }

  makePayment(amount: number) {

    if(amount > 0) {
      let paymentOutcome = this.account.withdraw(amount);
      if(paymentOutcome) {
        console.log('Payment scucceeded')
      }
      else {
        console.log('Cannot complete payment')
      }
    }
    else {
      console.log('Invalid payment amount')
    }
  }
}

let newAccount = new BankAccount(50000);
let balance = newAccount.checkBalance();
console.log(balance);

let paymentTerminal = new MortagePayment(newAccount);
paymentTerminal.makePayment(-1000);
balance = newAccount.checkBalance();
console.log(balance);

paymentTerminal.makePayment(15);
balance = newAccount.checkBalance();
console.log(balance);

