const mineflayer = require('mineflayer');

// bot WORKS!!! just need a account to run it on and program the ai
//for pass and email put in secrets

const bot = mineflayer.createBot({
	host: 'ZapSmp.aternos.me',
	username: 'AFKBOT',
	password: '',
	version:  '1.18.2',
})



bot.on('login', () => {	
	console.log("Logged in!")
})

bot.on('spawn', () => {	
	console.log("Just Spawned In")
})

function lookAtNearestPlayer () {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)
  
  if (!playerEntity) return
  
  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)
}

bot.on('physicTick', lookAtNearestPlayer)

bot.once('spawn', () => {
    setInterval(() => {
        const mobFilter = e => e.type === 'mob' && e.mobType === 'Zombie'
        const mob = bot.nearestEntity(mobFilter)


        const pos = mob.position;
        bot.lookAt(pos, true, () => {
            bot.attack(mob);
        });
    }, 1000);
});