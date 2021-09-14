//selects sidebar
const sidebar = document.querySelector('.sidebar');

//selects sidebar toggle
const toggleBtn = document.querySelector('.sidebar-toggle')
toggleBtn.addEventListener('click', function(){
    sidebar.classList.toggle('show-sidebar');
})
//selects close btn
const closeBtn = document.querySelector('.close-btn')
closeBtn.addEventListener('click', function(){
    sidebar.classList.remove('show-sidebar');
});

