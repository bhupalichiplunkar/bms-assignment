import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./TrailerInfoCard.scss";

const TrailerInfoCard = function(props) {
  const { onClick, event, selected } = props;
  return (
    <div
      className={`trailer-card bg-black-o9 ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="trailer-image">
        <img
          className="trailer-image"
          id={event.EventCode}
          src={`https://in.bmscdn.com/events/moviecard/${event.EventCode}.jpg`}
          alt={event.EventTitle}
        />
        <div className="overlay flex-vbox">
          <div className="flex-auto flex-hbox flex-main-end w-percent-100">
            <div className="flex-auto bg-warning release-date pd-xs mr-t-sm mr-r-sm font-sm">
              {event.ShowDate.split(",")[0].toUpperCase()}
            </div>
          </div>
          <div className="middle-row flex-full flex-hbox flex-main-center flex-cross-center w-percent-100">
            <div className="flex-full flex-hbox flex-main-center">
              <FontAwesomeIcon className="fa-3x" icon={faPlay} color="white" />
            </div>
          </div>
          <div className="last-row flex-hbox flex-main-end w-percent-100 pd-b-sm">
            <div className="flex-auto pd-r-sm">
              <div className="flex-hbox flex-cross-center">
                <div className="flex-auto pd-xs">
                  <FontAwesomeIcon
                    className="font-md"
                    icon={faThumbsUp}
                    color="#5cb85c"
                  />
                </div>
                <div className="flex-full font-md">{event.wtsPerc}%</div>
              </div>
              <div className="font-xs text-white text-right w-percent-100">
                {event.wtsCount} votes
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pd-lr-xs pd-tb-sm font-sm text-bold">
        {event.EventTitle}
      </div>
    </div>
  );
};

export default TrailerInfoCard;
