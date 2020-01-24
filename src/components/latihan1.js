import React from 'react'
import Axios from 'axios'
import { API_URL } from './API_URL'
class Home extends React.Component {
    state = {
        data: [],
        selectedId: null,
        selectedPekerjaan:null
    }
    componentDidMount() {
        this.getData();
    }

    //Get Data 
    getData = () => {
        Axios.get(API_URL + `/datadiri`)
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //Tambah Data
    addData = () => {
        let nama = this.refs.nama.value
        let usia = this.refs.usia.value
        let pekerjaan = this.refs.pekerjaan.value
        // console.log(API_URL)
        Axios.post(API_URL + `/datadiri`, {
            nama,
            usia,
            pekerjaan
        })
            .then((res) => {
                console.log(res.data)
                this.getData();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Ngedit Data
    editData = (id) => {
        console.log('editdata')
        // this.setState({selectedId:null})
        let editNama = this.refs.editNama.value
        let editUsia = this.refs.editUsia.value
        let editPekerjaan = this.refs.editPekerjaan.value

        Axios.patch(API_URL + `/datadiri/${id}`, {
            nama: editNama,
            usia: editUsia,
            pekerjaan: editPekerjaan
        })
            .then((res) => {
                console.log(res)
                this.getData()
                this.setState({ selectedId: null })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Delete Data satuan
    deleteData = (id) => {
        Axios.delete(API_URL + `/datadiri/${id}`)
            .then((res) => {
                console.log(res)
                this.getData();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Delete Semua Data
    deleteAllData = () => {
        let { data } = this.state
        console.log(data.length)
        for (var i = 0; i < data.length + 1; i++) {
            Axios.delete(API_URL + `/datadiri/${i}`)
                .then((res) => {
                    console.log(res)
                    this.getData()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    //Filter berdasarkan pekerjaan
    filterData=(pekerjaan)=>{
        Axios.get(API_URL+`/datadiri?guru`)
        .then((res)=>{
            console.log(res)
            
        })
        .catch((err)=>{
            console.log(err)
        })
        console.log('pekerjaan')
    }

    renderTable = () => {
        let { data, selectedId } = this.state;
        return data.map((val) => {
            if (val.id === selectedId) {
                return (
                    <tr>
                        <td><input type='text' ref="editNama" placeholder={val.nama} /></td>
                        <td><input type='text' ref="editUsia" placeholder={val.usia} /></td>
                        <td><input type='text' ref="editPekerjaan" placeholder={val.pekerjaan} /></td>
                        <td>
                            <input type='button' className='form-control' value="Confirm" onClick={() => this.editData(val.id)} />
                            <input type='button' className='form-control' value="Cancel" onClick={() => this.setState({ selectedId: null })} />
                        </td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{val.nama}</td>
                    <td>{val.usia}</td>
                    <td>{val.pekerjaan}</td>
                    <td>
                        <input type='button' value='Edit Data' onClick={() => this.setState({ selectedId: val.id })} />
                        <input type='button' value='Delete Data' onClick={() => this.deleteData(val.id)} />
                    </td>
                </tr>
            )
        })
    }

    renderFilter=()=>{
        let { data } = this.state
        return data.map((val)=>{
            return(
                <option value={val.pekerjaan}>{val.pekerjaan}</option>
            )
        })
    }
    render() {
        return (
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select onChange={()=>this.filterData()} className='form-control'>
                            <option>Filter By Pekerjaan</option>
                            {this.renderFilter()}
                        </select>
                    </div>
                    <div className='col-md-4 mb-4'>
                        <div className='col-md-8'> <input type='button' className='form-control btn-danger' value='Delete All Data' onClick={this.deleteAllData} /> </div>

                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <input type='text' ref="nama" className='form-control' placeholder='Nama' /> </div>
                    <div className='col-md-3'> <input type='text' ref="usia" className='form-control' placeholder='Usia' /> </div>
                    <div className='col-md-3'> <input type='text' ref="pekerjaan" className='form-control' placeholder='Pekerjaan' /> </div>
                    <div className='col-md-3'> <input type='button' className='form-control btn-info' value='add Data' onClick={this.addData} /> </div>
                </div>
            </div>
        )
    }
}

export default Home