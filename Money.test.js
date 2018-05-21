/* globals test, expect */

import Money from './Money'

test('can add $1 to $2', () => {
  const oneDollar = new Money(1, 'USD')
  const twoDollar = new Money(2, 'USD')
  const sum = oneDollar.plus(twoDollar)
  expect(sum).toEqual(new Money(3, 'USD'))
})

test('can add $3 to $2', () => {
  const threeDollar = new Money(3, 'USD')
  const twoDollar = new Money(2, 'USD')
  const sum = threeDollar.plus(twoDollar)
  expect(sum).toEqual(new Money(5, 'USD'))
})

test('can subtract $2 from $3', () => {
  const threeDollar = new Money(3, 'USD')
  const twoDollar = new Money(2, 'USD')
  const difference = threeDollar.minus(twoDollar)
  expect(difference).toEqual(new Money(1, 'USD'))
})

test('can add 3 EUR to 2 EUR', () => {
  const threeEuro = new Money(3, 'EUR')
  const twoEuro = new Money(2, 'EUR')
  const sum = threeEuro.plus(twoEuro)
  expect(sum).toEqual(new Money(5, 'EUR'))
})

test('adding EUR to USD should raise an error', () => {
  const oneDollar = new Money(1, 'USD')
  const twoEuro = new Money(2, 'EUR')
  expect(() => {
    expect(oneDollar.plus(twoEuro).amount).not.toBe(3)
    expect(oneDollar.plus(twoEuro).currencyCode).not.toBe('USD')
  }).toThrowError()
})

test('Money with the same amount and currencyCode are equivalent', () => {
  const money1 = new Money(1, 'USD')
  const money2 = new Money(1, 'USD')
  expect(money1).toEqual(money2)
})

test('Money cannot be more precise than 3 decimal places', () => {
  const money1 = new Money(0.001, 'USD')
  expect(money1).toEqual(new Money(0.001, 'USD'))

  expect(() => {
    const money2 = new Money(0.0001, 'USD')
  }).toThrowError()
})

test('Money can be multiplied', () => {
  // expect((new Money(0.2, 'USD').times(3))).toEqual(new Money(0.6, 'USD'))
  expect((new Money(2, 'USD').times(3))).toEqual(new Money(6, 'USD'))
})

test('Money should not have floating point errors', () => {
  const money1 = new Money(0.2, 'USD')
  expect(money1.times(3)).toEqual(new Money(0.6, 'USD'))
})