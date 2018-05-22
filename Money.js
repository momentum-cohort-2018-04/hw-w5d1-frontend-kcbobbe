import request from 'superagent'
import { resolveNaptr } from 'dns';

const PRECISION = 3
const EXPONENT = (10 ** PRECISION)

export class Money {
  constructor (amount, currencyCode) {
    const decimalAsStr = amount.toString().split('.')[1]
    if (decimalAsStr && decimalAsStr.length > PRECISION) {
      throw new Error('Maximum money precision is ' + PRECISION)
    }
    this._amount = amount * EXPONENT
    this.currencyCode = currencyCode
  }

  getAmount() {
    return this._amount / EXPONENT
  }
  
  plus (other) {
    this.checkCurrencyCodes(other)
    return new Money((this._amount + other._amount) / EXPONENT, this.currencyCode)
  }

  // minus (other) {
  //   this.checkCurrencyCodes(other)
  //   return new Money((this._amount - other._amount) / EXPONENT, this.currencyCode)
  // }

  times (number) {
    return new Money((this._amount * number) / EXPONENT, this.currencyCode)
  }

  checkCurrencyCodes (other) {
    if (this.currencyCode !== other.currencyCode) {
      throw new Error('Currency codes do not match')
    }
  }
}

export class Bank{
  constructor (rates){
    this.rates = rates
    
  // this.money = new Money(amount, this.currency)
  }

exchange (money, currencyCode) {
  if (money.currencyCode === currencyCode) {
    return new Money(money.getAmount(), currencyCode)
  }
  else if (money.currencyCode !== currencyCode && currencyCode === "USD"){
    return new Money(((money.getAmount())*getRates(money.currencyCode)), currencyCode)
  }
  else if (money.currencyCode !==currencyCode && money.currencyCode === "USD"){
    return new Money(((money.getAmount())/getRates(money.currencyCode)),currencyCode)
  }
  // else if (money.currencyCode !==currencyCode && money.currencyCode !== "USD")
}
}
// function getRates(){
//   request.get(`http://fantasy-currency.glitch.me/rates`)
//     .then(function a (result){
//     var x =(result.body.rates)
//     // console.log(x)
//     return (x)})
// }

// function rateInUSD(currencyCode) {
//   var rateUsed = rates.find(function (rate) {
//     return currencyCode === rate.abbr
//   })
//   return rateUsed.rateInUSD
// }

// rateInUSD("AMD")

function getRates(currencyCode){
  request.get(`http://fantasy-currency.glitch.me/rates`)
    .then(function a (result){
    var rates =(result.body.rates)
    var rateUsed = rates.find(function (rate) {
    return currencyCode === rate.abbr
  })
  return(rateUsed.rateInUSD)
})}

getRates("AMD")



// new Bank({"abbr":"NLN","name":"Narnia Lion","rateInUSD":5.52})

// request.get(`http://fantasy-currency.glitch.me/rates`)
//    .then(function a (result) {
//     console.log(result.body.rates)})

//result.rates 
