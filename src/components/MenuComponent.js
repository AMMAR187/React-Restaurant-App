import React, { Component } from 'react';
import { Media } from "reactstrap";
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import Dishdeatail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }


    // renderDish(dish) {
    //     if (dish != null) {
    //         return (
    //             <Dishdeatail dish={dish} />
    //         );
    //     } else {
    //         return (<div></div>);
    //     }
    // }
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1" >
                    <Card onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay >
                            <CardTitle >{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        })
        return (
            <div className="container text-left">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}
export default Menu;