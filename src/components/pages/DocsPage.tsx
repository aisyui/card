import { useQuery } from '@tanstack/react-query';
import Navigation from '../common/Navigation';
import { fetchFanarts } from '../../utils/api';

interface DocsPageProps {
  isEnglish?: boolean;
  page?: 'did' | 'vr' | 'aiten' | 'cards' | 'seven' | 'fanart' | 'photo' | 'favorite';
}

export default function DocsPage({ isEnglish = false, page }: DocsPageProps) {
  const { data: fanarts } = useQuery({
    queryKey: ['fanarts'],
    queryFn: fetchFanarts,
    enabled: page === 'fanart',
  });

  const renderContent = () => {
    if (page === 'did') {
      return (
        <div className="prose max-w-none">
          <h3>DID</h3>
          <blockquote className="bg-primary text-white p-8 text-center">
            <p>
              Decentralized identifiers (DIDs) are a new type of identifier that enables verifiable, 
              decentralized digital identity. A DID refers to any subject (e.g., a person, organization, 
              thing, data model, abstract entity, etc.) as determined by the controller of the DID.
            </p>
          </blockquote>
          <p>
            <a href="https://www.w3.org/TR/did-core/" target="_blank" rel="noopener noreferrer">
              https://www.w3.org/TR/did-core/
            </a>
          </p>
        </div>
      );
    }

    if (page === 'fanart' && fanarts) {
      return (
        <div>
          <p><code>/fa &lt;share-url&gt; &lt;img-url&gt;</code></p>
          <div className="grid gap-6">
            {fanarts.data.filter(item => !item.delete).map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img src={item.img} alt="" className="max-w-full h-auto" />
                  </a>
                </p>
                <p>
                  author: <a href={`https://bsky.app/profile/${item.author}`} target="_blank" rel="noopener noreferrer">
                    {item.author}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default documentation content
    return (
      <div className="prose max-w-none">
        <p>{isEnglish ? 'Cards can be drawn once a day' : 'カードは1日に1回、引くことができます'}</p>
        <p>{isEnglish ? 'Card emission rates are as follows' : 'カードの排出率は以下のとおりです'}</p>
        
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">normal</td>
              <td className="border border-gray-300 p-2">rare</td>
              <td className="border border-gray-300 p-2">super</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">90%</td>
              <td className="border border-gray-300 p-2">9%</td>
              <td className="border border-gray-300 p-2">1%</td>
            </tr>
          </tbody>
        </table>

        <h3>{isEnglish ? 'Battle' : '対戦について'}</h3>
        <p><code>@yui.syui.ai /card -b</code></p>
        <p>{isEnglish ? 'Random match, one of the top 3 cards on hand will be chosen at random' : 'ランダムマッチ、手持ちの上位3枚のうち1枚がランダムで選ばれます'}</p>

        <h3>Mastodon</h3>
        <p>
          <code>
            <a href="https://mstdn.syui.ai/@yui" target="_blank" rel="noopener noreferrer">
              @yui@syui.ai
            </a> /card
          </code>
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}