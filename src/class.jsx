import React from 'react';
import './App.css';
import { useState } from 'react';

export function Class({ className, classRequirements, charAttributes }) {
  const [displayRequirements, setDisplayRequirements] = useState(false);

  const toggleDisplayRequirements = () => {
    setDisplayRequirements(!displayRequirements);
  };

  const classRequirementsMet = () => {
    let requirementsMet = true;
    Object.entries(classRequirements).forEach(requirement => {
      if (requirement[1] > charAttributes[requirement[0]].value)
        requirementsMet = false;
    });
    return requirementsMet;
  };

  return (
    <div>
      <p
        className={classRequirementsMet() ? 'available' : 'unavailable'}
        onClick={() => toggleDisplayRequirements()}
      >
        {className}
      </p>
      {displayRequirements && (
        <div>
          <h4>Class Requirements</h4>
          <ul>
            {Object.entries(classRequirements).map(attribute => (
              <li key={attribute[0]}>
                {attribute[0]}:{attribute[1]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
