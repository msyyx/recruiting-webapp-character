import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { Class } from './class';

function App() {
  const [attributes, setAttributes] = useState({
    Strength: {
      value: 9,
    },
    Dexterity: {
      value: 9,
    },
    Constitution: {
      value: 9,
    },
    Intelligence: {
      value: 9,
    },
    Wisdom: {
      value: 9,
    },
    Charisma: {
      value: 9,
    },
  });

  const modifyAttribute = (attribute, val) => {
    const updatedAttributes = {
      ...attributes,
    };
    updatedAttributes[attribute].value = Math.max(
      attributes[attribute].value + val,
      0
    );
    setAttributes(updatedAttributes);
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
              {attribute[0]}:{attribute[1].value}
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
      </section>
    </div>
  );
}

export default App;
