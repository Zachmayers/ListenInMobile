import { Provider } from "../Context";
import Login from "../components/Login";
import UserList from "../components/UserList";
import { Actions } from "../Actions";
import Logo from "../components/Rustics_logo"
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TitleBlock from '../components/TitleBlock';
import Mask_Image from '../components/Mask_Image';
import SupplyList from '../components/SupplyList';

function GeometricMacraweave() {
  const data = Actions();
  const materials = ["32x White Cotton Strands", "14x Mustard Cotton Strands", "10-inch Metal Ring Comb"]
  const notIncluded = ["Hot Glue", "Scissors"];
  return (
        <Provider value={data}>
        <div className="container">
            <h1> Macrame Online </h1>
            <div className="row row-4 justify-content-center">
                <div className="col col-4">
                  <Login />
                  <Logo />
                </div>
                <div className="row row-2 justify-content-center">
                  <div className="col col-4">
                    <TitleBlock title="Geometric Macraweave" bottom_text="It's a little macrame, a little weaving."/>
                  </div>
                </div>
                <div className="row row-2 justify-content-center">
                  <div className="col col-4">
                    <Mask_Image/>
                  </div>
                  <div className="col col-4">

                    <SupplyList materials={materials} notIncluded={notIncluded}/>
                  </div>
                </div>
            </div>
        </div>
        </Provider>
  );
}

export default GeometricMacraweave;