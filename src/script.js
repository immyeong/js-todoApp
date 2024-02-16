const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

//리스트에 아이템 추가
function createNewTodo(){
    const item = {
        id : new Date().getTime(),
        text : '',
        completed : false
    }

    todos.unshift(item);

    const {itemEl, inputEl} = createNewElement(item);

    list.prepend(itemEl);

    inputEl.removeAttribute('disabled');
    inputEl.focus();

    setLocalStorage();
}

//추가할 요소 생성
function createNewElement(item){
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');
    
    const checkboxEl = document.createElement('input');
    checkboxEl.type ='checkbox';
    checkboxEl.checked = item.completed;

    const inputEl = document.createElement('input');
    inputEl.classList.add('input');
    inputEl.type = 'text';
    inputEl.placeholder = 'Enter your todo';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const optionsEl =document.createElement('div');
    optionsEl.classList.add('options');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons');
    removeBtnEl.innerText ='remove_circle';

    //리로드시 데이터 변동 이벤트 유지
    if(checkboxEl.checked){
        itemEl.classList.add('completed');
        inputEl.classList.add('input-text');
        editBtnEl.setAttribute('disabled','');
    } else{
        itemEl.classList.remove('completed');
        inputEl.classList.remove('input-text');
        editBtnEl.removeAttribute('disabled');        
    }

    //eventListener
    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        setLocalStorage();
    })

    inputEl.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
            inputEl.setAttribute('disabled','');
            setLocalStorage();
        }
    })

    checkboxEl.addEventListener('change', () => {
        item.completed = checkboxEl.checked;

        if(item.completed){
            itemEl.classList.add('completed');
            inputEl.classList.add('input-text');
            editBtnEl.setAttribute('disabled','');
        } else{
            itemEl.classList.remove('completed');
            inputEl.classList.remove('input-text');
            editBtnEl.removeAttribute('disabled');        
        }

        setLocalStorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id!== item.id);
        itemEl.remove();

        setLocalStorage();
    })

    optionsEl.append(editBtnEl);
    optionsEl.append(removeBtnEl);
    
    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(optionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};

}

//웹 리로드 시 기존 데이터를 유지하기위해서 localStorage 사용

//입력한 데이터를 window.localStorage에 저장
function setLocalStorage(){
    const data = JSON.stringify(todos);

    window.localStorage.setItem('my_todos', data);
}


//window.localStorage에 데이터를 가져옴
function getFromLocalStorage(){
    const data = window.localStorage.getItem('my_todos');

    if(data){
        todos = JSON.parse(data);
    }
}

//가져온 데이터로 요소를 만들어 화면에 송출
function showTodos(){
    getFromLocalStorage();

    for(let i=0; i<todos.length; i++){
        const item = todos[i];
        const {itemEl} = createNewElement(item);

        list.append(itemEl);
    }
}

showTodos();