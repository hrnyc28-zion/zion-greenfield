import React from 'react';
import { connect } from 'react-redux';
import changeProduct from '../redux/actions/changeProduct';
import sampleStore from '../sampleData/sampleStore';
import Overview from './overview';
import RelateAndCompare from './related-items/RelateAndCompare';
import ReviewWidget from './reviews';
import QA from './QA';

function App({ initStore }) {
  initStore();

  return (
    <div className="container">
      <br />
      <br />
      <header>
        <h1>Zion Greenfield</h1>
      </header>
      <Overview />
      <br />
      <br />
      <RelateAndCompare sampleStore={sampleStore} />
      <br />
      <br />
      <QA />
      <br />
      <br />
      <ReviewWidget sampleStore={sampleStore} />
      <br />
      <br />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    initStore: () => dispatch(changeProduct(13))
  };
};

export default connect(null, mapDispatchToProps)(App);
