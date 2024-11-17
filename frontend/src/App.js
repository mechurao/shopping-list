import {Routes, Route, useParams} from "react-router-dom";
import './App.css';
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Overview from "./routes/Overview";
import ListDetail from "./routes/ListDetail";

function App() {

    function getListComponent(params){
        const {listID} = params;
        if(!listID){
            return <Overview/>;
        }
        return <ListDetail listID={listID}/>

    }

    function ListRoute() {
        const params = useParams();
        return getListComponent(params);
    }


  return (
      <>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/overview/:listID?" element={<ListRoute/>} />
        </Routes>
      </>
  );
}

export default App;
