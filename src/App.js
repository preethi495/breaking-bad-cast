import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/ui/Header";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
import Pagination from "./components/ui/Pagination";
import Modal from "./components/characters/Modal";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [infoQuery, setInfoQuery] = useState("");
  const [modalInfo, setModalInfo] = useState({});
  const [moreInfoData, setMoreInfoData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );
      console.log(result.data);

      setItems(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, [query]);

  useEffect(() => {
    const fetchInfo = async () => {
      setIsLoading(true);
      const getQuote = await axios(
        `https://www.breakingbadapi.com/api/quote/random?author=${infoQuery}`
      );
      const getDeathCount = await axios(
        `https://www.breakingbadapi.com/api/death-count?name=${infoQuery}`
      );

      const result = await axios.all([getQuote.data, getDeathCount.data]);
      console.log(result);
      setMoreInfoData(result);
      setIsLoading(false);
    };

    fetchInfo();
  }, [infoQuery]);

  const queryFunction = (q) => {
    setQuery(q.split(" ").join("+"));
  };

  //Get Current Posts
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const moreInfo = (q) => {
    setInfoQuery(q.name.split(" ").join("+"));
    setModalInfo(q);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Header />
      <Search getQuery={queryFunction} />
      <CharacterGrid
        isLoading={isLoading}
        items={currentPosts}
        moreInfo={moreInfo}
      />
      {items.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalPosts={items.length}
          paginate={paginate}
        />
      )}
      {isModalOpen && !isLoading && (
        <Modal
          moreInfoData={moreInfoData}
          modalInfo={modalInfo}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
