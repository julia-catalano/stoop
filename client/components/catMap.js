import React from 'react'
import {connect} from 'react-redux'
import {getAllCatsThunk} from '../store/cat'

class CatMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllCats()
  }

  render() {
    return (
      <div>
        <h1>local spots</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cats: state.cat.cats
})

const mapDispatchToProps = dispatch => ({
  getAllCats: () => dispatch(getAllCatsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(CatMap)
