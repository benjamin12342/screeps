//carry弃用，逻辑修改
//如果新的miner生成会丢掉目标

var roleMiner =
{
     /** @param {Creep} creep **/
     run: function(creep)
     {
     if(creep.memory.minerPos === undefined)
     {
          creep.memory.minerPos =
          {
               x: 0,
               y: 0,
               roomName: Game.spawns['Spawn1'].room.name,
          };
     }
     var sources = creep.room.find(FIND_SOURCES);
     if(creep.memory.minerPos.x == 0 && creep.memory.minerPos.y == 0)
     {for(var i=0; i<sources.length; i++)
     {
          var miner = _.filter(Game.creeps, (c) => c.memory.role == 'miner' 
          && c.memory.minerPos !== undefined
          && c.memory.minerPos.x == sources[i].pos.x 
          && c.memory.minerPos.y == sources[i].pos.y 
          && c.memory.minerPos.roomName == sources[i].room.name);
          if(miner.length == 0)
          {

               creep.memory.minerPos =
               {
                    x: sources[i].pos.x,
                    y: sources[i].pos.y,
                    roomName: sources[i].room.name,
               }
                         

                    }
               }}

               if(creep.memory.minerPos.x !=0 && creep.memory.minerPos.y !=0)
               {
                    var targetPos = new RoomPosition(creep.memory.minerPos.x, creep.memory.minerPos.y, creep.memory.minerPos.roomName);
                    var source = targetPos.lookFor(LOOK_SOURCES);
               }
               if(source.length > 0)
               {if(creep.harvest(source[0] ) == ERR_NOT_IN_RANGE )

               {    //寻路逻辑要单独摘出来
                    
               creep.moveTo(source[0], 
               {visualizePathStyle: {stroke: '#ffaa00'}});
               }
               else
               {    
                    creep.harvest(source[0]);
               }}
               
               
                    
               if(creep.carry.energy > 1  )
               
                    
               {    
                    
                    var transferCreep = creep.pos.findClosestByPath 
                    (
                         FIND_MY_CREEPS,
                         {
                              filter:(c) => c.memory.role == 'transfer'|| c.memory.role == 'builder'   && c.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                         }
                    );
                    
                    if(creep.pos.isNearTo(transferCreep))
                    {
                         creep.transfer(transferCreep, RESOURCE_ENERGY);
                    }
               }
               
          

     }
};
module.exports = roleMiner; 