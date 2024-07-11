document.addEventListener('DOMContentLoaded', function() {
    const countdown = document.getElementById('countdown');
    const playerImage = document.getElementById('player-image');
    const playerName = document.getElementById('player-name');
    const opponentImage = document.getElementById('opponent-image');
    const opponentName = document.getElementById('opponent-name');
    const vsImage = document.getElementById('vs-image');
    const playerHealthBar = document.getElementById('player-health');
    const opponentHealthBar = document.getElementById('opponent-health');
    const battleLog = document.getElementById('battle-log');
    const battleArena = document.querySelector('.battle-arena');

    const urlParams = new URLSearchParams(window.location.search);
    const selectedCharacterIndex = parseInt(urlParams.get('character'));

    const characters = [
        { name: 'Character 1', image: 'Crea/1.jpg' },
        { name: 'Character 2', image: 'Crea/2.jpg' },
        { name: 'Character 3', image: 'Crea/3.jpg' },
    ];

    const player = {
        ...characters[selectedCharacterIndex],
        hp: 100,
        maxHp: 100,
        attack: 13,
        defense: 8,
        element: document.getElementById('player-character')
    };

    let opponentIndex;
    do {
        opponentIndex = Math.floor(Math.random() * characters.length);
    } while (opponentIndex === selectedCharacterIndex);

    const opponent = {
        ...characters[opponentIndex],
        hp: 100,
        maxHp: 100,
        attack: 13,
        defense: 8,
        element: document.getElementById('opponent-character')
    };

    playerImage.src = player.image;
    playerName.textContent = player.name;
    opponentImage.src = opponent.image;
    opponentName.textContent = opponent.name;

    vsImage.src = 'welcome.png';
    vsImage.classList.add('flicker');

    let timeLeft = 10;
    countdown.textContent = timeLeft;

    const countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            countdown.textContent = timeLeft;
        } else if (timeLeft === 0) {
            countdown.textContent = 'FIGHT!';
            clearInterval(countdownInterval);
            vsImage.classList.remove('flicker');
            startBattle();
        }
    }, 1000);

    function startBattle() {
        battleTurn(player, opponent, playerHealthBar, opponentHealthBar);
    }

    function battleTurn(attacker, defender, attackerHealthBar, defenderHealthBar) {
        const damageResult = calculateDamage(attacker.attack, defender.defense);
        defender.hp -= damageResult.damage;
        updateHealthBar(defenderHealthBar, defender.hp, defender.maxHp);
        showDamage(defender.element, damageResult.damage, damageResult.type);
        logBattleAction(attacker.name, defender.name, damageResult.damage, damageResult.type);

        if (defender.hp <= 0) {
            endBattle(attacker);
        } else {
            setTimeout(() => battleTurn(defender, attacker, defenderHealthBar, attackerHealthBar), 1000);
        }
    }

    function calculateDamage(attack, defense) {
        const randomFactor = Math.random() * 1 + 0.5;
        let baseDamage = Math.max(1, Math.floor((attack - defense / 2) * randomFactor));
        
        const isCritical = Math.random() < 0.3;
        const isExceptional = Math.random() < 0.05;

        if (isExceptional) {
            return {
                damage: baseDamage * 3,
                type: 'exceptional'
            };
        } else if (isCritical) {
            return {
                damage: baseDamage * 2,
                type: 'critical'
            };
        } else {
            return {
                damage: baseDamage,
                type: 'normal'
            };
        }
    }

    function updateHealthBar(healthBar, hp, maxHp) {
        const width = Math.max(0, (hp / maxHp) * 100);
        healthBar.style.width = `${width}%`;
        const healthText = healthBar.parentElement.querySelector('.health-text');
        healthText.textContent = `${hp}/${maxHp}`;
    }

    function showDamage(character, damage, type) {
        const damageText = document.createElement('div');
        damageText.classList.add('damage-bubble');
        damageText.textContent = damage;
        
        if (type === 'critical') {
            damageText.classList.add('critical');
        } else if (type === 'exceptional') {
            damageText.classList.add('exceptional');
        }
        
        const characterImg = character.querySelector('img');
        character.insertBefore(damageText, characterImg.nextSibling);
        
        setTimeout(() => character.removeChild(damageText), 1000);
    }

    function logBattleAction(attackerName, defenderName, damage, type) {
        const logBubble = document.createElement('div');
        logBubble.classList.add('log-bubble');
        
        let actionText = `${attackerName} inflige ${damage} dégâts à ${defenderName}`;
        
        if (type === 'critical') {
            actionText += " (Coup critique !)";
            logBubble.classList.add('critical');
        } else if (type === 'exceptional') {
            actionText += " (Coup exceptionnel !!!)";
            logBubble.classList.add('exceptional');
        }
        
        logBubble.textContent = actionText;
        battleLog.appendChild(logBubble);
        battleLog.scrollTop = battleLog.scrollHeight;
        
        setTimeout(() => {
            battleLog.removeChild(logBubble);
        }, 3000);
    }

    function endBattle(winner) {
        battleArena.innerHTML = '';
        const winnerImage = document.createElement('img');
        winnerImage.src = winner.image;
        winnerImage.classList.add('winner-image');
        
        const winnerText = document.createElement('h2');
        winnerText.textContent = 'WINNER';
        winnerText.classList.add('winner-text');

        battleArena.appendChild(winnerImage);
        battleArena.appendChild(winnerText);
    }
});