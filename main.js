var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleTransfer = require('role.transfer');

//pickup logic
//repair logic

module.exports.loop = function()
{
     if(Game.cpu.bucket == 10000) {
          Game.cpu.generatePixel();
     }
     
     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'miner1', {memory: {role: 'miner',minerPos :{x:0,y:0,roomName: Game.spawns['Spawn1'].room.name}}});
     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'transfer1', {memory: {role: 'transfer', transfering: false}});
     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'miner2', {memory: {role: 'miner',minerPos :{x:0,y:0,roomName: Game.spawns['Spawn1'].room.name}}});
     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'updater1', {memory: {role: 'upgrader'}});
     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'updater2', {memory: {role: 'upgrader'}});
     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'builder1', {memory: {role: 'builder',building:false} });
     
    
     
     for(var name in Game.creeps)
     {
          var creep = Game.creeps[name];
          if(creep.memory.role == 'harvester')
          {
               roleHarvester.run(creep);
          }
          if(creep.memory.role == 'upgrader')
          {
               roleUpgrader.run(creep);
          }
          if(creep.memory.role == 'builder')
          {
               roleBuilder.run(creep);
          }
          if(creep.memory.role == 'miner')
          {
               roleMiner.run(creep);
          }
          if(creep.memory.role == 'transfer')
          {
               roleTransfer.run(creep);
          }
     }

}