import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';
import {ImgPostSlides} from "./ImgPostSlides";
import {ImgAPI} from "./ImgAPI";

export class ImgPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      comments: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const newState = {isOpen: !this.state.isOpen};
    if (newState.isOpen) {
      this.loadComments(this.props.id)
    } else {
      this.setState(newState);
    }
  }

  loadComments(id) {
    ImgAPI.fetch(`gallery/${id}/comments`)
      .then(response => {
        this.setState({
          isOpen: true,
          comments: response.data.slice(0, 5)
        })
      })
  }

  render() {
    const comments = this.state.comments.map(c =>
      <ListGroupItem key={c.id}>
        <b>{c.author}</b>: {c.comment} <Badge pill>{c.ups}</Badge>
      </ListGroupItem>);

    return (
      <Card body>
        <CardImg top width="100%" src={this.props.src} alt="" onClick={this.toggle}/>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle>{this.props.tags}</CardSubtitle>
        </CardBody>

        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <ImgPostSlides images={this.props.images}/>

            <br/>

            <ListGroup>
              {comments}
            </ListGroup>
          </ModalBody>
        </Modal>
      </Card>
    );
  }
}
