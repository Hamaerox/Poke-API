import React from 'react'

class PickGeneration extends React.Component {
    constructor(props) {
        super(props)
        this.generationClick = this.generationClick.bind(this);
        this.state = {
            active: "Generation One"
        }
    }
    generationClick(generation) {
        this.props.onGenerationChange(generation)
        this.setState({active: generation})
    }

    render() {
        const generationList = [
            "Generation One",
            "Generation Two",
            "Generation Three"
            ]
        let active = this.state.active
        const generationSingle = generationList.map(generation =>
        <button className={"gen-button " + ((active === generation)? 'button-active': '')} key={generation} onClick={() => this.generationClick(generation)}>
            {generation}
        </button>
        )
        return(
             <div className="button-container">{generationSingle}
             </div>
        )}
}

export default PickGeneration