'use client'

import { ICharacters } from "@/Interfaces/Interfaces";
import { charactersApi } from "@/utils/DataServices";
import { Button, Modal } from "flowbite-react";
import next from "next";
import { useEffect, useState } from "react";

export default function Home() {

  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [clickedCharacter, setClickedCharacter] = useState<ICharacters | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(19);

  useEffect(() => {
    const getCharacters = async () => {
      const characterList: ICharacters[] = await charactersApi();
      setCharacters(characterList);
    }

    getCharacters();
  }, [currentPage]);

  const handleCharacterClick = (character: ICharacters) => {
    setClickedCharacter(character);
    setOpenModal(true);
  };

  const handleSortAlphabetically = async () => {
    const characterList: ICharacters[] = await charactersApi();

    const sortedCharacterList = characterList.sort((a, b) => {
      if (a.name < b.name) return - 1;
      if (a.name > b.name) return 1;
      return 0;
    })

    setCharacters(sortedCharacterList);
  }

  const handleDefaultSort = async () => {
    const characterList: ICharacters[] = await charactersApi();
    setCharacters(characterList);
  }

  const handleRandomSort = async () => {
    const characterList: ICharacters[] = await charactersApi();

    const randomCharacterList = characterList.sort(() => 0.5 - Math.random())
    setCharacters(randomCharacterList);

  }

  const handleNext = () => {
    if (characters && currentPage < characters.length) {
      setCurrentPage(currentPage + 20)
      setNextPage(nextPage + 20)
    }
  };

  const handlePrevious = () => {
    if (characters && currentPage > 0) {
      setCurrentPage(currentPage - 20)
      setNextPage(nextPage - 20)
    }
  };

  const end = currentPage - nextPage;


  return (
    <div className="bg-harryBg min-h-screen bg-cover">
      <p className="text-center underline font-buttonFont font-bold text-6xl py-8"> HARRY POTTER CHARACTERS </p>


      <div className="flex justify-center">
        <div className=" pl-8">
          <Button onClick={handleSortAlphabetically} className="px-10 bg-greenBg enabled:hover:bg-hoverBtn font-buttonFont font-bold">
            Alphabetical
          </Button>
        </div>

        <div className=" px-8">
          <Button onClick={handleRandomSort} className="px-10 bg-greenBg enabled:hover:bg-hoverBtn font-buttonFont font-bold">
            Random
          </Button>
        </div>

        <div className="">
          <Button onClick={handleDefaultSort} className="px-10 bg-greenBg enabled:hover:bg-hoverBtn font-buttonFont font-bold">
            Default
          </Button>
        </div>
      </div>

      <div className="bg-whiteBg my-8 mx-8 rounded-lg py-5">
        <div className="grid grid-cols-5  items-center">
          {characters.map((person: ICharacters, index: number) => {
            if (currentPage <= index && index <= nextPage) {
              return (
                <div key={index} className="p-6 flex justify-center">
                  <Button
                    className="bg-yellow-100  border-greenBg border-4 w-full h-16 focus:ring-0 font-bold text-black font-buttonFont p-2 enabled:hover:bg-greenBg enabled:hover:text-white text-nowrap"
                    onClick={() => handleCharacterClick(person)}
                  >
                    {person.name}
                  </Button>
                </div>
              )
            }
          }

          )}
        </div>
      </div>

      {clickedCharacter && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header className="font font-buttonFont bg-yellow-100 rounded-t-lg">
            <p className="text-3xl font-bold">{clickedCharacter.name}</p>
          </Modal.Header>
          <Modal.Body className="grid grid-cols-2 bg-yellow-50 text-lg rounded-b-lg font-bodyFont scroll-py-60">
            <div className="p-2 flex justify-center overscroll-contain">
              <img className="rounded-lg h-96" src={clickedCharacter.image || 'noimg.jpg'} />
            </div>
            <div className="p-2 h-96 overflow-y-scroll">
              <p>Alternate Name: {clickedCharacter.alternate_names[0] || 'N/A'}</p>
              <p>Date of Birth: {clickedCharacter.dateOfBirth || 'N/A'}</p>
              <p>Gender: {clickedCharacter.gender || 'N/A'}</p>
              <p>Species: {clickedCharacter.species || 'N/A'}</p>
              <p>Eye Colour: {clickedCharacter.eyeColour || 'N/A'}</p>
              <p>Hair Colour: {clickedCharacter.hairColour || 'N/A'}</p>
              <p>Ancestry: {clickedCharacter.ancestry || 'N/A'}</p>
              <p>House: {clickedCharacter.house || 'N/A'}</p>
              <p>Wand:
                <li>Wood: {clickedCharacter.wand?.wood || 'N/A'}</li>
                <li>Core: {clickedCharacter.wand?.core || 'N/A'}</li>
                <li>Length: {clickedCharacter.wand?.length || 'N/A'}</li>
              </p>
              <p>Patronus: {clickedCharacter.patronus || 'N/A'}</p>
              <p>Actor/Actress: {clickedCharacter.actor || 'N/A'}</p>
            </div>
          </Modal.Body>
        </Modal>
      )}


      <div className="flex justify-between mx-8">
        <Button
          className="mr-8 p-1 w-auto font-buttonFont enabled:hover:bg-hoverBtn font-bold bg-greenBg"
          disabled={currentPage == 0}
          onClick={handlePrevious}
        >
          Prev
        </Button>
        <Button
          className="ml-8 p-1 w-auto font-bold font-buttonFont enabled:hover:bg-hoverBtn bg-greenBg"
          onClick={handleNext}
          disabled={nextPage >= characters.length}
        >
          Next
        </Button>
      </div>

    </div>
  );
}
