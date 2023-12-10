import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import useBearStore from '../../stores/bears/bears.store';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />

        <PolarBears />

        <PandaBears />

        <BearsDisplay />
      </div>
    </>
  );
};

const BlackBears = () => {
  const backBears = useBearStore(state => state.blackBears);
  const increaseBlackBear = useBearStore(state => state.increaseBlackBear);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBear(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {backBears} </span>
        <button onClick={() => increaseBlackBear(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

const PolarBears = () => {
  const polarBear = useBearStore(state => state.polarBear);
  const increasePolarBear = useBearStore(state => state.increasePolarBear);
  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBear(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBear} </span>
        <button onClick={() => increasePolarBear(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

const PandaBears = () => {
  const pandaBear = useBearStore(state => state.pandaBear);
  const increasePandaBear = useBearStore(state => state.increasePandaBear);
  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBear(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBear} </span>
        <button onClick={() => increasePandaBear(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

const BearsDisplay = () => {
  const bears = useBearStore(useShallow(state => state.bears));
  const doNothing = useBearStore(state => state.doNothing);
  const addBear = useBearStore(state => state.addBear);
  const clearBears = useBearStore(state => state.clearBears);

  return (
    <WhiteCard>
      <h1>Osos</h1>

      <button onClick={doNothing}>DO NOTHING</button>
      <button className="mt-2" onClick={addBear}>
        Agregar oso
      </button>
      <button className="mt-2" onClick={clearBears}>
        Limiar osos
      </button>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};

export default BearPage;
