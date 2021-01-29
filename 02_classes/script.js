class BankAccount {
    constructor(initialAmount) {
        this.balance = 0;
        this.balance = initialAmount;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
        }
        else {
            console.log('No free money!');
        }
    }
    withdraw(amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
        }
        else {
            console.log('Insuffient funds.');
            return false;
        }
    }
    checkBalance() {
        return this.balance;
    }
}
class MortagePayment {
    constructor(account) {
        this.account = account;
    }
    makePayment(amount) {
        if (amount > 0) {
            let paymentOutcome = this.account.withdraw(amount);
            if (paymentOutcome) {
                console.log('Payment scucceeded');
            }
            else {
                console.log('Cannot complete payment');
            }
        }
        else {
            console.log('Invalid payment amount');
        }
    }
}
let newAccount = new BankAccount(50000);
let balance = newAccount.checkBalance();
console.log(balance);
let paymentTerminal = new MortagePayment(newAccount);
paymentTerminal.makePayment(100);
console.log(balance);
