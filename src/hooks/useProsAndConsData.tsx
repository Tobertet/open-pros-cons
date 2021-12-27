import { createContext, FC, useContext, useEffect, useState } from 'react';

import { Storage } from '@capacitor/storage';
import { ProsAndConsList } from '../components/models';

import moment from 'moment';

const ProsAndConsContext = createContext<{
  lists: ProsAndConsList[];
  create: () => ProsAndConsList;
  remove: (id: number) => void;
  update: (listToUpdate: ProsAndConsList) => void;
}>({
  lists: [],
  create: () => {
    throw new Error('ProsAndConsContext has not been initialized yet');
  },
  remove: (id: number) => {
    throw new Error('ProsAndConsContext has not been initialized yet');
  },
  update: (listToUpdate: ProsAndConsList) => {
    throw new Error('ProsAndConsContext has not been initialized yet');
  },
});

export const ProsAndConsListsProvider: FC = ({ children }) => {
  const [prosAndConsLists, setProsAndConsLists] = useState<ProsAndConsList[]>(
    [],
  );

  useEffect(() => {
    Storage.set({
      key: 'prosAndConsLists',
      value: JSON.stringify(prosAndConsLists),
    });
  }, [prosAndConsLists]);

  useEffect(() => {
    Storage.get({ key: 'prosAndConsLists' }).then(data => {
      if (data.value) {
        setProsAndConsLists(JSON.parse(data.value));
      }
    });
  }, []);

  const create = () => {
    const newList = {
      pros: [],
      cons: [],
      name: 'New Pros & Cons list',
      lastEditionDate: moment().format(),
      id:
        prosAndConsLists.reduce(
          (prev, current) => {
            return prev.id > current.id ? prev : current;
          },
          { id: 0 },
        ).id + 1,
    };

    setProsAndConsLists(previous => [...previous, newList]);
    return newList;
  };

  const update = (listToUpdate: ProsAndConsList) => {
    setProsAndConsLists(previous =>
      previous.map(list =>
        list.id === listToUpdate.id ? { ...listToUpdate } : list,
      ),
    );
  };

  const remove = (id: number) => {
    setProsAndConsLists(previous => previous.filter(list => list.id !== id));
  };

  return (
    <ProsAndConsContext.Provider
      value={{ lists: prosAndConsLists, create, update, remove }}
    >
      {children}
    </ProsAndConsContext.Provider>
  );
};

export const useProsAndConsData = () => {
  return useContext(ProsAndConsContext);
};
