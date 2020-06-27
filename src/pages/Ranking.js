import React, {Component} from 'react'
import Menu from '../components/Menu'
import ListScore from '../components/ListScore'

class Ranking extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <div className="container">
                    <div>
                        <ListScore/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ranking
