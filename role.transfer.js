var roleTransfer = 
{
     run: function(creep)
     {    
          
          if(creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0)
          { creep.memory.transfering = false;
          }
          else if(!creep.memory.transfering && creep.store.getFreeCapacity() == 0)
               {creep.memory.transfering = true;
               } 
          if(creep.memory.transfering == false)
          // creep.carry.energy < creep.carryCapacity
          {    
               
               // var minerPos = new RoomPosition
               // (
               //      creep.memory.minerPos.x, 
               //      creep.memory.minerPos.y, 
               //      creep.memory.minerPos.roomName
               // );
               
                    var miner = creep.pos.findClosestByPath(FIND_MY_CREEPS, 
                         {
                              filter: (creep) => creep.memory.role == 'miner'
                         });

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
                              return (structure.structureType == STRUCTURE_EXTENSION||
                                   structure.structureType == STRUCTURE_SPAWN 
                                   &&structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
               )}
                    });
                    if(targets.length > 0)
                    {
                         if(creep.transfer(targets[0], RESOURCE_ENERGY) ==ERR_NOT_IN_RANGE) 
                         {
                              creep.moveTo(targets[0]);
                         }
                         
                    }
                    else 
                    {
                         var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
               if(targets.length)
               {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                    {
                         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
               }
                    }

          }
     }
};
module.exports = roleTransfer;