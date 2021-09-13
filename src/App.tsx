import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {AddOrder} from "./components/AddOrder";
import {DeleteOrder} from "./components/DeleteOrder";
import {GetOrderDetails} from "./components/GetOrderDetails";

class App extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-brand">
                        Raft Orders
                    </div>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/orders"} className="nav-link">
                                Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/upload"} className="nav-link">
                                Upload Order
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/delete"} className="nav-link">
                                Delete Order
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/orders" component={GetOrderDetails}/>
                        <Route exact path="/upload" component={AddOrder}/>
                        <Route exact path="/delete" component={DeleteOrder}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
