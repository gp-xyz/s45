import { useEffect, useState } from 'react';
import config from './config';
import { useAppContext } from './AppContext';
function Tribes() {
  const colors = ['#b71c1c', '#880E4F', '#6A1B9A', '#4527A0', '#283593',
    '#1565C0', '#006064', '#004D40', '#2E7D32', '#558B2F',
    '#9E9D24', '#FBC02D', '#FFA000', '#E64A19', '#D84315',
    '#4E342E', '#616161', '#455A64', '#00838F', '#C62828']


  const [listview, setListView] = useState(false);
  const [colorobj, setColorobj] = useState(colors);
  const { tribes, deadList } = useAppContext();
  useEffect(() => {
    let curcolor = 0;
    let newobj = {};
    
    tribes.forEach(tribe => {
      tribe.survivors.forEach(survivor => {
        if (!(survivor in newobj)) {
          newobj[survivor] = colors[curcolor];
          curcolor++;
        }
      });
    });
    setColorobj(newobj);
  }, [tribes]);


  const toggleListView = () => {
    setListView(!listview);
  };
  return (
    <div className='bubblebox'>
      <h2 className='sofaheader'>
        Tribes:{' '}
        <button onClick={toggleListView} className='bg-slate-300 rounded-xl border-blue-500 border-2 hover:bg-slate-400'>
          {listview ? 'Show Tribe Photo' : 'Show Leaderboard'}
        </button>
      </h2>

      {listview ? (
        <div className='bg-slate-400 rounded-sm p-4 grid grid-cols-1'>
          {tribes.length ? (tribes.map((tribe, index) => (
            <div className='grid grid-cols-2 md:grid-cols-5'>
              <div className='col-span-2 underline md:no-underline'>
              <span className='p-2 text-white drop-shadow-md '>
                    ({tribe.survivors.filter(survivor => !deadList.includes(survivor)).length})
                </span>
                {tribe.name}
              </div>
              
              {tribe.survivors.map((survivor, index) => {
                const isDead = deadList.includes(survivor);
                return (
                  <div className={`p-2 font-semibold ${isDead ? 'line-through' : ''}`} key={survivor}>
                    <font color={colorobj[survivor]}> {survivor} </font>
                  </div>
                );
              })}
              
            </div>
          ))) : (<div className='lilbubble'>Loading..</div>)}
        </div>
      ) : (
        <ul>
          {tribes.map((tribe, index) => (
            <li key={index} className='lilbubble max-h-50'>
              <div className='grid grid-cols-1 md:grid-cols-2 inline-block align-middle'>
                <div>
                  <strong>{tribe.name}</strong> - {tribe.motto}
                  <br />
                  [{tribe.survivors.join(', ')}] <br />
                </div>
                
                <div className='grid grid-cols-3 border-yellow-300 border-4 p-1'>
                  {tribe.survivors.map((survivor, index) => {
                    const isDead = deadList.includes(survivor);
                    return (
                      <div className='image-container' key={index}>
                        <img
                          className='w-full h-auto'
                          src={'/images/' + survivor + '.jpg'}
                          alt={survivor}
                        />
                        { isDead && (
                          <div className='overlay'></div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default Tribes;
