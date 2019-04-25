import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { addValueControl, createControl, validate, validateForm } from '../../../helpers/bilderForm';
import Input from '../../UI/Input/Input';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      formControls: {
        name: createControl(
          {
            label: 'Name',
            errorMessage: 'Поле не должно быть пустым'
          },
          {
            required: true
          }
        ),
        password: createControl({
          label: 'Password',
          errorMessage: 'Поле обязательное'
        })
      }
    };
  }

  componentDidMount() {
    console.log(this);
    const { controlValue } = this.props;
    const { formControls } = this.state;
    const newFormControls = addValueControl(formControls, controlValue);
    this.setState({
      formControls: newFormControls,
      isFormValid: validateForm(newFormControls)});
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          {...control}
          shouldValidate={!!control.validation}
          onChange={event => this.changeHandler(event.target.value, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInputs()}
        <Button disabled={!this.state.isFormValid}>Отправить</Button>
      </form>
    );
  }
}
export default ItemForm;
