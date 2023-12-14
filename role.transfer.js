var roleTransfer = 
{
     run: function(creep)
     {    
          if(creep.memory.transfering === undefined)
          {
               creep.memory.transfering = false;
          }
          
          if(creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0)
          { creep.memory.transfering = false;
          }
          else if(!creep.memory.transfering && creep.store.getFreeCapacity() == 0)
               {creep.memory.transfering = true;
               } 

          var sources = creep.room.find(FIND_SOURCES);
          for(var i=0; i<sources.length; i++)
          {
          var harvesters = _.filter(Game.creeps, (c) => c.memory.role == 'Transfer' 
          
          && c.memory.minerPos.x == sources[i].pos.x 
          && c.memory.minerPos.y == sources[i].pos.y 
          && c.memory.minerPos.roomName == sources[i].room.name);
          if(harvesters.length == 0)
          {

               creep.memory.minerPos =
               {
                    x: sources[i].pos.x,
                    y: sources[i].pos.y,
                    roomName: sources[i].room.name,
               }
                         

                    }
          }
          // if(creep.memory.minerPos.x !=0 && creep.memory.minerPos.y !=0)
          //      {
          //           var targetPos = new RoomPosition(creep.memory.minerPos.x, creep.memory.minerPos.y, creep.memory.minerPos.roomName);
          //           var source = targetPos.lookFor(LOOK_SOURCES);
          //      }

          
          if(creep.memory.transfering == false)
          // creep.carry.energy < creep.carryCapacity
          {    
               var targetPos;
               if (creep.memory.minerPos) 
               {
                    targetPos = new RoomPosition(creep.memory.minerPos.x, creep.memory.minerPos.y, creep.memory.minerPos.roomName);
               }
               var miner = null;

               
               if (targetPos) 
               {
                    miner = targetPos.findClosestByPath(FIND_MY_CREEPS, 
                    {
                         filter: (c) => c.memory.role == 'miner' 
                         && c.memory.minerPos 
                         && c.memory.minerPos.x == targetPos.x 
                         && c.memory.minerPos.y == targetPos.y 
                         && c.memory.minerPos.roomName == targetPos.roomName
                    });
               }

                    if (miner)
                    {    
                         //console.log(miner);
                         creep.memory.minerPos =
                         {

                              x:miner.pos.x,
                              y:miner.pos.y,
                              roomName: miner.room.name
                         };
                         
                         
                    }
                         
               
               if(!creep.pos.isNearTo(miner) && miner)
               {
                    //console.log(miner);
                    creep.moveTo(miner, {visualizePathStyle: {stroke: '#ffffff'}});


               }   
                     
          }
          else 
          {   
               
               var targets = creep.room.find(FIND_STRUCTURES,
                    {
                         filter:(structure) => 
                         {
                              return ((structure.structureType == STRUCTURE_EXTENSION)
                                   &&structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                                   
               )}});
               if(targets.length ==0)
               {var targets = creep.room.find(FIND_STRUCTURES,
                    {
                         filter:(structure) => 
                         {
                              return ((
                                   structure.structureType == STRUCTURE_SPAWN ||
                                   structure.structureType == STRUCTURE_TOWER)
                                   &&structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                                   
               )}});}
                    if(targets.length > 0)
                    {    
                         if(targets[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0&&creep.transfer(targets[0], RESOURCE_ENERGY) ==ERR_NOT_IN_RANGE) 
                         {
                              creep.moveTo(targets[0]);
                              creep.say('🚧 transfer');
                         }
                         
                    }
                    else 
                    {
                         var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES,{
                              filter:(site) => site.structureType === STRUCTURE_LINK
                         }
                         );
                         if( constructionSites.length > 0)
                         {
                              if(creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE)
                              {
                                   creep.moveTo(constructionSites[0], {visualizePathStyle: {stroke: '#ffffff'}});
                                   creep.say('🚧 build');
                              }
                         else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                         {
                              creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                               creep.say('🚧 upgrade');

                         }
                         }
                         
                    }
                    
                   
                    

          }
     }
};
module.exports = roleTransfer;