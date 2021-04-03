
function refreshTodo()
{
    let jsonList =  JSON.parse(localStorage.getItem("jsonList"))
    let ul = document.getElementById("list")
    
    if(jsonList !== null)
    {
        let todoList = '<ul id="list">'
        let lis = jsonList.lis

        for(let i of lis)
        {
            todoList += `<li class="todoItem"">
            <input type="checkbox" class="checkItem" ${i.check}>
            <span onClick="easySelect(this)" class="listText" style="text-decoration:${i.deco};">${i.text}</span>
            </li>`
        }

        todoList += '</ul>'

        ul.innerHTML = todoList

        if(jsonList.rmvArea)
            switchRemoveArea()
    }
    else
        ul.innerHTML = '<ul id="list"></ul>';
    
}

function addTodo()
{
    let input = document.getElementById("todoText")
    let newTodoTxt = input.value

    if(newTodoTxt != "")
    {
        let liArray = localStorage.getItem("jsonList")

        liArray === null ?  localStorage.setItem("jsonList", JSON.stringify({lis:[], rmvArea: false})) : "";

        let jsonList = JSON.parse(localStorage.getItem("jsonList"))
        
        jsonList.lis.push({check: '', text: newTodoTxt, deco: ''})
        localStorage.setItem("jsonList", JSON.stringify(jsonList))
        

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
            localStorage.clear()
    }
    else
    {
        let jsonList = JSON.parse(localStorage.getItem("jsonList"))
        let checkboxes = document.getElementById("list").getElementsByClassName("checkItem")
        let returning = []

        for(let i in jsonList.lis)
        {
            if(!checkboxes[i].checked)
                returning.push(jsonList.lis[i])
        }

        jsonList.lis = returning
        jsonList.rmvArea = false

        localStorage.setItem("jsonList", JSON.stringify(jsonList))
    }

    refreshTodo()
}

function switchRemoveArea()
{
    let jsonList = JSON.parse(localStorage.getItem("jsonList"))

    let removeArea = document.getElementById("removeArea")
    let checks = document.getElementsByClassName("checkItem")
    let nav = document.getElementsByTagName("nav")[0]
    let list = document.getElementById("list")

    if(removeArea.style.display == "block")
    {
        removeArea.style.display = "none"
        nav.style.borderStyle = "none"
        list.style.paddingTop = ""
        
        for(let checkbox of checks)
        {
            checkbox.style.display = "none"
        }
        
        jsonList.rmvArea = false;
    }
    else
    {
        removeArea.style.display = "block"
        nav.style.borderStyle = "dotted"
        list.style.paddingTop = "10px"
        
        for(let checkbox of checks)
            checkbox.style.display = "inline-block"
        
        jsonList.rmvArea = true;
    }

    localStorage.setItem("jsonList", JSON.stringify(jsonList))
    
    
}

function easySelect(span)
{
    let item = span.parentElement
    let check = item.children[0]

    check.click()
    
    if(check.checked)
    {
        span.style.textDecoration = "line-through"
    }
    else 
    {
        span.style.textDecoration = ""
    }
    
    scratcher()
}

function scratcher()
{
    let checks = Array.from(document.getElementById("list").getElementsByClassName("checkItem"))
    let jsonList =  JSON.parse(localStorage.getItem("jsonList"))
    let father

    for(let i in checks)
    {
        if(checks[i].checked)
        {
            
            jsonList.lis[i].deco = "line-through";
            jsonList.lis[i].check = "checked"
        }
        else
        {
            jsonList.lis[i].deco = '';
            jsonList.lis[i].check = '';
        }
    }

    localStorage.setItem("jsonList", JSON.stringify(jsonList))

}