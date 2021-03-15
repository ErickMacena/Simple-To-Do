
//localStorage.clear()

function refreshTodo()
{
    //console.log("jsonList", JSON.parse(localStorage.getItem("jsonList")))

    let jsonList =  JSON.parse(localStorage.getItem("jsonList"))
    let ul = document.getElementById("list")
    
    if(jsonList !== null)
    {
        let todoList = '<ul id="list">'
        let lis = jsonList.lis

        for(let i of lis)
        {
            todoList += `<li class="todoItem">
            <input type="checkbox" name="li1" class="checkItem">
            <span class="listText">${i}</span>
            </li>`
        }

        todoList += '</ul>'

        ul.innerHTML = todoList
    }
    else
        ul.innerHTML = '<ul id="list"></ul>';
    
    console.log("aaaa", document.getElementById("removeArea").style.display)
    
    if(document.getElementById("removeArea").style.display == "block")
    {
        switchRemoveArea()
    }
}

function addTodo()
{
    let input = document.getElementById("todoText")
    let newTodoTxt = input.value

    
    if(newTodoTxt != "")
    {
        let liArray = localStorage.getItem("jsonList")
        
        if(liArray === null)
        {
            localStorage.setItem("jsonList", JSON.stringify({lis: [newTodoTxt]}))
        }
        else
        {
            let jsonList = JSON.parse(localStorage.getItem("jsonList"))
            
            jsonList.lis.push(newTodoTxt)

            localStorage.setItem("jsonList", JSON.stringify(jsonList))
        }

        refreshTodo()
        input.value = ""
    }
    input.focus()
}

function excluirSel()
{
    let removeAllCheck = document.getElementById("removeAll")

    if(removeAllCheck.checked)
    {
        if(confirm("Tem certeza que quer apagar todos os itens da lista?"))
            localStorage.clear();
    }
    else
    {
        let jsonList = JSON.parse(localStorage.getItem("jsonList")),
            checkboxes = document.getElementById("list").getElementsByClassName("checkItem"),
            indexes = [],
            returning = [];

        for(let checkbox in checkboxes)
        {
            if(checkboxes[checkbox].checked)
                indexes.push(checkbox)
        }
   
        for(let i of indexes)
            jsonList.lis[i] = null;
        
        for(let i of jsonList.lis)
        {
            if(i !== null)
                returning.push(i)
        }

        jsonList.lis = returning

        localStorage.setItem("jsonList", JSON.stringify(jsonList))
    }

    refreshTodo()
}

function switchRemoveArea()
{
    let removeArea = document.getElementById("removeArea"),
        checks = document.getElementsByClassName("checkItem"),
        nav = document.getElementsByTagName("nav")[0]

    if(removeArea.style.display == "block")
    {
        removeArea.style.display = "none"
        nav.style.borderStyle = "none"
        
        for(let checkbox of checks)
        {
            checkbox.style.display = "none"
            checkbox.checked = false
        }
            
    }
    else
    {
        removeArea.style.display = "block"
        nav.style.borderStyle = "dotted"
        
        for(let checkbox of checks)
            checkbox.style.display = "inline-block"
    }
}