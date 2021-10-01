document.addEventListener('DOMContentLoaded', function () {

    const MainView = {
        renderQuestions: function(questions) {
            let view = '';
            questions.forEach((item) => {
                view += `
                    <p>${item.name}</p>
                `
            });
            document.getElementById('questions').innerHTML = view;
            MainView.eventsQ();
        },

        eventsQ: function () {
            let addQuestion = document.getElementById('add-question-btn');
            addQuestion.addEventListener('click', MainQuestion.displayFormForAddQuestions);
            let button = document.getElementById('submit-question');
            button.addEventListener('click', MainQuestion.submit);
            let close = document.querySelectorAll('.close-add-question');
            close[0].addEventListener('click', MainQuestion.hideFormForAddQuestion)
        },

        renderCategories: function(categories, id) {
            let view = '';
            categories.forEach((item) => {
                view += `
                    <option class="category">${item.name}</option>
                `
            });
            document.getElementById(id).innerHTML = view;
            MainView.eventsC();
        },
        eventsC: function () {
            let addCategory = document.getElementById('add-category-btn');
            addCategory.addEventListener('click', MainCategory.displayFormForAddCategory)
            let button = document.getElementById('submit-category');
            button.addEventListener('click', MainCategory.submit)
            let close = document.querySelectorAll('.close-add-category');
            close[0].addEventListener('click', MainCategory.hideFormForAddCategory);
            MainCategory.select();
        },
    }

    const MainQuestion = {
        loadQuestions: function(){
          return JSON.parse(localStorage.getItem('questions'));
        },

        saveQuestions: function(questions){
            localStorage.setItem('questions',JSON.stringify(questions))
        },

        displayFormForAddQuestions: function(){
            let modal = document.getElementById('myModal');
            modal.style.display = 'block';
            let categories = MainCategory.loadCategories()
            MainView.renderCategories(categories,'chose-category');
        },

        submit: function(){
            let question = document.getElementById('your-question').value;
            let category = document.getElementById('chose-category');
            let value = category.value;
            document.getElementById('your-question').value = "";
            if (question !== ''){
                MainQuestion.add(question, value);
                MainQuestion.hideFormForAddQuestion();
             } else if (question === ''){
                alert('You`ve not entered question');
                return false;
            }
        },

        hideFormForAddQuestion: function(){
            let modal = document.getElementById('myModal');
            modal.style.display = 'none';
        },

        findCategoryId: function(category){
            let categories = MainCategory.loadCategories();
            let cat = categories.find(obj =>{
                return obj.name === category;
            });
            return cat.id;
        },

        add: function (name, category) {
            let catId = MainQuestion.findCategoryId(category);
            let newQuestion = { name: name, catId: parseInt(catId) };
            let questions = MainQuestion.loadQuestions();
            questions.push(newQuestion);
            MainQuestion.saveQuestions(questions);
            MainView.renderQuestions(MainQuestion.filterByCategory(parseInt(catId)));
        },

        filterByCategory: function(id = 0) {
            let questions = MainQuestion.loadQuestions();
            if (id === 0){
                return questions;
            } else {
                questions = questions.filter( obj=>{
                    return obj.catId === id;
                });
                return questions;
            }
        }
    }

    const MainCategory = {
        loadCategories: function(){
            return JSON.parse(localStorage.getItem('categories'));
        },

        saveCategory: function(category){
            localStorage.setItem('categories', JSON.stringify(category));
        },

        displayFormForAddCategory: function(){
            let modal = document.getElementById('addCategoryModal');
            modal.style.display = 'block';
        },

        submit: function(){
            let category = document.getElementById('your-category').value;
            document.getElementById('your-category').value = "";
            if(category !== ''){
                MainCategory.addCategory(category);
                MainCategory.hideFormForAddCategory();
            } else {
                alert('You`ve not entered name of Category');
                return false
            }
        },
        hideFormForAddCategory: function(){
            let modal = document.getElementById('addCategoryModal');
            modal.style.display = 'none';
        },

        addCategory: function (name) {
            let categories = MainCategory.loadCategories();
            categories.push({id:(JSON.parse(localStorage.getItem('categories'))).length, name: name});
            MainCategory.saveCategory(categories);
            categories = MainCategory.loadCategories();
            MainView.renderCategories(categories, 'categories');
        },

        select: function() {
            let d = document.querySelectorAll('.category');
            d.forEach(d=>{
                d.addEventListener('click', function () {
                    let currentCategory = d.innerHTML;
                    let result = MainCategory.loadCategories();
                    result = result.find(obj =>{
                        return obj.name === currentCategory;
                    })
                    let id = result.id;
                    let questions = MainQuestion.filterByCategory(id);
                    MainView.renderQuestions(questions);
                });
            })

        }
    }
    let categories = MainCategory.loadCategories();
    MainView.renderCategories(categories,'categories');
    let questions = MainQuestion.loadQuestions();
    MainView.renderQuestions(questions);

})