import React from "react";
// import {connect} from "react-redux";

export class Previous extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lotto: {
                "one": "943142",
                "two": ["132638", "468073", "569856", "741768", "783352"],
                "three": ["074200", "176203", "185966", "274366", "281764", "359895", "758373", "934554", "964747", "970026"],
                "four": ["095717", "108104", "118584", "145610", "150857", "173990", "208843", "216100", "246220", "250253", "255433", "264908", "271063", "303631", "337356", "343690", "353051", "355049", "362623", "394935", "422932", "424533", "432049", "505836", "525232", "559675", "589117", "603456", "625240", "627508", "629695", "637458", "651415", "652973", "660813", "685040", "711750", "719963", "721893", "774959", "782134", "797530", "824043", "842539", "860826", "898855", "902544", "942270", "982319", "998471"],
                "five": ["012156", "022474", "043195", "058445", "073322", "082821", "086892", "098192", "103466", "109013", "110671", "111525", "119785", "144383", "147582", "151734", "164599", "165418", "169072", "203988", "222141", "224547", "235554", "253129", "255899", "256158", "261854", "277744", "283068", "292056", "316164", "337602", "346659", "349128", "349199", "356110", "357822", "358387", "379191", "381086", "388731", "397516", "411126", "411786", "418328", "419738", "439403", "444743", "445296", "446054", "448072", "451569", "467035", "469178", "473346", "484640", "487485", "518900", "528423", "535340", "537136", "540048", "561059", "563295", "568822", "573304", "595561", "596039", "623484", "632801", "635589", "644961", "655745", "658454", "660085", "680066", "700273", "715511", "723775", "727592", "784982", "785881", "809111", "815799", "817561", "818635", "819460", "827703", "841782", "850973", "853699", "870690", "883861", "925137", "937225", "940924", "945051", "946010", "990100", "990168"],
                "3tua": ["740", "373"],
                "2tua": "47"
            }
        };
    }
    nearNumber(string) {
        let near1 = string.substring(0, string.length - 1) + (+string[string.length - 1] + 1)
        let near2 = string.substring(0, string.length - 1) + (+string[string.length - 1] - 1)
        return [near2, near1]
    }
    render() {
        return (
            <div className="container is-fluid has-text-centered">
                <div>
                    <h1 style={{ 'font-size': 2 + 'rem' }}>สลากกินแบ่งรัฐบาลงวดที่แล้ว</h1>
                </div>
                <br></br>
                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 1</h1>
                <br></br>
                <div className="columns">
                    <div className="column mytd is-2 is-offset-5">
                        {this.state.lotto.one}
                    </div>

                </div>

                <h1 style={{ 'fontSize': 2 + 'rem' }}>ข้างเคียงรางวัลที่ 1</h1>
                <br></br>
                <div className="columns">
                    <div className="column is-5">
                    </div>
                    {this.nearNumber(this.state.lotto.one).map((num) => {
                        return <div className="column mytd is-1">{num}</div>
                    })}

                </div>
                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 2</h1>
                <br></br>

                <div className="columns is-multiline is-mobile">
                    <div className="column is-3">
                    </div>
                    {
                        this.state.lotto.two.map((num) => {
                            return <div className='column is-1 mytd'>{num}</div>
                        })}
                </div>

                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 3</h1>
                <br></br>
                <div className="columns is-multiline is-mobile">
                    <div className="column is-1">
                    </div>
                    {
                        this.state.lotto.three.map((num) => {
                            return <div className='column is-1 mytd'>{num}</div>
                        })}
                </div>

                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 4</h1>
                <br></br>
                <div className='columns'>
                    <div className="column is-10 is-offset-1">
                        <div className="columns is-multiline is-mobile">
                            {/*<div className="colum">*/}
                            {/*</div>*/}
                            {
                                this.state.lotto.four.map((num) => {
                                    return <div className='column is-1 mytd'>{num}</div>
                                })}
                        </div>
                    </div>
                </div>
                
                <h1 style={{ 'fontSize': 2 + 'rem' }}>รางวัลที่ 5</h1>
                <br></br>
                <div className='columns'>
                    <div className="column is-10 is-offset-1">
                        <div className="columns is-multiline is-mobile">
                            {/*<div className="colum">*/}
                            {/*</div>*/}
                            {
                                this.state.lotto.five.map((num) => {
                                    return <div className='column is-1 mytd'>{num}</div>
                                })}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
