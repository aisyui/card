import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '../common/Navigation';
import { fetchUsers } from '../../utils/api';

export default function HomePage() {
  const [didEnable, setDidEnable] = useState(false);
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers()
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fa-solid fa-spinner fa-spin text-6xl text-yellow-500"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <a href="/docs" className="btn">help</a>
          <a href="/en" className="btn ml-2">en</a>
          <a href="/pr" className="btn ml-2">fav</a>
          <a href="/te" className="btn ml-2">ten</a>
          <button 
            onClick={() => setDidEnable(!didEnable)}
            className="btn ml-2"
          >
            did
          </button>
          <a href="/c" className="btn ml-2">all</a>
          <a href="/svn" className="btn ml-2">seven</a>
        </div>

        {users?.data && Array.isArray(users.data) && users.data.length > 0 && (
          <div className="bg-white rounded-lg p-6">
            <div className="grid gap-4">
              {users.data.map((user) => (
                <div key={user.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                      {user.model && (
                        <button className="text-lg">
                          <i className="fa-solid fa-cube"></i>
                        </button>
                      )}
                      {user.fav !== '0' && (
                        <button className="text-lg">✧</button>
                      )}
                      {user.username === 'ai' && (
                        <a 
                          href={`https://git.syui.ai/${user.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg"
                        >
                          <i className="fa-brands fa-git-alt"></i>
                        </a>
                      )}
                      <button className="btn-sm">ID {user.id}</button>
                    </div>
                  </div>
                  
                  <div className="text-lg">
                    <a href={`/${user.username}`} className="font-semibold">
                      {user.username}
                    </a>
                  </div>
                  
                  {didEnable && user.did && (
                    <div className="mt-2">
                      {user.did.includes('did:') ? (
                        <button className="btn-sm">
                          <a 
                            href={`https://plc.directory/${user.did}/log`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light"
                          >
                            {user.did}
                          </a>
                        </button>
                      ) : user.did.includes('http') ? (
                        <button className="btn-sm">
                          <a 
                            href={user.did}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light"
                          >
                            {user.did}
                          </a>
                        </button>
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}