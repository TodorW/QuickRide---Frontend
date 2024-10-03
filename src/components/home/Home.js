import Cars from "../cars/Cars";
import Header from "../layout/Header";

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Cars Component */}
      <Cars /> {/* Include Cars component here */}
    </div>
  );
};

export default Home;
