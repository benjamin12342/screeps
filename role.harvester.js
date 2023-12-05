var roleHarvester = 
{
     /** @param {Creep} creep **/
     run: function(creep) {
     // creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).ID;
     // const source = Game.getObjectById(creep.memory.sourceId);
     // console.log(source);
     //输出null。有待改正                                                                                                                                                                                                                                                  
          if(creep.store.getFreeCapacity()>0)
          {    
               var sources = creep.room.find(FIND_SOURCES);
               if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE)
               {
                    creep.moveTo(sources[1]);
               }
          }
          else
          {
               var targets = creep.room.find(FIND_STRUCTURES,
               {
                    filter:(structure) => 
                    {
                         return (structure.structureType == STRUCTURE_EXTENSION||
                              structure.structureType == STRUCTURE_SPAWN)&&
                         structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
               });

               
               if(targets.length > 0)
               {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
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
module.exports = roleHarvester;