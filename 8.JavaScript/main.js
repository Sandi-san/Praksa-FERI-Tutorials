//VGNEZDENE FUNKCIJE
// let a = 10
// function outer () {
//     let b = 20
//     // funkcija v funkciji
//     function inner() {
//         let c = 30
//         console.log(a,b,c)
//     }
//     // klici inner function
//     inner()
// }
// outer()

//KAKO JS KLICE FUNKCIJE
// function outer(){
//     let counter = 0
//     function inner(){
//         counter++
//         console.log(counter)
//     }
//     inner()
// }
// outer() //izpise 1
// outer() //izpise 1 2x
//ker se inner() klice enkrat, in outer() sklicuje nanj v memory

//INVOKE FUNKCIJ
// //ce hocemo klicati funkcijo inner(), damo return inner:
// function outer(){
//     let counter = 0
//     function inner(){
//         counter++
//         console.log(counter)
//     }
//     return inner //vrne funkcijo inner in njen scope (tj. si shrani counter value)
// }
// const fn = outer()
// // return in invoke funkcijo 2x z fn()
// fn()
// fn()

//CURRY FUNKCIJA
// //funkcija sum z 3 argumetni
// function sum(a,b,c){
//     return a + b + c
// }
// console.log(sum(2,3,5))
// //funkcija sum z vsakim argumentom posebej, tj. 1 argument naenkrat (nested funkcije):
// function curry(fn){
//     return function(a){
//         return function(b){
//             return function(c){
//                 return fn(a,b,c)
//             }
//         }
//     }
// }
// const curriedSum = curry(sum)
// console.log(curriedSum(2)(3)(5))
// // podobno sintaksi:
// // const add2 = curriedSum(2)
// // const add3 = add2(3)
// // const add5 = add3(5)
// // console.log(add5)

//THIS
// // globalThis.name = 'Globalcek' //moralo bi delat v Node ampak ne deluje vec
// //Implicit binding
// function sayMyName(name){
//     console.log(`My name is ${name}`)
// }
// sayMyName('Macek')
// const person = {
//     name: 'Vishnja',
//     sayMyName: function(){
//         console.log(`My name is ${this.name}`)
//     }
// }
// person.sayMyName()
// //Explicit binding
// function sayMyNameThis(name){
//     console.log(`My name is ${this.name}`)
// }
// sayMyNameThis.call(person)
// //New binding (konstruktor)
// function Person (name){
//     //this = {} (ustvarjeno z new)
//     this.name = name
// }
// const p1 = new Person('Visnja')
// const p2 = new Person('Barman')
// console.log(p1.name,p2.name)
// //Default binding
// sayMyName() //poisce global name spremenljivko (default je undefined)

//PROTOTYPE
// function Person(fName, lName){
//     this.firstName = fName
//     this.lastName = lName
// }
// const person1 = new Person('Bruce','Wayne')
// const person2 = new Person('Clark','Kent')
// //getter metoda napisana izven classa (le za 1 objekt)
// person1.getFullName = function() {
//     return this.firstName + ' ' + this.lastName
// }
// console.log(person1.getFullName())
// // console.log(person2.getFullName()) //ne deluje ker objekt ne obstaja
// //genericna metoda objekta (deluje za vse objekte)
// Person.prototype.getFullName = function() {
//     return this.firstName + ' ' + this.lastName
// }
// console.log(person1.getFullName())
// console.log(person2.getFullName())

// //DEDOVANJE
// function SuperHero(fName,lName){
//     Person.call(this,fName,lName) //deduj iz Person
//     this.isSuperhero = true
// }
// SuperHero.prototype.fightCrime = function(){
//     console.log('Fighting crime')
// }
// //prototypal inheritence
// SuperHero.prototype = Object.create(Person.prototype)
// const batman = new SuperHero('Bruce','Wayne')
// SuperHero.prototype.constructor = SuperHero //da si JS zapolne da je SuperHero SuperHero contructor (ni zahtevano)
// console.log(batman.getFullName())

//RAZREDI
// class Person{
//     constructor(fName,lName){
//         this.firstName = fName
//         this.lastName = lName
//     }
//     sayMyName() {
//         return this.firstName + ' ' + this.lastName 
//     }
// }
// const cP1 = new Person('Bruce','Wayne')
// console.log(cP1.sayMyName())
// //dedovanje razredov
// class SuperHero extends Person{
//     constructor(fName,lName){
//         //klici Person constructor
//         super(fName,lName)
//         this.isSuperhero = true
//     }
//     fightCrime(){
//         console.log('Fighting crime')
//     }
// }
// const batman = new SuperHero('Bruce','Wayne')
// console.log(batman.sayMyName())

//ITERABLI in ITERATORJI
//ustvarimo svoj iterable (empty) objekt
const obj = {
    [Symbol.iterator]: function(){
        let step = 0
        //ustvari iterator
        const iterator = {
            //ustvari next metodo za itarator
            next: function(){
                step++
                if(step === 1){
                    return {value:'Hello',done:false}
                }
                else if(step===2){
                    return {value:'World',done:false}
                }
                return {value:undefined,done:true}
            },
        }
        return iterator
    },
}
for(const word of obj){
    console.log(word)
}

//GENERATOR
//poenostavimo ustvarjanje iteratorjev:
function normalFunction(){}
//generator se lahko ustavi in zacne od tocke ustave (yield)
//implementiramo next z yield (podobno step)
function* generatorFunction(){
    yield 'HELLO'
    yield 'WORLD'
}
//vrne interator objekt
const generatorObject = generatorFunction()
for(const word of generatorObject){
    console.log(word)
}