const balance = document.getElementById('balance')
const income = document.getElementById('money-plus')
const expense = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const amount = document.getElementById('amount')
const text = document.getElementById('text')


let localStorageTrans = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTrans : []

//add transaction
const addTransaction = () => {
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('please add a text and amount')
    } else {
        const transaction = {
            id: randomID(),
            text:text.value,
            amount: +amount.value
        }

        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        updateLocalStore()

        text.value = ''
        amount.value = ''
    }
}

let randomID = () => {
    return Math.floor(Math.random() * 1000000000)
}
const addTransactionDOM = transaction => {
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement ('li')

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`

    list.appendChild(item)
}

const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount)

    const total = amounts.reduce((acc, item) => (acc = acc + item), 0).toFixed(2)

    const inc = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    const exp = (
        amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    balance.innerText = `$${total}`
    income.innerText =  `$${inc}`
    expense.innerText = `$${exp}`
}

const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStore()
    init()
}


const updateLocalStore = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const init = () => {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM)
    updateValues()
}

init()

form.addEventListener('submit', addTransaction)

   