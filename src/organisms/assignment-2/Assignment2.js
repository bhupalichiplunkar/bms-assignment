import React, { Component, Fragment } from "react";
import windowDimensions from "react-window-dimensions";
import { fetchTrailers } from "../../utils/api-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import MultiCheckDropdown from "../../molecules/multi-check-dropdown/MultiCheckDropdown";
import TrailerInfoCard from "../../atoms/trailer-info-card/TrailerInfoCard";
import TrailerDetailsCard from "../../atoms/trailer-details-card/TrailerDetailsCard";
import "./Assignment2.scss";

class Assignment2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstEventIndexInRow: null,
      availableEventsObjectList: null,
      availableLanguages: null,
      availableGenreList: null,
      filteredGenres: [],
      filteredEvents: [],
      filterLanguages: [],
      selectedIndex: null,
      loading: true
    };
  }

  componentDidMount = async () => {
    const result = await fetchTrailers();
    if (result.success) {
      const [availableLanguages, availableEventsObjectList] = result.data;
      const availableGenreList = [];
      Object.keys(availableEventsObjectList).forEach(eventCode => {
        const genres = availableEventsObjectList[eventCode].EventGenre.split(
          "|"
        );
        for (let genre of genres) {
          if (availableGenreList.indexOf(genre) === -1) {
            availableGenreList.push(genre);
          }
        }
      });
      this.setState({
        availableLanguages,
        availableEventsObjectList,
        availableGenreList,
        filteredEvents: Object.keys(availableEventsObjectList),
        loading: false
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.width !== prevProps.width) {
      this.loadTrailer(this.state.selectedIndex);
    }
  }

  //@todo : scroll to video section
  loadTrailer = selectedIndex => {
    const imageNodes = document.querySelectorAll(".trailer-card-container");
    const selectedNodeOffsetTop = imageNodes[selectedIndex]
      ? imageNodes[selectedIndex].offsetTop
      : 0;
    let firstEventIndexInRow = selectedIndex;
    if (selectedIndex > 0) {
      for (let i = selectedIndex - 1; i >= 0; i--) {
        const currentNodeOffsetTop = imageNodes[i].offsetTop;
        if (currentNodeOffsetTop < selectedNodeOffsetTop) {
          break;
        } else {
          firstEventIndexInRow = i;
        }
      }
    }
    this.setState({ selectedIndex, firstEventIndexInRow });
  };

  closePreview = () => {
    this.setState({ selectedIndex: null, firstEventIndexInRow: null });
  };

  getEventWithLanguageAndGenre = (filterLanguages, filteredGenres) => {
    const { availableEventsObjectList } = this.state;
    if (!filterLanguages.length && !filteredGenres.length) {
      return Object.keys(availableEventsObjectList);
    }
    const filteredEvents = [];
    for (let eventCode of Object.keys(availableEventsObjectList)) {
      const event = availableEventsObjectList[eventCode];
      const eventGenres = event.EventGenre.split("|");
      let hasGenre =
        filteredGenres.length === 0
          ? true
          : eventGenres.some(genre => filteredGenres.indexOf(genre) > -1);
      let hasLanguage =
        filterLanguages.length === 0
          ? true
          : filterLanguages.indexOf(event.EventLanguage) > -1;
      if (hasLanguage && hasGenre) {
        filteredEvents.push(eventCode);
      }
    }
    return filteredEvents;
  };

  languageChange = language => {
    let { filterLanguages, filteredGenres } = this.state;
    if (filterLanguages.indexOf(language) > -1) {
      filterLanguages = filterLanguages.filter(lang => language !== lang);
    } else {
      filterLanguages.push(language);
    }
    const filteredEvents = this.getEventWithLanguageAndGenre(
      filterLanguages,
      filteredGenres
    );
    this.setState({ filterLanguages, filteredEvents });
  };

  genreChange = genre => {
    let { filterLanguages, filteredGenres } = this.state;
    if (filteredGenres.indexOf(genre) > -1) {
      filteredGenres = filteredGenres.filter(gen => genre !== gen);
    } else {
      filteredGenres.push(genre);
    }
    const filteredEvents = this.getEventWithLanguageAndGenre(
      filterLanguages,
      filteredGenres
    );
    this.setState({ filteredGenres, filteredEvents });
  };

  clearGenres = () => {
    let { filterLanguages } = this.state;
    const filteredEvents = this.getEventWithLanguageAndGenre(
      filterLanguages,
      []
    );
    this.setState({ filteredGenres: [], filteredEvents });
  };

  clearLanguages = () => {
    let { filteredGenres } = this.state;
    const filteredEvents = this.getEventWithLanguageAndGenre(
      [],
      filteredGenres
    );
    this.setState({ filterLanguages: [], filteredEvents });
  };

  render() {
    const {
      filterLanguages,
      availableLanguages,
      availableGenreList,
      availableEventsObjectList,
      filteredEvents,
      filteredGenres,
      selectedIndex,
      firstEventIndexInRow,
      loading
    } = this.state;

    if (loading) {
      return (
        <div className="w-percent-100 mr-auto bg-black-o9 h-vh-100 flex-vbox flex-cross-center flex-main-center">
          <div className="flex-auto">
            <FontAwesomeIcon
              className="fa-pulse fa-3x"
              icon={faSpinner}
              color="white"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="assignment-2 bg-black-o9">
        <div className="flex-hbox flex-cross-center flex-main-end pd-tb-xs filter-section">
          <div className="flex-auto w-px-200 mr-lg">
            <MultiCheckDropdown
              options={availableLanguages}
              value={filterLanguages}
              onSelect={this.languageChange}
              defaultLabel="All Languages"
            />
          </div>
          <div className="flex-auto w-px-200 mr-lg">
            <MultiCheckDropdown
              options={availableGenreList}
              value={filteredGenres}
              onSelect={this.genreChange}
              defaultLabel="All Genre"
            />
          </div>
        </div>
        {filterLanguages.length || filteredGenres.length ? (
          <div className="pd-lr-lg pd-tb-md bg-black-o9">
            {filterLanguages.length ? (
              <div className="flex-hbox pd-b-sm font-sm">
                <div className="flex-auto text-success pd-r-md">
                  Selected Languages :
                </div>
                {filterLanguages.map(language => (
                  <div
                    key={language}
                    className="flex-auto flex-hbox flex-cross-center text-white"
                  >
                    <div className="mr-lr-sm">{language}</div>
                    <span>|</span>
                  </div>
                ))}
                <div
                  className="cursor-pointer mr-lr-sm text-white hover-effect"
                  onClick={this.clearLanguages}
                >
                  Clear all Languages
                </div>
              </div>
            ) : null}
            {filteredGenres.length ? (
              <div className="flex-hbox font-sm">
                <div className="text-success pd-r-md">Selected Genres :</div>
                {filteredGenres.map(genre => (
                  <div
                    key={genre}
                    className="flex-auto flex-hbox flex-cross-center text-white"
                  >
                    <div className="mr-lr-sm">{genre}</div>
                    <span>|</span>
                  </div>
                ))}
                <div
                  className="cursor-pointer mr-lr-sm text-white hover-effect"
                  onClick={this.clearGenres}
                >
                  Clear all Genres
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="flex-hbox flex-cross-center flex-main-space-between">
          {filteredEvents.length ? (
            filteredEvents.map((eventCode, index) => {
              const event = availableEventsObjectList[eventCode];
              const selectedEvent =
                selectedIndex !== null
                  ? availableEventsObjectList[filteredEvents[selectedIndex]]
                  : null;
              return (
                <Fragment key={eventCode}>
                  {selectedEvent && firstEventIndexInRow === index ? (
                    <div
                      key="_trailer"
                      className="flex-auto pd-md w-percent-100 flex-hbox flex-main-center"
                    >
                      <div className="flex-auto w-percent-100 flex-hbox flex-cross-center flex-main-end">
                        <div
                          className="cursor-pointer pd-md mr-r-lg"
                          onClick={this.closePreview}
                        >
                          <FontAwesomeIcon
                            className="fa-2x"
                            icon={faTimes}
                            color="white"
                          />
                        </div>
                      </div>
                      <div className="flex-full mr-tb-md mr-lr-xs h-fixed-400 video-player">
                        <iframe
                          title={selectedEvent.EventTitle}
                          src={`${selectedEvent.TrailerURL.replace(
                            "watch?v=",
                            "embed/"
                          )}?autoplay=1`}
                          frameBorder="0"
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div
                        className={`flex-auto mr-tb-md mr-lr-xs h-fixed-400 bg-black-o9 details ${
                          this.props.width > 750
                            ? "w-percent-40"
                            : "w-percent-100"
                        }`}
                      >
                        <TrailerDetailsCard selectedEvent={selectedEvent} />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex-full mr-md trailer-card-container">
                    <TrailerInfoCard
                      event={event}
                      select={selectedIndex === index}
                      onClick={() => this.loadTrailer(index)}
                    />
                  </div>
                </Fragment>
              );
            })
          ) : (
            <div className="no-results w-percent-100 bg-black-o9 mr-auto flex-vbox flex-cross-center flex-main-center">
              <div className="flex-auto text-center">
                <div className="font-md pd-b-md">No Results Found!</div>
                <div className="font-sm text-warning">
                  Try removing all filters
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default windowDimensions()(Assignment2);
