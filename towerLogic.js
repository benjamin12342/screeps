
var towerLogic =
{
     run: function(tower)
     {
          var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, 
          {
               filter: (structure) => structure.hits < structure.hitsMax
          });
          var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if(closestHostile) 
          {
               tower.attack(closestHostile);
          }
          else
          if(closestDamagedStructure) 
          {
               tower.repair(closestDamagedStructure);
          }
          
     }
}
module.exports = towerLogic;
//优先攻击入侵者，但是不知道为啥正在优先砸墙