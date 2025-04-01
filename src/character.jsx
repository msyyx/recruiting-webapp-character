import { useState, useEffect } from 'react';
import './App.css';
import { CLASS_LIST, SKILL_LIST } from './consts.js';
import Class from './class';
import Skill from './skill';

function Character({ id, attr, skills, skillPoints, modifyAttribute, modifySkillPoints }) {
  const [attributes, setAttributes] = useState(attr);
  const [charSkills, setSkills] = useState(skills);
  const [availableSkillPoints, setAvailableSkillPoints] = useState(skillPoints)

  useEffect(() => {
    setAttributes(attr);
    setSkills(skills)
    setAvailableSkillPoints(skillPoints)
  }, [attr, skills, skillPoints]);

  return (
    <div>
      <h2>Character: {id}</h2>
      <div>
        <h3>Attributes</h3>
        {Object.entries(attributes).map(attribute => (
          <div key={attribute[0]}>
            {attribute[0]}:{attribute[1]?.value} (modifier:{' '}
            {attribute[1]?.modifier})
            <button onClick={() => modifyAttribute(id, attribute[0], 1)}>
              +
            </button>
            <button onClick={() => modifyAttribute(id, attribute[0], -1)}>
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
              id: id,
              points: charSkills[skill.name]?.points || 0,
              modifierValue: attributes[skill.attributeModifier]?.modifier,
              total: charSkills[skill.name]?.total != null
                ? charSkills[skill.name].total
                : attributes[skill.attributeModifier]?.modifier
            }}
            modifySkillPoints={modifySkillPoints}
          />
        ))}
      </div>
    </div>
  );
}

export default Character