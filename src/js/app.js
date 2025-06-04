// ...existing code...

// Seletores dos elementos
const habitForm = document.getElementById('habit-form');
const habitNameInput = document.getElementById('habit-name');

// Container para exibir hábitos
let habitListContainer = document.getElementById('habit-list');
if (!habitListContainer) {
    habitListContainer = document.createElement('section');
    habitListContainer.id = 'habit-list';
    habitListContainer.innerHTML = '<h2>Seus Hábitos</h2><ul id="habit-list-ul"></ul>';
    document.querySelector('main').appendChild(habitListContainer);
}
const habitListUl = document.getElementById('habit-list-ul');

// Dados dos hábitos (armazenados no localStorage)
let habits = JSON.parse(localStorage.getItem('habits')) || [];

// Função para salvar hábitos no localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Função para renderizar hábitos na tela
function renderHabits() {
    habitListUl.innerHTML = '';
    if (habits.length === 0) {
        habitListUl.innerHTML = '<li>Nenhum hábito cadastrado ainda.</li>';
        return;
    }
    habits.forEach((habit, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${habit.name}</strong>
            <button data-idx="${idx}" class="mark-btn">${habit.doneToday ? '✅' : 'Marcar Hoje'}</button>
            <span>Progresso: ${habit.progress} dias</span>
            <span>${habit.goal && habit.progress >= habit.goal ? '🎉 Meta alcançada!' : ''}</span>
        `;
        habitListUl.appendChild(li);
    });
}

// Função para adicionar novo hábito
habitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = habitNameInput.value.trim();
    if (!name) return;
    habits.push({
        name,
        progress: 0,
        doneToday: false,
        goal: 21 // Exemplo: meta de 21 dias para consolidar o hábito
    });
    saveHabits();
    renderHabits();
    habitForm.reset();
});

// Função para marcar progresso diário
habitListUl.addEventListener('click', function (e) {
    if (e.target.classList.contains('mark-btn')) {
        const idx = e.target.getAttribute('data-idx');
        if (!habits[idx].doneToday) {
            habits[idx].progress += 1;
            habits[idx].doneToday = true;
            saveHabits();
            renderHabits();
        }
    }
});

// Função para resetar marcação diária (simples, reseta todos ao recarregar)
function resetDailyMarks() {
    habits.forEach(habit => habit.doneToday = false);
    saveHabits();
}
window.addEventListener('load', () => {
    resetDailyMarks();
    renderHabits();
});

// ...existing code...