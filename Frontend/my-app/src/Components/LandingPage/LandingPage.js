import React, { Component } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import { connect } from 'react-redux';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
 
     componentDidMount() {
        //     const username = 'yash'
        //     axios.post("http://localhost:2000/mongo/sensorz", {username}).then((response)=>{
        //         // console.log(response.data)
        //     this.setState({
        //         data: response.data
        //     })
        //   })
        //   console.log(this.state.data)
        try {
          setInterval(async () => {
            const username = this.props.username;
            axios.post("http://localhost:2000/mongo/sensorz", {username}).then((response)=>{
                // console.log(response.data)
                let thing = [];
                thing.push(response.data[0]);
            this.setState({
                data: thing
            })
          })
          console.log(this.state.data)
          }, 5000);
        } catch(e) {
          console.log(e);
        }
  }

    render() {
        const columns = [
            {title: 'PM 2.5 Data', field: 'pm2_5Data'},
            {title: 'PM 10 Data', field: 'pm10Data'},
            {title: 'Temperature Data', field: 'tempData'},
            {title: 'Humidity Data', field: 'humidityData'},
            {title: 'Date Time', field: 'dateTimeData'}
        ];
        const {data} = this.state;

        return (
            <div style={{color: 'blue'}}>
                  <MaterialTable
                    title="Air Quality Data"
                    columns={columns}
                    data={data}
                    options={{
                        sorting: false,
                        paging: false
                    }}
                >
                </MaterialTable>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    username: state.username,
  });

  export default connect(mapStateToProps)(LandingPage);