import React from 'react'

import { database } from 'actions/database'

import './style.scss'

export default class Ranking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ranks: [
                {
                    number: 99,
                    count: 20,
                    photos: [],
                },
                {
                    number: 23,
                    count: 39,
                    photos: [],
                },
                {
                    number: 42,
                    count: 230,
                    photos: [],
                },
                {
                    number: 12,
                    count: 230,
                    photos: [],
                },
                {
                    number: 32,
                    count: 230,
                    photos: [],
                },
                {
                    number: 42,
                    count: 20,
                    photos: [],
                },
                {
                    number: 42,
                    count: 230,
                    photos: [],
                },
                {
                    number: 12,
                    count: 230,
                    photos: [],
                },
                {
                    number: 32,
                    count: 230,
                    photos: [],
                },
                {
                    number: 42,
                    count: 20,
                    photos: [],
                },
                {
                    number: 42,
                    count: 230,
                    photos: [],
                },
                {
                    number: 12,
                    count: 230,
                    photos: [],
                },
                {
                    number: 32,
                    count: 230,
                    photos: [],
                },
                {
                    number: 42,
                    count: 20,
                    photos: [],
                },
                {
                    number: 32,
                    count: 230,
                    photos: [],
                },
                {
                    number: 42,
                    count: 20,
                    photos: [],
                },
                {
                    number: 42,
                    count: 230,
                    photos: [],
                },
                {
                    number: 12,
                    count: 230,
                    photos: [],
                },
                {
                    number: 32,
                    count: 230,
                    photos: [],
                },
                {
                    number: 42,
                    count: 20,
                    photos: [],
                },
            ]
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
        return this.state.ranks.map((rank, index) => {
            return (
                <div className="columns is-mobile has-text-centered"
                key={index}>
                    <div className="column is-4">
                        {rank.number}
                    </div>
                    <div className="column is-4">
                        {rank.count}
                    </div>
                    <div className="column is-4">
                        Photo
                    </div>
                </div>
            )
        })
    }

    getRanking() {
        const numbers = database.ref('rich-numbers')
        numbers.on('value', (s) => {
            console.log(s)
            console.log(s.val())
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