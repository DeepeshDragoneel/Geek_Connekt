import React from "react";
import Backdrop from "@mui/material/Backdrop";
import { AddPostContainer } from "../../AddPost/AddPost.styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import { Form, Input, InputNumber, Button } from "antd";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import "./EditProfile.scss";
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-enable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

/* eslint-enable no-template-curly-in-string */

const props = {
    name: 'file',
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EditProfile = () => {
  const EditProfile = useSelector((state) => state.EditProfile);
  const [fileList, setFileList] = React.useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: "SET_EDIT_PROFILE", payload: false });
  };
  const updatePersonalInfo = (values) => {
    console.log(values);
  };
  const updateSchoolInfo = (values) => {
    console.log(values);
  };
  const updateLiveLocationInfo = (values) => {
    console.log(values);
  };
  const changePassword = (values) => {
    console.log(values);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
      let src = file.url;
      console.log(src);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    console.log(src);
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "9999999",
          backgroundColor: "rgba(0,0,0,.85)",
        }}
        open={EditProfile}
      >
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "9999999",
          }}
          onClick={handleClose}
        >
          <CloseIcon
            style={{ color: "#fff", zIndex: "9999999", fontSize: "35px" }}
          />
        </IconButton>
        <AddPostContainer>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              //   height: 224,
              width: "100%",
              marginLeft: "-2rem",
              padding: 0,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider", width: "110px" }}
            >
              <Tab className="mb-2" label={<PersonIcon />} {...a11yProps(0)} />
              <Tab
                className="mb-2"
                label={<CameraAltIcon />}
                {...a11yProps(1)}
              />
              <Tab className="mb-2" label={<SchoolIcon />} {...a11yProps(2)} />
              <Tab
                className="mb-2"
                label={<LocationOnIcon />}
                {...a11yProps(3)}
              />
              <Tab
                className="mb-2"
                label={<SettingsIcon />}
                {...a11yProps(4)}
              />
            </Tabs>
            <TabPanel style={{ width: "100%" }} value={value} index={0}>
              <Form
                {...layout}
                className="mx-auto "
                style={{ width: "max-content" }}
                name="nest-messages"
                onFinish={updatePersonalInfo}
                validateMessages={validateMessages}
              >
                <Form.Item name={["name"]} label="Full Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["email"]}
                  label="Email ID"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "age"]}
                  label="Your Age"
                  rules={[
                    {
                      type: "number",
                      min: 0,
                      max: 99,
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name="website"
                  label="Website"
                  rules={[
                    {
                      type: "url",
                      warningOnly: true,
                    },
                    {
                      type: "string",
                      min: 6,
                    },
                  ]}
                >
                  <Input placeholder="website url" />
                </Form.Item>
                <Form.Item label="Birthday" name={["date"]}>
                  <input type="date" className="ant-input" />
                </Form.Item>
                {/* <Form.Item name={["user", "introduction"]} label="Introduction">
                  <Input.TextArea />
                </Form.Item> */}
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ImgCrop grid
                  cropSize={{
                      width:200,
                      height:200
                  }}
                  modalTitle="Crop Image"
                  onModalOk={(file) => {
                            console.log(file);
                        }
                    }
              >
                <Upload
                  fileList={fileList}
                  onClick={() => {
                    dispatch({ type: "SET_EDIT_PROFILE", payload: false });
                  }}
                
                >
                  + Upload Profile Pic
                </Upload>
              </ImgCrop>
              <br/>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload Cover Pic</Button>
                </Upload>
            </TabPanel>
            <TabPanel
              className="px-4"
              style={{ width: "100%" }}
              value={value}
              index={2}
            >
              <Form
                // style={{ width: "max-content" }}
                {...layout}
                name="nest-messages"
                onFinish={updateSchoolInfo}
                validateMessages={validateMessages}
              >
                <Form.Item name={["primary"]}>
                  <Input placeholder="primary schooling" />
                </Form.Item>
                <Form.Item name={["secondary"]}>
                  <Input placeholder="secondary schooling" />
                </Form.Item>
                <Form.Item name={["description"]}>
                  <Input.TextArea placeholder="say something" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
            <TabPanel
              className="px-4"
              style={{ width: "100%" }}
              value={value}
              index={3}
            >
              <Form
                {...layout}
                name="nest-messages"
                onFinish={updateLiveLocationInfo}
                validateMessages={validateMessages}
              >
                <Form.Item name={["currentLocation"]}>
                  <Input placeholder="current location" />
                </Form.Item>
                <Form.Item name={["homeTown"]}>
                  <Input placeholder="home town" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
            <TabPanel
              className="px-4"
              style={{ width: "100%" }}
              value={value}
              index={4}
            >
              <Form
                {...layout}
                name="nest-messages"
                onFinish={changePassword}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
          </Box>
        </AddPostContainer>
      </Backdrop>
    </div>
  );
};

export default EditProfile;