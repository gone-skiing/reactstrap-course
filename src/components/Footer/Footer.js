import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer>
                <a href={"/schedule-test-flight"}>Schedule a Test Flight! No pilot's license required.</a>
            </footer>
        );
    }
}

export default Footer;