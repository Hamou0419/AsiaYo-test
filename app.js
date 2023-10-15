const express = require('express')
const bodyParser = require('body-parser')
const env = require('./env')

const app = express()
const PORT = env.port || '3000'

// 匯率資料
const exchangeRates = {
    currencies: {
        TWD: { TWD: 1, JPY: 3.669, USD: 0.03281 },
        JPY: { TWD: 0.26956, JPY: 1, USD: 0.00885 },
        USD: { TWD: 30.444, JPY: 111.801, USD: 1 }
    }
}

app.use(bodyParser.json())

app.get('/currency', (req, res) => {
    const { source, target, amount } = req.query

    if (!source || !target || !amount) {
        return res.status(400).json({ error: 'Invalid Input' })
    }

    const sourceCurrency = source.toUpperCase()
    const targetCurrency = target.toUpperCase()
    const amountValue = parseFloat(amount.replace(/\$|\,/g, '')) // 移除$和,並轉換為float

    if (!exchangeRates.currencies[sourceCurrency] || !exchangeRates.currencies[targetCurrency]) {
        return res.status(400).json({ error: 'Invalid Currency' })
    }

    const exchangeRate = exchangeRates.currencies[sourceCurrency][targetCurrency]
    const resultAmount = (amountValue * exchangeRate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') //以逗號分隔轉換千字位

    res.json({ msg: 'success', amount: `$${resultAmount}` })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app