document.addEventListener('DOMContentLoaded', function () {
    let questions = [
        {
            question: 'What is PHP?',
            description: "PHP is a programming language for Server side of web application",
            category: 'php'
        },
        {
            question: 'What is JavaScript?',
            description: "JavaScript is a programming language for Client side of web application",
            category: 'js'
        }
    ];

    let categories = [
        {
            category: 'PHP'
        },
        {
            category: 'JS'
        },
        {
            category: 'jQuery'
        }
    ];

    function db_loadQuestion() {
        let db = localStorage.getItem('db');
        if (db === null) {
            return false;
        }
        localStorage.setItem('db', JSON.stringify(questions));
    }

    function db_saveQuestion(question) {
        let db = JSON.parse(localStorage.getItem('db'));
        db.push(question);
        localStorage.setItem('db', JSON.stringify(db));
    }

    function db_loadCategory() {
        let db = localStorage.getItem('category');
        if (db === null) {
            return false;
        }
        localStorage.setItem('category', JSON.stringify(categories));
    }

    function db_saveCategory(category) {
        let db = JSON.parse(localStorage.getItem('category'));
        db.push(category);
        localStorage.setItem('category', JSON.stringify(db));
    }

    function renderQuestion() {
        let view = '';
        let parsedQuestions = JSON.parse(localStorage.getItem('db'));
        parsedQuestions.forEach(item => {
            view += `<div>
                              <div class="problem">
                                  <dt class="question">${item.question}</dt>
                                  <button class="open-question">Open this question</button>
                                  <dd class="decs">${item.description}</dd>
                              </div>
                        </div>`;
        });
        document.getElementById('questions').innerHTML = view;
        showMore();
    }

    function renderCategories() {
        let view = '';
        let parsedCategories = JSON.parse(localStorage.getItem('category'));
        parsedCategories.forEach(item => {
            view += `<button class="category">${item.category}</button>`;
        });
        document.getElementById('categories').innerHTML = view;
        event();
    }

    function showMore() {
        let questions = document.querySelectorAll('.open-question');
        questions.forEach(question => {
            question.addEventListener('click', function () {
                this.classList.toggle('active');
                let desc = this.nextElementSibling;
                let question = this.parentElement;
                if(desc.style.maxHeight){
                    desc.style.maxHeight = null;
                    question.style.height = 100 + 'px';
                } else {
                    desc.style.maxHeight = desc.scrollHeight + 'px';
                    question.style.height = question.scrollHeight + desc.scrollHeight + 'px';
                }
            });
        })
    }

    function event(){
        let category = document.querySelectorAll(".category");
        category.forEach(category => {
            category.addEventListener('click', function () {
                let parsedQuestions = JSON.parse(localStorage.getItem('db'));
                 let cur_category = category.innerHTML;
                let arr_of_categories = [];
               for (let i = 0; i < parsedQuestions.length; i++){
                   for (let key in parsedQuestions[i]) {
                       categories = parsedQuestions[i]['category'];
                   }
                   arr_of_categories.push(categories.toUpperCase());
               }
               let all_entries = [];
               let entry = arr_of_categories.indexOf(cur_category);
               while(entry !== -1){
                   all_entries.push(entry);
                   entry = arr_of_categories.indexOf(cur_category, entry+1);
               }
               let questions = JSON.parse(localStorage.getItem('db'));
               for(let i =0; i < all_entries.length; i++){
                   let index = all_entries[i];
                   let question = questions[index]
                   let view = '';
                   questions.forEach(item => {
                       view += `<div>
                              <div class="problem">
                                  <dt class="question">${item.question}</dt>
                                  <button class="open-question">Open this question</button>
                                  <dd class="decs">${item.description}</dd>
                              </div>
                        </div>`;
                   });
                   showMore();
               }


            })
        })
    }

    function addQuestion() {
        let addQuestion = document.getElementById('add-question-btn');
        addQuestion.addEventListener('click', function () {
            let question = prompt('What is your question?', 'What is Linux?');
            let description = prompt('Write down description of your problem', 'Linux is an Operation System');
            let category = prompt('Set category for your question', 'PHP');
            let questions =
                {
                    question: question,
                    description: description,
                    category: category
                }
            db_saveQuestion(questions);
            renderQuestion();
        })
    }

    function addCategory() {
        let addCategory = document.getElementById('add-category-btn');
        addCategory.addEventListener('click', function () {
            let category = prompt('Add new category', 'Name of category');
            let categories = {category: category};
            db_saveCategory(categories);
            renderCategories();
        })
    }

    function chooseCategory() {

    }
    event();
    addCategory();
    addQuestion();
    renderQuestion();
    renderCategories();
})