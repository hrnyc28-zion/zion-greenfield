import React, { useState } from 'react';
import { connect } from 'react-redux';
import reportAnswerAction from '../../../redux/actions/reportAnswer';
import QA_API from '../../../api/qa';

const dateFormatter = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const AnswerItem = ({ answer, reportAnswer }) => {
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness);

  const handleAnswerHelpful = async () => {
    const answerInfo = JSON.parse(localStorage.getItem(answer.id));
    if (!answerInfo || !answerInfo.votedAnswerHelp) {
      const response = await QA_API.markAnswerHelpful(answer.id);
      if (!response.error) {
        setHelpfulness(helpfulness + 1);
        localStorage.setItem(
          answer.id,
          JSON.stringify({ ...answerInfo, votedAnswerHelp: true })
        );
      }
    }
  };

  const handleReportAnswer = async () => {
    const response = await QA_API.reportAnswer(answer.id);
    if (!response.error) reportAnswer(answer.id);
  };

  return (
    <div data-testid="answerItem">
      <span>{answer.body}</span>
      <br />
      {answer.photos.map((photoUrl) => (
        <img
          key={Math.random() * 1000}
          src={photoUrl}
          alt=" "
          style={{ width: '120px', height: '120px' }}
          className="img-thumbnail"
        />
      ))}
      <br />
      by {answer.answerer_name}
      {', '}
      {dateFormatter(answer.date)} | Helpful?{' '}
      <button
        type="button"
        style={{
          color: '#919191',
          border: 'none',
          textDecoration: 'underline',
          outline: 'none'
        }}
        onClick={handleAnswerHelpful}
      >
        Yes
      </button>
      ({helpfulness}) |{' '}
      <button
        type="button"
        style={{
          color: '#919191',
          border: 'none',
          textDecoration: 'underline',
          outline: 'none'
        }}
        onClick={handleReportAnswer}
      >
        report
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reportAnswer: (id) => dispatch(reportAnswerAction(id))
  };
};

export default connect(null, mapDispatchToProps)(AnswerItem);
