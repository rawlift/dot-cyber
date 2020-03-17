import React, { useEffect, useState } from 'react';
import { DISTRIBUTION } from '../../../utils/config';
import { Dots } from '../../../components';
import { getLifetime } from '../../../utils/game-monitors';
import { formatNumber } from '../../../utils/utils';
import RowTable from '../components/row';

const Lifetime = ({
  validatorAddress,
  subscribeToNewComments,
  reward = 0,
  won = 0,
  dataQ,
}) => {
  const [loading, setLoading] = useState(true);
  const [cybWonAbsolute, setCybWonAbsolute] = useState(0);
  const [cybWonPercent, setCybWonPercent] = useState(0);
  const currentPrize = Math.floor(
    (won / DISTRIBUTION.takeoff) * DISTRIBUTION.delegation
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLifetime({
        block: dataQ.pre_commit_aggregate.aggregate.count,
        preCommit: dataQ.validator[0].pre_commits_aggregate.aggregate.count,
      });
      const cybAbsolute = data * currentPrize;
      setCybWonAbsolute(cybAbsolute);
      if (cybAbsolute !== 0) {
        const cybPercent = (cybAbsolute / currentPrize) * 100;
        setCybWonPercent(cybPercent);
      }
      setLoading(false);
    };
    fetchData();
  }, [won, dataQ]);

  return (
    <RowTable
      text="lifetime"
      reward={DISTRIBUTION.delegation}
      currentPrize={currentPrize}
      cybWonAbsolute={
        loading ? <Dots /> : formatNumber(Math.floor(cybWonAbsolute))
      }
      cybWonPercent={loading ? <Dots /> : `${formatNumber(cybWonPercent, 2)}%`}
    />
  );
};

export default Lifetime;
