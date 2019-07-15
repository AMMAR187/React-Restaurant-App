import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Media } from 'reactstrap';

class Dishdetail extends Component {
    constructor(props) {
        super(props);

    }
    renderComments(Dish) {
        var Comments = [];
        if (typeof (Dish) !== 'undefined') {
            Dish.comments.map((comment) => {
                Comments.push(
                    <Media as="li" key={comment.id}>
                        <Media body>
                            <p>{comment.comment}</p>
                            <p>--{comment.author} ,{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                        </Media>
                    </Media>
                );
            });
            return (
                <div className="col-12 col-md-5 m1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled" >
                        {Comments}
                    </ul>
                </div>

            );
        }
    }
    render() {

        var Dishdetail = [];
        var dish = [];
        if (this.props.dish) {
            Dishdetail = this.props.dish;
            dish =
                <Card>
                    <CardImg top src={Dishdetail.image} alt={Dishdetail.name} />
                    <CardBody>
                        <CardTitle>{Dishdetail.name}</CardTitle>
                        <CardText >{Dishdetail.description}</CardText>
                    </CardBody>
                </Card>;
        }









        return (
            <div className="container text-left">
                <div className="row">
                    <div className="col-12 col-md-5 m1">
                        {dish}
                    </div>
                    {this.renderComments(this.props.dish)}
                </div>
            </div>



        );
    }
}

export default Dishdetail;