import PropTypes from 'prop-types';
import React from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  return (
    <AppContext.Provider
      value={ {} }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
