'use client'
import { useState, useEffect } from 'react';

import { initialUsers } from './constants';

export default function Home() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUserIndex, setCurrentUserIndex]:any = useState(0);
  const [isChoosing, setIsChoosing] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [startStandup, setStartStandup] = useState(false);

  const nextUser = () => {
    setStartStandup(true);
    setIsChoosing(true);
    let cycles = 0;
    const interval = setInterval(() => {
      setCurrentUserIndex(Math.floor(Math.random() * users.length));
      cycles++;
      if (cycles > 10) {
        clearInterval(interval);
        setIsChoosing(false);
        // Remove chosen user

        console.log(users[currentUserIndex], currentUserIndex);

        const newUsers = users.filter((user) => user !== users[currentUserIndex]);

        if (firstRun) {
          setFirstRun(false);
        }
        else {
          setUsers(newUsers);
        }
        if (newUsers.length > 0) {
          setCurrentUserIndex(Math.floor(Math.random() * newUsers.length));
        } else {
          setCurrentUserIndex(null);
        }
      }
    }, 100);
  };

  const removeUser = (user: string) => {
    const newUsers = users.filter((u) => u !== user);
    setUsers(newUsers);
    if (newUsers.length > 0) {
      setCurrentUserIndex(Math.floor(Math.random() * newUsers.length));
    } else {
      setCurrentUserIndex(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 relative">
      <div className="absolute top-4 w-full text-center">
        <div className="text-gray-700">
          { 
            users.map((user, index) => (
              <span key={index} onClick={(e) => removeUser(user)} className="inline-block cursor-pointer bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {user}
              </span>
            ))
          }
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        {users.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 md:p-16 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Congratulations, standup is complete!</h2>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg min-w-96 py-12 flex flex-col items-center text-center">
            {!startStandup ? 
              (<h2 className="text-2xl text-center font-semibold mb-4">Start a standup!</h2>)
            : (<div>
              <h2 className="text-xl font-semibold mb-4">Standup Turn:</h2>
              <div className="text-4xl font-bold mb-4">
                {users[currentUserIndex]}
              </div>
            </div>
          )}
            <button 
              onClick={nextUser}
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${isChoosing ? 'opacity-50 cursor-progress' : ''}`}
              disabled={isChoosing}
            >
              {users.length === 1 ? 'Finish Standup' : 'Next'}
            </button>
          </div>
        )}
      </div>
      <div className="absolute bottom-1 w-full text-center">
        <div className="text-gray-700 text-xs	">
          v1.0.0
        </div>
      </div>
    </div>
  );
}