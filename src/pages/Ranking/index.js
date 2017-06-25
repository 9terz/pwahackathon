import React from 'react'
import _ from 'lodash'

import { database } from 'actions/database'

import './style.scss'

export default class Ranking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ranks: {},
        }
    }

    setRankingHeight() {
        const ranking = document.getElementById('ranking')
        const paper = document.getElementById('paper-img').height

        ranking.style.maxHeight = `${paper - 100}px`
    }

    componentDidMount() {
        window.addEventListener('load', this.setRankingHeight)
        window.addEventListener('resize', this.setRankingHeight)
        this.getRanking()
    }

    listRanking() {
        return Object.keys(this.state.ranks).map((rank, index) => {
            return (
                <div className="columns is-mobile has-text-centered"
                key={index}>
                    <div className="column is-4">
                        { rank }
                    </div>
                    <div className="column is-4">
                        { this.state.ranks[rank] }
                    </div>
                    <div className="column is-4">
                        Photo
                    </div>
                </div>
            )
        })
    }

    getRanking() {
        const ref = database.ref('img')
        ref.on('value', (s) => {
           const numbers = s.val()
           console.log(numbers)
           this.setState({
               ranks: _.countBy(numbers, 'predictResult'),
           })
        }, (err) => {
            console.log(err)
        })
        // console.log(numbers)
    }

    render() {
        return (
            <div id="ranking-page">
                <h1 className="title has-text-centered">เลขมงคล สุดฮอต</h1>
                <div id="paper" className="column is-8 is-offset-2 has-text-centered">
                    <div className="wrapper">
                        <img id="paper-img" src="/img/paper.png" alt="paper"/>
                        <div id="ranking">
                            <div className="columns is-mobile has-text-centered">
                                <div className="column is-4">
                                    เลขมงคล
                                </div>
                                <div className="column is-4">
                                    จำนวนบังเกิด
                                </div>
                                <div className="column is-4">
                                    รูปภาพ
                                </div>
                            </div>
                            {
                                this.listRanking()
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}