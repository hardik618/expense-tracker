document.addEventListener("DOMContentLoaded",()=>{
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();
    renderExpenses()

    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const name = expenseNameInput.value.trim()
       // console.log(typeof expenseAmountInput.value.trim()); // string
      const amount = parseFloat(expenseAmountInput.value.trim())

      if(name!=="" && !isNaN(amount) && amount>0){
        // in only these cases we will proceed
        const newExpense = {
            id : Date.now(),
            name: name,
            amount: amount
        }
        expenses.push(newExpense)
        saveExpensesToLocal()
        renderExpenses()
        updateTotal()

        // clear input
        expenseNameInput.value = ""
        expenseAmountInput.value= ""
      }
        
    })

    function renderExpenses(){
      expenseList.innerHTML = ""
      expenses.forEach(expense=>{
        const li = document.createElement('li')
        li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
        `
        expenseList.appendChild(li)
      })
    }

    function calculateTotal(){
        return expenses.reduce((sum,expense)=>sum + expense.amount,0) // this will calculate and return the total amount
    }

    function saveExpensesToLocal(){
        localStorage.setItem("expenses",JSON.stringify(expenses))
    }

    function updateTotal(){
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }
    // delete button manipulate
    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName == 'BUTTON'){
            const expenseId = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter(expense=>expense.id!==expenseId)
            saveExpensesToLocal()
            renderExpenses()
            updateTotal()
        }
    })
});