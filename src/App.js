import { useEffect, useState } from 'react';
import './App.css';
import lottery from './lotteryContract';
import web3 from './web3';

function App() {
  const [ manager, setManager ] = useState('');
  const [ players, setPlayers ] = useState([]);
  const [ value, setValue ] = useState('');
  const [ lotteryBalance, setLotteryBalance ] = useState('');
  const [ msgNotification, setMessage ] = useState('');

  useEffect(()=>{

    const fetchLotteryData = async () => {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      setManager(manager);
      setPlayers(players);
      setLotteryBalance(balance);
    }

    fetchLotteryData();
  }, [manager,players,lotteryBalance]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const userAccount = await web3.eth.getAccounts();

    setMessage('Waiting on transaction to occurr...');

    await lottery.methods.enter().send({
      from: userAccount[0],
      value: web3.utils.toWei(value, 'ether')
    });

    setMessage('You have successfully entered the pool!!!');
  }

    // const getAddress = async () => {
  //   console.log(await web3.eth.getAccounts());; 
  // }

  // getAddress();

  return (
    <>
      <h2 className="Lottery-header">Lottery Contract </h2>
      <div className="lottery-body">
        <h4>This contract is managed by { manager }</h4>
        <p>There are currently {players.length} people that have entered into the lottery pool, competing 
           to win {web3.utils.fromWei(lotteryBalance, 'ether')} ether.</p>

         <hr />

         <form onSubmit={onSubmit}>
           <h4>You want to try your luck?</h4>
           <div>
             <label>Amount of ether to enter</label>
             <input value={value} name="value" onChange={event => setValue(event.target.value)}/>
           </div>
           <button>Enter</button>
         </form>

         <hr />
         {msgNotification}
      </div>
    </>
  );
}

export default App;
