import { Card } from 'reactstrap';
import { PropTypes } from "prop-types"

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
Home.propTypes = {
    loggedInUser: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
    }).isRequired
};

export default Home;