import React, { Component } from "react";
import { Form, Input, InputNumber, Button } from "antd";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be bigger than ${min}",
  },
};

class FormUpdateInfo extends Component {
  constructor(props) {
    super(props);
    this.userInfo = props.userInfo;
    this.onSubmitUpdate = props.onFinish;
  }

  onFinish = (values) => {
    this.onSubmitUpdate(values);
  };

  render() {
    return (
      <div>
        <Form
          {...layout}
          name="control-ref"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input defaultValue={this.userInfo.name} />
          </Form.Item>
          <Form.Item label="Age" name="age" rules={[{ required: true }]}>
            <InputNumber min={1} defaultValue={this.userInfo.age} />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true }]}
          >
            <Input defaultValue={this.userInfo.position} />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true }]}
          >
            <Input defaultValue={this.userInfo.company} />
          </Form.Item>
          <Form.Item
            label="Technology"
            name="technology"
            rules={[{ required: true }]}
          >
            <Input defaultValue={this.userInfo.technology} />
          </Form.Item>
          <Form.Item label="Hobby" name="hobby" rules={[{ required: true }]}>
            <Input.TextArea defaultValue={this.userInfo.hobby} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default FormUpdateInfo;
