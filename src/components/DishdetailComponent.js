import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Media, Button, Breadcrumb, BreadcrumbItem, Modal, Row, Label, Col, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select className="form-control" model=".rating" name="rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text
                                        className="form-control" model=".author" name="author"
                                        id="author" placeholder="Your Name"
                                        validators={{ minLength: minLength(3), maxLength: maxLength(15) }} />

                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={
                                            {
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label for="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea className="form-control" rows="12" model=".comment" name="comment" id="comment" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>

        );
    }

}



function RenderDish({ dish }) {
    if (dish != null && typeof (dish) !== 'undefined') {
        return (
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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
function RenderComments({ comments, postComment, dishId }) {
    var Comments = [];
    if (comments != null && typeof (comments) !== 'undefined') {
        comments.map((comment) => {
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
            <div >
                <h4>Comments</h4>
                <ul className="list-unstyled" >
                    {Comments}
                    <CommentForm dishId={dishId} postComment={postComment} />
                </ul>
            </div>
        );
    } else {
        return (<div></div>);
    }

}

const Dishdetail = (props) => {
    
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container text-left">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m1">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
                    </div>
                </div>

            </div>
        );
    }
}

export default Dishdetail;