import React, { Component } from 'react';
import '../style/App.css';
import Helper from '../helper/helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.tableHeaderList = ['title', 'subscribers', 'public_description'];
    this.state = {tableData: [], error: null}
  }
  
  componentDidMount() {
    Helper.getTableData()
      .then(response => {
        this.setState({ tableData: response.data.data.children });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  renderTableHeader() {
    //replace(/_/g, " ") is used to replace the underscore from the string with space
    return this.tableHeaderList.map((header_name) => (
      <th key={header_name}>{header_name.replace(/_/g, " ")}</th>
    ));
  }
  
  renderTableBody() {
    return (
      this.state.tableData.map(rowData => (
        <tr key={rowData.data.id}>
          {
            this.tableHeaderList
              .map(columnName => <td key={`${rowData.data.id}#${columnName}`}>{rowData.data[columnName]}</td>)
          }
        </tr>
      ))
    );
  }
   
  render() {
    //For ajax failure render the error message
    if (this.state.error) 
      return <h3 className="text-center text-danger"> {`${this.state.error.message}`} </h3>;
    
    //If table data is avilabe then render the table
    if (this.state.tableData.length) {
      return (
        <div className="App container-fluid">
          <div className="table-responsive">
            <table className="table table-striped">
              <caption>Reddits Details</caption>  
              <thead>
                <tr>  
                  {this.renderTableHeader()}
                </tr>  
              </thead>

              <tbody>
                {this.renderTableBody()}
              </tbody>  
            </table>
          </div>
        </div>
      );
    } else {
      //Else render the loading message
      return <h3 className='text-center text-primary'> Loading... </h3>;
    }
  }
}

export default App;
