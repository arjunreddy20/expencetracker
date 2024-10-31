function handleExpenses(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const expenseDetails = {
        amount: amount,
        description: description,
        category: category
    };

    const uniqueKey = `expense_${Date.now()}`;
    localStorage.setItem(uniqueKey, JSON.stringify(expenseDetails)); 

    displayExpenses(); 
    event.target.reset(); 
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = ''; 

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        if (key.startsWith("expense_")) {
            const expenseDetails = JSON.parse(localStorage.getItem(key));
            const li = document.createElement("li");
            li.textContent = `${expenseDetails.amount} - ${expenseDetails.description} - ${expenseDetails.category}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => {
                localStorage.removeItem(key);
                li.remove(); 
            };

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => {
                document.getElementById("amount").value = expenseDetails.amount;
                document.getElementById("description").value = expenseDetails.description;
                document.getElementById("category").value = expenseDetails.category;
                localStorage.removeItem(key);
                li.remove();
            };

            li.appendChild(deleteButton);
            li.appendChild(editButton);
            expenseList.appendChild(li);
        }
    }
}

