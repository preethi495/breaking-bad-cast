import React from "react";

const Modal = ({ moreInfoData, modalInfo, closeModal }) => {
  const [quote, deathCount] = moreInfoData;
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => closeModal()}>
          &times;
        </span>
        <div className="modal-info">
          <div className="modal-list">
            <h2 className="modal-header">{modalInfo.name}</h2>
            <p className="modal-nickname">({modalInfo.nickname})</p>
            <ul className="info-list">
              <li className="list-item">
                <b>Character:</b>
                {modalInfo.occupation.join(", ")}
              </li>
              <li className="list-item">
                <b>Status:</b>
                {modalInfo.status}
              </li>
              <li className="list-item">
                <b>Total Death Count:</b>
                {deathCount[0].deathCount}
              </li>
              {quote.length > 0 && (
                <li className="list-item">
                  <b>Quote:</b>
                  {quote[0].quote}
                </li>
              )}
              <li className="list-item">
                <b>BreakingBad Appearance:</b>
                Seasons {modalInfo.appearance.join(", ")}
              </li>
              <li className="list-item">
                <b>Better Call Saul Appearance:</b>
                {modalInfo.better_call_saul_appearance.length
                  ? `${modalInfo.better_call_saul_appearance.length} Seasons`
                  : `None`}
              </li>
            </ul>
          </div>
          <img className="modal-img" src={modalInfo.img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
