import React, { useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import axios from "axios";

const ShowUpdateModal = ({
  fields,
  updateModal,
  setUpdateModal,
  id,
  getNewNotification,
}) => {
  const [loading, setLoading] = useState(false);

  const updateNotification = async (data) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "patch",
        url: `/api/${id}`,
        data,
      });
      getNewNotification(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUpdateModal(false);
    }
  };

  return (
    <Modal
      visible={updateModal}
      onCancel={() => setUpdateModal(false)}
      footer={null}
    >
      <Form
        name="createNotification"
        onFinish={updateNotification}
        fields={fields}
        //   onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Please input your content",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="content" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "5px" }}
            loading={loading}
          >
            update
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              setUpdateModal(false);
            }}
            style={{ margin: "5px" }}
          >
            Canel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShowUpdateModal;
