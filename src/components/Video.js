import PropTypes from 'prop-types';
import React from 'react';

function Video({ video }) {
  return (
    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        data-testid="video"
        src={ `https://www.youtube.com/embed/${video}` }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

Video.propTypes = {
  video: PropTypes.string,
}.isRequired;

export default Video;
