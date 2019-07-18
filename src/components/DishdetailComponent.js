import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Media } from 'reactstrap';


function RenderDish({ dish }) {
    console.log(dish);

    if (dish != null && typeof (dish) !== 'undefined') {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText >{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return (<div></div>);
    }
}
function RenderComments({ dish }) {
    var Comments = [];
    if (dish != null && typeof (dish) !== 'undefined') {
        dish.comments.map((comment) => {
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
    } else {
        return (<div></div>);
    }

}

const Dishdetail = (props) => {
    return (
        <div className="container text-left">
            <div className="row">
                <div className="col-12 col-md-5 m1">
                    <RenderDish dish={props.dish} />
                </div>
                <RenderComments dish={props.dish} />
            </div>
        </div>
    );
}

export default Dishdetail;