import React from 'react';
import { Pane } from '@cybercongress/gravity';
import { Indicators, Card, ContainerCard } from '../../components';

const StatisticsClaim = ({ canClaim, raisedToken, roundAll, round }) => {
  if (round <= roundAll) {
    return (
      <Pane
        alignItems="center"
        gridGap="25px"
        display="grid"
        justifyItems="center"
        width="100%"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        marginBottom="20px"
      >
        <Card
          title="Raised GOL"
          value={raisedToken}
          tooltipValue="The number of total ETH, currently, raised"
          positionTooltip="bottom"
          stylesContainer={{ padding: '35px 0', maxWidth: '300px' }}
        />
        <Card
          title="One can Claim"
          value={canClaim}
          tooltipValue="The current round out of the total number of rounds in the Auction"
          positionTooltip="bottom"
          stylesContainer={{ padding: '35px 0', maxWidth: '300px' }}
        />
      </Pane>
    );
  }
  if (round > roundAll) {
    return (
      <ContainerCard styles={{ alignItems: 'center' }} col="1">
        <Card
          title="Raised"
          value={`${raisedToken} ETH`}
          tooltipValue="The number of the total ETH, currently, raised"
          positionTooltip="bottom"
        />
      </ContainerCard>
    );
  }
  return null;
};

export default StatisticsClaim;
