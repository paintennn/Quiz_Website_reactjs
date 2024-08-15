import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react';
import { postChangePassword } from '../../services/ApiServices';
const Profile = (props) => {
    const {show, setShow} = props
    const handleClose = () => setShow(false);
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [reNewpassword, setReNewPassword] = useState("")
    
    const handleSaveChange = async() => {
        if (newPassword !== reNewpassword) {
            alert("Mật khẩu mới và mật khẩu nhập lại không khớp!");
            return;
        }

        const res = await postChangePassword(password, newPassword);
        console.log(res);
        if (res.EC && res.EC === 0) {
            alert("Thay đổi mật khẩu thành công!");
            handleClose();
        } else {
             alert("Đã xảy ra lỗi: " + res.EM);
        }
    }
    
    
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="password"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="user" title="User">
                            <>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </>
                        </Tab>
                        <Tab eventKey="password" title="Password">
                            <div>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Mật khẩu hiện tại</InputGroup.Text>
                                        <Form.Control
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            aria-label="Password"
                                            type='password'
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Mật khẩu mới</InputGroup.Text>
                                    <Form.Control
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="NewPassword"
                                        aria-label="New Password"
                                        type='password'
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">Nhập lại mật khẩu</InputGroup.Text>
                                    <Form.Control
                                        value={reNewpassword}
                                        onChange={(e) => setReNewPassword(e.target.value)}
                                        placeholder="RePassword"
                                        aria-label="RePassword"
                                        type='password'
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </div>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveChange()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Profile;