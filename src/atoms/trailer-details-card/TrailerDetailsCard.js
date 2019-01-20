import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faQuestion,
  faThumbsDown,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import "./TrailerDetailsCard.scss";

const TrailerDetailsCard = function(props) {
  const { selectedEvent } = props;
  const [dateMonth, year] = selectedEvent.ShowDate.split(",");
  return (
    <div className="trailer-details pd-lg">
      <div className="pd-lr-lg event-name font-lg text-bold">
        {selectedEvent.EventTitle}
      </div>
      <div className="pd-lr-lg pd-tb-sm event-name font-sm text-upper">
        {selectedEvent.EventLanguage}
      </div>
      <div className="pd-lr-lg pd-tb-md flex-hbox flex-cross-center">
        {selectedEvent.EventGenre.split("|").map(genre => (
          <div key={genre} className="flex-auto mr-r-sm chip-white-xs">
            {genre}
          </div>
        ))}
      </div>
      <div className="pd-lr-lg flex-hbox w-percent-100 pd-b-sm">
        <div className="flex-auto pd-r-xl">
          <div className="flex-hbox">
            <div className="flex-auto pd-xs mr-l-sm">
              <FontAwesomeIcon
                className="font-md"
                icon={faThumbsUp}
                color="white"
              />
            </div>
            <div className="flex-full mr-l-sm">
              <div className="font-md text-bold">{selectedEvent.wtsPerc}%</div>
              <div className="font-xs text-white">
                {selectedEvent.wtsCount} votes
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto pd-r-md">
          <div className="flex-hbox">
            <div className="flex-auto pd-xs">
              <FontAwesomeIcon
                className="font-md"
                icon={faCalendar}
                color="white"
              />
            </div>
            <div className="flex-full mr-l-sm">
              <div className="font-md text-bold">{dateMonth}</div>
              <div className="font-xs text-white">{year}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pd-lr-lg flex-hbox w-percent-100 pd-b-sm stats-bar">
        <div className="flex-full mr-r-lg flex-vbox flex-cross-centerr">
          <div className="pd-tb-xs text-center circle-success">
            <FontAwesomeIcon icon={faThumbsUp} color="#279e76" />
          </div>
          <div className="font-sm pd-t-md pd-b-xs text-success text-upper">
            Will watch
          </div>
          <div className="font-xs text-success">({selectedEvent.wtsCount})</div>
        </div>
        <div className="flex-full mr-lr-lg flex-vbox flex-cross-centerr">
          <div className="pd-tb-xs text-center circle-warning">
            <FontAwesomeIcon icon={faQuestion} color="#f0ad4e" />
          </div>
          <div className="font-sm pd-t-md pd-b-xs text-upper text-warning">
            Maybe
          </div>
          <div className="font-xs text-warning">
            ({selectedEvent.maybeCount})
          </div>
        </div>
        <div className="flex-full mr-lr-lg flex-vbox flex-cross-centerr">
          <div className="pd-tb-xs text-center circle-error">
            <FontAwesomeIcon icon={faThumbsDown} color="#d9534f" />
          </div>
          <div className="font-sm pd-t-md pd-b-xs text-upper text-error">
            Wont watch
          </div>
          <div className="font-xs text-error">({selectedEvent.dwtsCount})</div>
        </div>
      </div>
    </div>
  );
};

export default TrailerDetailsCard;
