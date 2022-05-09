class Person {
  constructor(name, familyName) {
    this.name = name;
    this.familyName = familyName;
  }
}

class Developer extends Person {
  constructor(name, familyName, skills) {
    super(name, familyName);
    this.skills = skills;
  }

  solve = (problem) => true;

  code = (problem) => {
    while (true) {
      try {
        const result = this.solve(problem);
        if (result) {
          this.skills.forEach(
            (element, index) =>
              (this.skills[index].expierence = element.expierence + 1)
          );
          break;
        }
      } catch (ex) {
        console.error(ex);
      }
    }
  };
}

const skills = [
  { name: "HTML", expierence: 5 },
  { name: "CSS", expierence: 5 },
  { name: "JS", expierence: 5 },
  { name: "NodeJS", expierence: 5 },
  { name: "ReactJS", expierence: 3 },
  { name: "Docker", expierence: 3 },
  { name: "Linux", expierence: 8 },
];

const developer = new Developer("Tadas", "Bružas", skills);
developer.code();
