import './App.css';

function Skill({ skill, charParams, modifySkillPoints }) {
  return (
    <div>
      {skill.name} - points: {charParams.points}
      <button onClick={() => modifySkillPoints(charParams.id, skill, 1)}>+</button>
      <button onClick={() => modifySkillPoints(charParams.id, skill, -1)}>-</button>
      modifier {skill.modifier}: {charParams.modifierValue} total: {charParams.total}
    </div>
  );
}

export default Skill