import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import ShowUpdateModal from "./ShowModal";
import {
  Row,
  Col,
  List,
  Typography,
  Button,
  notification,
  Modal,
  Form,
  Input,
} from "antd";
import axios from "axios";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
  });
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({ method: "get", url: "/api" });
        console.log(res.data);
        setNotifications(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const createNotification = async (data) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "post",
        url: "/api/create",
        data,
      });
      const newNotification = res.data;
      setNotifications([newNotification, ...notifications]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const getNewNotification = (data) => {
    notifications.forEach((notification, index) => {
      if (notification.id == data.id) {
        notifications[index] = data;
        console.log(data);
        return;
      }
    });
  };

  return (
    <Row justify="center" gutter={[8, 16]} style={{ marginTop: "20px" }}>
      <Col xs={24}>
        <Row justify="center">
          <Col>
            <Button type="primary" onClick={() => setShowModal(true)}>
              create
            </Button>
            <Modal
              title="Create Notification"
              visible={showModal}
              onCancel={() => setShowModal(false)}
              footer={null}
            >
              <Form
                name="createNotification"
                onFinish={createNotification}
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
                    Submit
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                    style={{ margin: "5px" }}
                  >
                    Canel
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </Col>
        </Row>
      </Col>
      <Col md={12} sm={18} xs={23}>
        <List
          bordered
          dataSource={notifications}
          renderItem={(notification, index) => (
            <List.Item>
              <Typography>{notification.title}</Typography>
              <Button
                style={{ float: "right" }}
                onClick={() => {
                  //   openNotification(notification);
                  setUpdateModal(true);
                  setUpdatedData(notification);
                }}
              >
                view
              </Button>
            </List.Item>
          )}
        />
        <ShowUpdateModal
          fields={[
            {
              name: ["title"],
              value: updatedData.title,
            },
            {
              name: ["content"],
              value: updatedData.content,
            },
          ]}
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          id={updatedData.id}
          getNewNotification={getNewNotification}
        />
      </Col>
    </Row>
  );
}

// const openNotification = ({ title, content }) => {
//   notification.open({
//     message: title,
//     description: content,

//     onClick: () => {
//       console.log("Notification Clicked!");
//     },
//   });
// };
export default App;
