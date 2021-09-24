window.onload = setInterval(function(){
    let accordion = document.getElementsByClassName("accordion");
    let add = document.getElementsByClassName('question-btn')

    add[0].addEventListener('click', addQuestion);
    for ( let i = 0; i < accordion.length; i++){
        accordion[i].addEventListener("click", showMore);
    }

    function getAllQuestions() {


    }

    function showMore() {
        this.classList.toggle('active');
        let desc = this.nextElementSibling;
        let problem = this.parentElement;
        if(desc.style.maxHeight){
            desc.style.maxHeight = null;
            problem.style.height = 100 + 'px';
        } else {
            desc.style.maxHeight = desc.scrollHeight + 'px';
            problem.style.height = problem.scrollHeight + desc.scrollHeight + 'px';
        }
    }

    function addQuestion() {
        let key = prompt('Type your problem', 'Title of problem');
        let value = prompt('Type description', 'Description of problem');
        localStorage.setItem(key,value);
        let div_holder = document.getElementById('div-holder');
        let new_div = document.createElement('div');
        new_div.innerHTML = `<div class="problem">
            <dt class="question">Some kind of problem...</dt>
        <button class="accordion">More</button>
            <dd class="decs">This is description of question.</dd>
        </div>`;
        let q = document.getElementsByClassName('question')
        let desc = document.getElementsByClassName('decs');
        q[q.length-1].innerHTML = key;
        desc[q.length-1].innerHTML = value;
        div_holder.appendChild(new_div);

    }

console.log(Object.keys(localStorage));
}, 100);

