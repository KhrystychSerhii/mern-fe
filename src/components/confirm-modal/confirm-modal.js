import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmModal extends Component {
	render() {
		const { isOpen, noAction, yesAction } = this.props;
		return (
			<Modal isOpen={isOpen} toggle={noAction}>
				<ModalHeader toggle={noAction}>Please, confirm your action.</ModalHeader>
				<ModalBody>
					Are you sure?
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={yesAction}>Yes</Button>{' '}
					<Button color="secondary" onClick={noAction}>No</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

ConfirmModal.propTypes = {
	isOpen: PropTypes.bool,
	yesAction: PropTypes.func,
	noAction: PropTypes.func,
};

export default ConfirmModal;