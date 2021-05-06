import React, { useState, useEffect } from 'react';
import SubmissionList from '../components/SubmissionList';
import SubmisisonForm from '../components/SubmissionForm';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  // const loggedIn = Auth.loggedIn();

  //this use effect will render all the submissions on the component mount event 
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      // sort the array by createdAt property ordered by descending values
      const orderData = data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
      setSubmissions(orderData);
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <SubmisisonForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
              <SubmissionList submissions={submissions} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;