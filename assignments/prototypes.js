/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(att) {
  this.createdAt = att.createdAt;
  this.dimensions = att.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} has been destroyed.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(att) {
  GameObject.call(this, att);
  this.healthPoints = att.healthPoints;
  this.name = att.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(att) {
  CharacterStats.call(this, att);
  this.team = att.team;
  this.weapons = att.weapons;
  this.languages = att.languages;
}

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${
    this.languages[Math.floor(Math.random() * this.languages.length)]}.`;
};

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    languages: ['Common Tongue','Black Speech',],
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    languages: ['Common Tongue'],
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    languages: ['Elvish'],
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.languages); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
function Super(att) {
  Humanoid.call(this, att);
}

Super.prototype = Object.create(Humanoid.prototype);

Super.prototype.normalAttack = function(target) {
  let damage = Math.floor(Math.random() * (this.healthPoints / 3));

  target.healthPoints -= damage;
  console.log(
    `${this.name} attacks ${target.name} with ${this.weapons[Math.floor(Math.random() * this.weapons.length)]
    } inflicting ${damage} damage to ${target.name}'s health!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} recieved a critical hit! ${target.destroy()}`);
  } else {
    console.log(`${target.name} continues to fight!`);
  }
};

//-------------------------------------------
function Villain(att) {
  Super.call(this, att);
  this.harrass = att.harrass;
  this.darkMagic = att.darkMagic;
}

Villain.prototype = Object.create(Super.prototype);

Villain.prototype.taunt = function() {
  return `${this.name}: ${this.harrass[Math.floor(Math.random() * this.harrass.length)]}`;
}; 

Villain.prototype.special = function(target) {
  let damage = Math.floor(Math.random() * (this.healthPoints / 3));

  target.healthPoints -= damage;
  console.log(
    `${this.name} hits ${target.name} using ${this.darkMagic[Math.floor(Math.random() * this.darkMagic.length)]} inflicting ${damage} damage to ${target.name}'s health!`
  );
  if (target.healthPoints <= 0) {
    console.log(`${target.name} recieved a critical hit!${target.destroy()}`);
  } else {
    console.log(`${target.name} continues to fight!${target.special()}`);
  }
};

//-------------------------------------------

function Hero(att) {
  Super.call(this, att);
  this.perseverance = att.perseverance;
}

Hero.prototype = Object.create(Super.prototype);

Hero.prototype.special = function() {
  let damage = Math.floor(Math.random() * (this.healthPoints / 3));

  this.healthPoints += damage;
  if (this.healthPoints >= 20) {
    console.log(`${this.name}: I'm feeling better than ever!`);
  } else {
    console.log(`${this.name}: ${this.perseverance[Math.floor(Math.random() * this.perseverance.length)]}`);
  }
};
// * Create two new objects, one a villain and one a hero and fight it out with methods!


//---------------------------------------------
const greatOrc = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 25,
  name: 'Mortas Natas',
  team: 'Mortagar',
  weapons: ['Bone Sword','Deamon Dagger','Soul Cleaver',],
  languages: ['Black Speech','Common Tongue'],
  harrass: ['Die you fool!','Foolish human this will be the end of you!','Fooliukh shara avhiuk liwo be avhe mubarum ro lat!'],
  darkMagic: ['Blood magic','Soul Sacrifice','Torture']
});
//-----------------------------------------------
const hero = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 20,
  name: 'Sir Garnet',
  team: 'The Round Table',
  weapons: ['Short Sword','Shield','Long Bow'],
  languages: ['Common Tongue','Elvish'],
  perseverance: ['Is that the best you can do!','Is that all!',"You'll have to do better than that"]
});
//----------------------------------------------

//---Special thanks to Chirs for showing me this awesome function
function battle(hero,villain) {
  let winner = "";
  //If no winner then battle
  while (!winner) {
    let attacker = "";
    let defender = "";
    //--Determining who the attacker is
    let attDef = Math.floor(Math.random() * 2);
    if (attDef === 0) {
      attacker = hero;
      defender = villain;
    } else {
      attacker = villain;
      defender = hero;
    }
    //--Determining which attack to use
    let normSpec = Math.floor(Math.random() * 2);
    if (normSpec === 0) {
      attacker.normalAttack(defender);
    } else {
      attacker.special(defender);
    }
    //--checking health to see if we have a winner
    if (defender.healthPoints <= 0) {
      winner = attacker;
    }
  }
  //--If winner is hero console log hero victory 
  if (winner === hero) {
    console.log(
      `${hero.name} has defeated the Great Orc ${villain.name}!`
    );
  //--If winner is villain console log villain victory  
  } else {
    console.log(
      `${villain.name} defeated ${hero.name}! There are dark days ahead...`
    );
  }
}

battle(hero,greatOrc)