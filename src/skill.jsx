import './App.css';

export function Skill({ skill, charParams, modifySkillPoints }) {
  return (
    <div>
      {skill.name} - points: {charParams.points}
      <button onClick={() => modifySkillPoints(skill, 1)}>+</button>
      <button onClick={() => modifySkillPoints(skill, -1)}>-</button>
      modifier {skill.modifier}: {charParams.modifierValue} total: {charParams.total}
    </div>
  );
}