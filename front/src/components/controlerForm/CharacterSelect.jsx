import CharacterInfo from "./CharacterInfo";

function CharacterSelect({
  iaCharacters,
  handleCharacterSelect,
  selectedCharacter,
  handleCharacterHover,
  hoveredCharacter,
  setHoveredCharacter,
}) {
  return (
    <>
      <form className="flex gap-5">
        {iaCharacters.map((iaCharacter, index) => {
          return (
            <div
              key={index}
              onMouseEnter={() => handleCharacterHover(iaCharacter.name)}
              onMouseLeave={() => setHoveredCharacter(null)}
              className="character relative text-5xl text-stone-500 tracking-wide my-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <input
                type="radio"
                id={index}
                name="iaCharacter"
                onChange={() => handleCharacterSelect(iaCharacter.name)} // Appeler handleCharacterSelect
                checked={
                  selectedCharacter &&
                  selectedCharacter.name === iaCharacter.name
                } // Vérifier si c'est le personnage sélectionné
              />
              <label
                className="cursor-pointer capitalize shadow-md text-xl  font-medium px-8 py-3 rounded-3xl transition-all duration-300 hover:text-stone-900 hover:shadow-lg"
                htmlFor={index}
              >
                {iaCharacter.name} - {iaCharacter.title}
              </label>
            </div>
          );
        })}
      </form>
      <CharacterInfo iaCharacter={hoveredCharacter}></CharacterInfo>
    </>
  );
}

export default CharacterSelect;
