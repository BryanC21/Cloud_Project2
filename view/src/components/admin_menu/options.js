import React, { Fragment } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { PlusCircle, XCircle } from 'react-bootstrap-icons';


class Options extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...props };
	}

	handleAddFields() {
		const values = [...this.state.data];
		values.push({ name: '' });
		this.setState({ data: values })
	};

	handleRemoveFields(index) {
		const values = [...this.state.data];
		values.splice(index, 1);
		this.setState({ data: values });
	};

	handleInputChange(index, value) {
		const values = [...this.state.data];
		values[index].name = value;
		this.setState({ data: values })
	};

	render() {
		return (
			<div className="mb-3">
				{this.state.data.map((item, index) => (
					<Fragment key={`${item}~${index}`}>
						<Col sm="6" className="mb-2">
							<Form.Label htmlFor="option">
								Option {index + 1} <a href="#"><XCircle color="red" size="20" onClick={() => this.handleRemoveFields(index)} /></a>
							</Form.Label>

							<Form.Control
								type="text"
								id={"option_" + index}
								name={"option_" + index}
								value={item.name}
								onChange={e => this.handleInputChange(index, e.target.value)}
							/>
						</Col>
					</Fragment>
				))}
				<a href="#" className="m-2"><PlusCircle size="20" onClick={() => this.handleAddFields()} /></a>
			</div>
		);
	}
};

export default Options;
