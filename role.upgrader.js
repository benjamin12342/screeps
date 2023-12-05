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
               var sources = creep.room.find(FIND_SOURCES);
               if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE)
               {
                    creep.moveTo(sources[1],{visualizePathStyle:{stroke:'#ffaa00'}});
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