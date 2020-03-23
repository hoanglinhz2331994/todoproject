import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        }else if(nextProps && nextProps.task === null){ //!nextProps.task
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm()
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
        console.log(value);
    }

    onSubmit = (event) => {
        event.preventDefault();
        // var state =this.state
        this.props.onSubmit(this.state)
        this.onClear(); // <<<<<<<<<<set lại state ban đầu
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        var { id } = this.state
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                        <span onClick={this.onCloseForm} className="fa fa-times-circle text-right"></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input onChange={this.onChange} value={this.state.name} name="name" type="text" className="form-control" />
                        </div>
                        <label>Trạng Thái :</label>
                        <select onChange={this.onChange} value={this.state.status} name="status" className="form-control" required="required">
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning"><span className="fa fa-plus mr-5" />Lưu</button>&nbsp;
                            <button onClick={this.onClear} type="button" className="btn btn-danger"><span className="fa fa-times mr-5" />Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;