document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    await addexpence(amount,description,category,0);
});
async function addexpence(amount,description,category,x){
    try {
        const response = await fetch("http://localhost:3000/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, description, category }),
        });

        if (response.ok && x === 0) {
            console.log("success")
            displayExpenses();
        } 
        else if (response.ok && x === 1) {
            console.log("success")
        }
        else {
            alert("Failed to add expense.");
        }
    } catch (error) {
        console.error(error);
    }    
}



async function displayExpenses() {
    try {
        const response = await fetch("http://localhost:3000/users");
        const expenses = await response.json();

        const expenseList = document.getElementById("expenseList");
        expenseList.innerHTML = "";

        const amount = document.getElementById("amount").value= "";
        const description = document.getElementById("description").value="";
        const category = document.getElementById("category").value="";


        expenses.forEach(({ id, amount, description, category }) => {
            const li = document.createElement("li");
            li.textContent = `${amount} - ${description} - ${category} `;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = async () => {
                await deleteExpense(id);
                displayExpenses();
            };
            const editbtn = document.createElement("button");
            editbtn.textContent = "Edit";
            editbtn.onclick = async () => {
                
                const amount1 = document.getElementById("amount").value= amount;
                const description1 = document.getElementById("description").value=description;
                const category1 = document.getElementById("category").value=category;
                
                await addexpence(amount1, description1, category1, 1);
                await deleteExpense(id);
            }

            li.appendChild(deleteButton);
            li.appendChild(editbtn);
            expenseList.appendChild(li);

        });
    } catch (error) {
        console.error(error);
    }
    
}

async function deleteExpense(id) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            alert("Failed to delete expense.");
        }
    } catch (error) {
        console.error(error);
    }
    //displayExpenses();
}

// Initial display
displayExpenses();
