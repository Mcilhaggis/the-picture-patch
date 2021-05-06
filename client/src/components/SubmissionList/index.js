import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ submissions, title }) => {
  if (!submissions.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {submissions &&
      submissions.map((submission) => (
        <div key={submission.createdAt} className="card mb-3">
          <p className="card-header">
          <Link
                to={`/profile/${submission.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
            {submission.username}'s thought on {new Date(parseInt(submission.createdAt)).toString()}
            </Link>{' '}
            </p>
            <p className="px-2">
            {submission.submission}
            </p>

          </div>
      ))}
    </div>
  );
};

export default ThoughtList;
