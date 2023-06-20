import React from 'react';
import { useGetLabelsQuery } from '../store/apiSlice';
import { getLabels } from '../helper/helper';

const Labels = () => {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data).map((v, i) => <LabelComponent key={i} data={v} />);
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return <>{Transactions}</>;
};

const LabelComponent = ({ data }) => {
  if (!data) return <></>;
  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div className='w-2 h-2 rounded py-3' style={{ background: data.color ?? '#f9c74f' }}></div>
        <h3 className='text-md'>{data.type ?? 'Error'}</h3>
      </div>
      <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
};

export default Labels;
