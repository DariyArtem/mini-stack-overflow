window.onload = function () {

    let problems = []
    problems[0] = {
        problem: 'What is PHP?',
        description: "PHP is a programming language for Server side of web application",
        category: 'php'
    };
    problems[1] = {
        problem: 'What is JavaScript?',
        description: "JavaScript is a programming language for Client side of web application",
        category: 'js'
    }
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        problems.push({
            problem: key,
            description: localStorage.getItem(key)
        });
    }
    localStorage.setItem('What is php?', 'PHP');
    console.log(localStorage);
    renderQuestions();
    let addQuestionBtn = document.getElementById('question-btn');
    let addCategoryBtn = document.getElementById('category-btn');

    addCategoryBtn.addEventListener('click', addCategory);
    addQuestionBtn.addEventListener('click', addQuestion);

    function renderQuestions(){
        for (let i = 0; i < problems.length; i++) {
            let values = Object.values(problems[i]);

            let question = values[0];
            let description = values[2];

            let newdiv = document.createElement('div');
            newdiv.className = 'newdiv';
            newdiv.innerHTML = `<div class="problem">
                                 <dt class="question"></dt>
                                 <button class="accordion">More</button>
                                 <dd class="decs"></dd>
                            </div>`;

            let div = document.getElementById('div-holder');
            div.appendChild(newdiv);
            let dt = document.getElementsByClassName('question');
            let dd = document.getElementsByClassName('decs');
            dt[dt.length - 1].innerHTML = question;
            dd[dd.length - 1].innerHTML = description;
            let showButton = document.getElementsByClassName('accordion');
            for (let i = 0; i < showButton.length; i++) {
                showButton[i].addEventListener('click', showMore);
            }
        }
     }



    function addQuestion() {
        let problem = prompt('What is your problem?', 'What is Linux?');
        let description = prompt('Write down description of your problem', 'Linux is an Operation System');
        //let category = prompt('Set category', 'Php');
        localStorage.setItem(problem, description);
        //localStorage.setItem(problem, category);
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            problems.push({
                problem: key,
                description: localStorage.getItem(key)

            });
        }
        let elements = document.getElementsByClassName('newdiv');
        while (elements.length > 0){
            elements[0].remove();
        }
        renderQuestions();

    }

    function addCategory() {
        let category = prompt('Set name of Category', 'PHP');
        let div = document.getElementById('category-holder');
        let new_div = document.createElement('div');
        new_div.innerHTML = `<p class="category"></p>`;
        div.appendChild(new_div);
        let p = document.getElementsByClassName('category');
        p[p.length - 1].innerHTML = category;

    }

    function showMore(){
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
}

