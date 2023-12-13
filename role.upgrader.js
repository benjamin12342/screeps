var roleUpgrader = 
{
     /** @param {Creep} creep **/
     run: function(creep)
     {
          if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0)
          {
               creep.memory.harvesting = true;
          }
          if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0)
          {
               creep.memory.harvesting = false;
          }
          if(creep.memory.harvesting )
          {    
               let container = creep.pos.findClosestByPath(FIND_STRUCTURES,
              {
               filter: (s) => s.structureType == STRUCTURE_SPAWN && s.store[RESOURCE_ENERGY] > 0

              });
               if(!container)     
                    {container = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                         filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0

                    });}
               if(!container)
               {
                    container = creep.pos.findClosestByPath(FIND_STRUCTURES,
                    {
                         filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.store[RESOURCE_ENERGY] > 0

                    });
               }
              

              if(container)
              {
               if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
               {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
               }
              }
          }
          else 
          {
               if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
               {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
               }
          }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
     }
};
module.exports = roleUpgrader;