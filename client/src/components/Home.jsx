import React from 'react';
import { Card } from 'reactstrap';

function Home({ loggedInUser }) {
  return (
    <div>
      <Card className="transparent-card">
        <h1>Welcome to Memory Museum!</h1>
        <p>Hello {loggedInUser?.firstName}, Feel free to look around, and make yourself at home.</p>
      </Card>
    </div>
  );
}

export default Home;