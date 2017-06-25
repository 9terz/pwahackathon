import React from "react";
// import {connect} from "react-redux";
import { database } from '../actions/database'

export class Previous extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lotto: {
                "one": "1234",
                "two": ["1"],
                "three": ["1"],
                "four": ["1"],
                "five": ["1"]
            }
        }
    }

    getHuays() {
        let ref = database.ref('previous')
        ref.on('value', (s) => {
            const lottos = s.val()
            console.log(lottos)
            this.setState({
                lotto: lottos.lotto
            })
        }, (err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getHuays()
    }

    nearNumber(string) {
        let near1 = string.substring(0, string.length - 1) + (+string[string.length - 1] + 1)
        let near2 = string.substring(0, string.length - 1) + (+string[string.length - 1] - 1)
        return [near2, near1]
    }

    listHuays() {
        return (
            <div>
                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 1</h1>
                <br></br>
                <div className="columns">
                    <div className="column mytd is-2 is-offset-5 is-narrow">
                        {this.state.lotto.one}
                    </div>

                </div>

                <h1 style={{ 'fontSize': 2 + 'rem' }}>ข้างเคียงรางวัลที่ 1</h1>
                <br></br>
                <div className="column is-10 is-offset-3">

                    <div className="columns">
                        {this.nearNumber(this.state.lotto.one).map((num) => {
                            return <div className="column mytd is-one-quarter is-narrow">{num}</div>
                        })}
                    </div>
                </div>
                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 2</h1>
                <br></br>
                <div className="column is-10 is-offset-1">
                    <div className="columns is-multiline is-mobile">
                        {
                            this.state.lotto.two.map((num) => {
                                return <div className='column is-one-quarter mytd is-narrow'>{num}</div>
                            })}
                    </div>
                </div>

                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 3</h1>
                <br></br>
                <div className="column is-10 is-offset-1">
                    <div className="columns is-multiline is-mobile">
                        {
                            this.state.lotto.three.map((num) => {
                                return <div className='column is-one-quarter mytd is-narrow'>{num}</div>
                            })}
                    </div>
                </div>

                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 4</h1>
                <br></br>
                <div className='columns'>
                    <div className="column is-10 is-offset-1">
                        <div className="columns is-multiline is-mobile">
                            {
                                this.state.lotto.four.map((num) => {
                                    return <div className='column is-one-quarter mytd is-narrow'>{num}</div>
                                })}
                        </div>
                    </div>
                </div>

                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 5</h1>
                <br></br>
                <div className='columns'>
                    <div className="column is-10 is-offset-1">
                        <div className="columns is-multiline is-mobile">
                            {
                                this.state.lotto.five.map((num) => {
                                    return <div className='column is-one-quarter mytd'>{num}</div>
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container is-fluid has-text-centered">
                <div>
                    <h1 style={{ 'fontSize': 2 + 'rem' }}>สลากกินแบ่งรัฐบาลงวดที่แล้ว</h1>
                </div>
                <br></br>
                {this.listHuays()}
            </div>
        );
    }
}

