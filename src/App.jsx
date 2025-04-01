import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Character from './character';

function App() {
  axios.defaults.baseURL = 'https://recruiting.verylongdomaintotestwith.ca';
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [charModifications, setCharModifications] = useState(0)

  useEffect(() => {
    getCharacterSheets();
  }, []);

  const modifyCharacterAttribute = (char, attribute, val) => {
    const attributes = characters[char].attributes
    const attributeSum = Object.values(attributes).reduce(
      (sum, attribute) => sum + attribute.value,
      0
    );
    if (attributeSum + val > 70) return;

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
    const updatedCharacters = characters
    updatedCharacters[char].attributes = updatedAttributes
    setCharacters(updatedCharacters)
    setCharModifications(charModifications + 1)
  };

  const modifyCharacterSkillPoints = (char, skill, val) => {
    const availableSkillPoints = characters[char].availableSkillPoints
    const charSkills = characters[char].skills
    const attributes = characters[char].attributes
    if (availableSkillPoints - val < 0) return;

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
    const updatedCharacters = characters
    updatedCharacters[char].availableSkillPoints = availableSkillPoints - val
    updatedCharacters[char].skills = updatedSkills
    setCharacters(updatedCharacters)
    setCharModifications(charModifications + 1)
  };

  const postCharacterSheets = async () => {
    const url = '/api/msyyx/character';
    const postResponse = await axios.post(url, characters);
    if (postResponse.status === 200) {
      setLoading(true);
      getCharacterSheets();
    }
  };

  const getCharacterSheets = async () => {
    const url = '/api/msyyx/character';
    const getResponse = await axios.get(url);
    if (getResponse.status === 200) {
      const data = getResponse.data.body;
      setCharacters(data);
      setLoading(false);
    }
  };

  const addNewCharacter = () => {
    const newChar = {
      attributes: {
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
      },
      skills: {},
      availableSkillPoints: 10 + (4 * -1),
      id: characters.length,
    };
    setCharacters([...characters, newChar])
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Coding Exercise</h1>
      </header>
      <section className='App-section'>
        <button onClick={addNewCharacter}>Add new character</button>
        {!loading &&
          characters.map((char, idx) => (
            <Character
              key={idx}
              id={char.id}
              attr={char.attributes}
              skills={char.skills}
              skillPoints={char.availableSkillPoints}
              modifyAttribute={modifyCharacterAttribute}
              modifySkillPoints={modifyCharacterSkillPoints}
            />
          ))}
        <button onClick={postCharacterSheets}>Submit</button>
      </section>
    </div>
  );
}

export default App;
