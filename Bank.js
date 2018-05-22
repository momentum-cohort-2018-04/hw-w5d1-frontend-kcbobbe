class Bank{
  constructor (rates){
    this.rates = rates
    
  // this.money = new Money(amount, this.currency)
  console.log(this.name, this.currency, this.rate)
  }

exchange (money, currencyCode) {
  if (money.currencyCode === currencyCode) {
    return new Money(money.getAmount(), currencyCode)
  }
}
}
