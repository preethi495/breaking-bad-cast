import React from "react";
import CharacterItem from "./CharacterItem";
import Spinner from "../ui/Spinner";

const CharacterGrid = ({ items, isLoading, moreInfo }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className="cards">
      {items.map((item) => (
        <CharacterItem
          key={item.char_id}
          item={item}
          moreInfo={moreInfo}
        ></CharacterItem>
      ))}
    </section>
  );
};

export default CharacterGrid;
