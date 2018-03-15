const React = require('react');
import { Link } from 'react-router';
const {connect} = require('react-redux');

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
};

export default connect((state) => { return state; })(Layout); 