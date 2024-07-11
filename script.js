document.addEventListener('DOMContentLoaded', function() {
    const myTeamButton = document.getElementById('my-team');
    const teamSelection = document.getElementById('team-selection');
    const characterImage = document.getElementById('character-image');
    const characterName = document.getElementById('character-name');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const fightButton = document.getElementById('fight-button');

    let characters = [];
    let currentIndex = 0;

  
    characters = [
        { name: 'Character 1', image: 'Crea/1.jpg' },
        { name: 'Character 2', image: 'Crea/2.jpg' },
        { name: 'Character 3', image: 'Crea/3.jpg' },
		{ name: 'Character 4', image: 'Crea/4.jpg' },
    ];

    function displayCharacter(index) {
        characterImage.src = characters[index].image;
        characterName.textContent = characters[index].name;
    }

    myTeamButton.addEventListener('click', function(e) {
        e.preventDefault();
        teamSelection.classList.toggle('hidden');
        if (!teamSelection.classList.contains('hidden')) {
            displayCharacter(currentIndex);
        }
    });

    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + characters.length) % characters.length;
        displayCharacter(currentIndex);
    });

    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % characters.length;
        displayCharacter(currentIndex);
    });

    fightButton.addEventListener('click', function() {
        window.location.href = `battle.html?character=${currentIndex}`;
    });

    displayCharacter(currentIndex);
});