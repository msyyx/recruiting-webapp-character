import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { CLASS_LIST, SKILL_LIST } from './consts.js';
import { Class } from './class';
import { Skill } from './skill';

function App() {
  axios.defaults.baseURL = 'https://recruiting.verylongdomaintotestwith.ca'
  const [attributes, setAttributes] = useState({});
  const [charSkills, setSkills] = useState({});
  const [availableSkillPoints, setAvailableSkillPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getCharacterSheet()
  }, [])

  const modifyAttribute = (attribute, val) => {
    const attributeSum = Object.values(attributes).reduce((sum, attribute) => sum + attribute.value, 0);
    if (attributeSum + val > 70) return

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
    setAvailableSkillPoints(availableSkillPoints - val);
    setSkills(updatedSkills);
  };

  const postCharacterSheet = async () => {
    const url = '/api/msyyx/character';
    const postResponse = await axios.post(url, {
      attributes,
      skills: charSkills,
      availableSkillPoints,
    })
    if (postResponse.status === 200) {
      setLoading(true)
      getCharacterSheet()
    }
  }

  const getCharacterSheet = async () => {
    const url = '/api/msyyx/character';
    const getResponse = await axios.get(url)
    if (getResponse.status === 200) {
      const data = getResponse.data.body
      setAttributes(data.attributes)
      setSkills(data.skills)
      setAvailableSkillPoints(data.availableSkillPoints)
      setLoading(false)
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Coding Exercise</h1>
      </header>
      {!loading && (
        <section className='App-section'>
          <div>
            <h3>Attributes</h3>
            {Object.entries(attributes).map(attribute => (
              <div key={attribute[0]}>
                {attribute[0]}:{attribute[1]?.value} (modifier:{' '}
                {attribute[1]?.modifier})
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
                  modifierValue: attributes[skill.attributeModifier]?.modifier,
                  total: charSkills[skill.name]?.total != null
                    ? charSkills[skill.name].total
                    : attributes[skill.attributeModifier]?.modifier
                }}
                modifySkillPoints={modifySkillPoints}
              />
            ))}
          </div>
          <button onClick={postCharacterSheet}>Submit</button>
        </section>
      )}
    </div>
  );
}

export default App;
