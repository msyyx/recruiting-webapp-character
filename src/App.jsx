import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { Class } from './class';
import { Skill } from './skill';

function App() {
  const [attributes, setAttributes] = useState({
    Strength: {
      value: 9,
      modifier: -1,
    },
    Dexterity: {
      value: 9,
      modifier: -1,
    },
    Constitution: {
      value: 9,
      modifier: -1,
    },
    Intelligence: {
      value: 9,
      modifier: -1,
    },
    Wisdom: {
      value: 9,
      modifier: -1,
    },
    Charisma: {
      value: 9,
      modifier: -1,
    },
  });
  const [charSkills, setSkills] = useState({});
  const [availableSkillPoints, setAvailableSkillPoints] = useState(10 + 4 * attributes.Intelligence.modifier)

  const modifyAttribute = (attribute, val) => {
    const updatedAttributes = {
      ...attributes,
    };
    updatedAttributes[attribute].value = Math.max(
      attributes[attribute].value + val,
      0
    );
    updatedAttributes[attribute].modifier = Math.floor(
      (updatedAttributes[attribute].value - 10) / 2
    );
    setAttributes(updatedAttributes);
  };

  const modifySkillPoints = (skill, val) => {
    if (availableSkillPoints - val < 0) return

    const updatedSkills = {
      ...charSkills,
    };
    if (!(skill.name in updatedSkills))
      updatedSkills[skill.name] = {
        points: 0,
        total: attributes[skill.attributeModifier].modifier,
      };
    updatedSkills[skill.name].points = updatedSkills[skill.name].points + val;
    updatedSkills[skill.name].total = updatedSkills[skill.name].total + val;
    setAvailableSkillPoints(availableSkillPoints - val)
    setSkills(updatedSkills);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Coding Exercise</h1>
      </header>
      <section className='App-section'>
        <div>
          <h3>Attributes</h3>
          {Object.entries(attributes).map(attribute => (
            <div key={attribute[0]}>
              {attribute[0]}:{attribute[1].value} (modifier:{' '}
              {attribute[1].modifier})
              <button onClick={() => modifyAttribute(attribute[0], 1)}>
                +
              </button>
              <button onClick={() => modifyAttribute(attribute[0], -1)}>
                -
              </button>
            </div>
          ))}
        </div>
        <div>
          <h3>Classes</h3>
          {Object.entries(CLASS_LIST).map(charClass => (
            <Class
              key={charClass[0]}
              className={charClass[0]}
              classRequirements={charClass[1]}
              charAttributes={attributes}
            />
          ))}
        </div>
        <div>
          <h3>Skills</h3>
          <p>Skill Points Available: {availableSkillPoints}</p>
          {SKILL_LIST.map(skill => (
            <Skill
              key={skill.name}
              skill={skill}
              charParams={{
                points: charSkills[skill.name]?.points || 0,
                modifierValue: attributes[skill.attributeModifier].modifier,
                total: charSkills[skill.name]?.total != null
                  ? charSkills[skill.name].total
                  : attributes[skill.attributeModifier].modifier
              }}
              modifySkillPoints={modifySkillPoints}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
